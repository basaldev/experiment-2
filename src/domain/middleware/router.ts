import page from 'page';
const logger = getLogger('Middleware/router');
import { getLogger } from 'domain/logger';
import { updateCurrentPage } from 'domain/store/reducers/main';
import { getUser } from 'domain/store/selectors/main';
import { getImages } from './network';

type Context = { params: { name: string } };
type OnRoute = (ctx: Context) => void;

function authMiddleware(ctx, next) {
  const userId = getUser().id;
  if (userId) {
    logger.info('User authenticated', userId);
    next();
  } else {
    logger.info('User not authenticated');
    page('/login');
  }
}
function secondRouter(onRoute: OnRoute) {
  page('/documents', authMiddleware, onRoute);
}
function thirdRouter(onRoute: OnRoute) {
  page('/diagnose', authMiddleware, onRoute);
}
function fourthRouter(onRoute: OnRoute) {
  page('/actions', authMiddleware, onRoute);
}
function loginRouter(onRoute: OnRoute) {
  page('/login', onRoute);
}
function homeRouter(onRoute: OnRoute) {
  page('/', authMiddleware, onRoute);
}
function doctorRouter(onRoute: OnRoute) {
  page('/doctor', authMiddleware, onRoute);
}
function addTreatmentRouter(onRoute: OnRoute) {
  page('/add-treatment', authMiddleware, onRoute);
}
function singlePatientRouter(onRoute: OnRoute) {
  page('/patient/:id', authMiddleware, onRoute);
}

export default function startRouters() {
  loginRouter(ctx => {
    logger.debug('Login route');
    updateCurrentPage({ name: 'LOGIN_PAGE', value: null });
  });
  homeRouter(ctx => {
    logger.debug('Home route');
    updateCurrentPage({ name: 'HOME_PAGE', value: 0 });
  });
  secondRouter(ctx => {
    logger.debug('Document route');
    getImages();
    updateCurrentPage({ name: 'SECOND_PAGE', value: 1 });
  });
  thirdRouter(ctx => {
    logger.debug('Diagnosis route');
    updateCurrentPage({ name: 'THIRD_PAGE', value: 2 });
  });
  fourthRouter(ctx => {
    logger.debug('Treatmean route');
    updateCurrentPage({ name: 'FOURTH_PAGE', value: 3 });
  });
  doctorRouter(ctx => {
    logger.debug('Treatmean route');
    updateCurrentPage({ name: 'DOCTOR_PAGE', value: 0 });
  });
  singlePatientRouter(ctx => {
    logger.debug('SINGLE_PATIENT_PAGE route');
    updateCurrentPage({ name: 'SINGLE_PATIENT_PAGE', value: null });
  });
  addTreatmentRouter(ctx => {
    logger.debug('Treatmean route');
    updateCurrentPage({ name: 'ADD_TREATMENT_PAGE', value: 1 });
  });
  page();
}

export function navigate(route: string, event: any) {
  event.preventDefault();
  page(route);
}


export const NAVBARS = {
  'DOCTOR': [
    {
      label: 'Patients',
      icon: 'Assignment',
      route: e => { navigate('/doctor', e);  },
    },
  ],
  'PATIENT': [
    {
      label: 'Chat',
      icon: 'ChatIcon',
      route: e => { navigate('/', e);  },
    },
    {
      label: 'Profile',
      icon: 'Assignment',
      route: e => { navigate('/documents', e); },
    },
    {
      label: 'Diagnose',
      icon: 'AssignmentLate',
      route: e => { navigate('/diagnose', e); },
    },
    {
      label: '',
      icon: 'AssignmentInd',
      route: e => { navigate('/actions', e); }
    },
  ]
}