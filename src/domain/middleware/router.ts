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
  page('/2', authMiddleware, onRoute);
}
function thirdRouter(onRoute: OnRoute) {
  page('/3', authMiddleware, onRoute);
}
function fourthRouter(onRoute: OnRoute) {
  page('/4', authMiddleware, onRoute);
}
function loginRouter(onRoute: OnRoute) {
  page('/login', onRoute);
}
function homeRouter(onRoute: OnRoute) {
  page('/', authMiddleware, onRoute);
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
  page();
}

export function navigate(route: string, event: any) {
  event.preventDefault();
  page(route);
}
