import { createAtom } from 'js-atom';
import { Bubble } from 'components/presentational/bubble';
import * as User1Image from 'assets/user1.jpg';
import * as User2Image from 'assets/user2.png';

export type HomePage = { name: 'HOME_PAGE'; value: 0 };
export type SecondPage = { name: 'SECOND_PAGE'; value: 1 };
export type ThirdPage = { name: 'THIRD_PAGE'; value: 2 };
export type FourthPage = { name: 'FOURTH_PAGE'; value: 3 };
export type LoginPage = { name: 'LOGIN_PAGE'; value: null };
export type DoctorView = { name: 'DOCTOR_PAGE'; value: 0 };
export type AddTreatment = { name: 'ADD_TREATMENT_PAGE'; value: 1 };
export type SinglePatientPage = { name: 'SINGLE_PATIENT_PAGE'; value: 1 };

export type Page = HomePage | SecondPage | ThirdPage | FourthPage | LoginPage | DoctorView | AddTreatment | SinglePatientPage;

export type Item = { name: string; url: string };

export type State = {
  currentPage: Page;
  allItems: Array<Item>;
  filteredItems: Array<Item>;
  messages: Array<any>;
  documents: Array<any>;
  dianosis: Array<any>;
  treatment: object;
  doctors: Array<any>;
  myDoctors: Array<any>;
  loading: boolean;
  inputText: string;
  currentPatient: any;
  sessionAttributes: any;
  user: {
    id: string;
  };
  sampleUsers: Array<{
    name: string;
    id: string;
    avatar: string;
    age: number;
    role: 'PATIENT' | 'DOCTOR';
    doctorId?: number;
  }>;
};

const defaultState: State = {
  user: {
    id: null
  },
  currentPatient: {},
  sampleUsers: [
    {
      name: 'Jessa Maryanne',
      id: 'xd0ktRwSbthgZJOMKxBn44potD52',
      avatar: User1Image,
      age: 21,
      role: 'PATIENT'
    },
    {
      name: 'Mathew Gib',
      id: 'y48Udj8T5Pf7r402LX2qYqNUYmz2',
      avatar: User2Image,
      age: 59,
      role: 'DOCTOR',
      doctorId: 0
    }
  ],
  currentPage: { name: 'HOME_PAGE', value: 0 },
  allItems: [],
  filteredItems: [],
  messages: [
    {
      content: Bubble('Hello, I am here to help! Please let me know what your symptoms are...'),
      showSpeaker: true,
      direction: 'row',
      speaker: 'BOT'
    }
  ],
  inputText: '',
  documents: [],
  dianosis: [],
  treatment: {
    id: 'abc123',
    diagnosis: null,
    doctor: {
      name: 'Mathew Gib',
      id: 'y48Udj8T5Pf7r402LX2qYqNUYmz2',
      avatar: User2Image,
      age: 59,
      role: 'DOCTOR'
    },
    patient: {
      name: 'Jessa Maryanne',
      id: 'xd0ktRwSbthgZJOMKxBn44potD52',
      avatar: User1Image,
      age: 21,
      role: 'PATIENT'
    },
    prescription: ''
  },
  myDoctors: [],
  doctors: [
    {
      id: 0,
      img: `https://images.unsplash.com/photo-1523350774557-359d2ca68f2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80`,
      name: 'Mathew Gibs',
      specialisationId: 31,
      covered: true,
      patients: [
        {
          name: 'Jessa Maryanne',
          id: 'xd0ktRwSbthgZJOMKxBn44potD52',
          avatar: User1Image,
          age: 21,
          role: 'PATIENT'
        },
        {
          name: 'Not Jessa Maryanne',
          id: 'XXX',
          avatar: User1Image,
          age: 21,
          role: 'PATIENT'
        },
        {
          name: 'Also no Jessa Maryanne',
          id: 'YYY',
          avatar: User1Image,
          age: 21,
          role: 'PATIENT'
        },
      ]
    },
    {
      id: 1,
      img: `https://images.unsplash.com/photo-1543165365-07232ed12fad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80`,
      name: 'Henry Gray',
      specialisationId: 95,
      covered: false
    },
    {
      id: 2,
      img: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80`,
      name: 'Jonas Salk',
      specialisationId: 15,
      covered: false
    }
  ],
  loading: true,
  sessionAttributes: {}
};

export const store = createAtom(defaultState);
window['__STORE__'] = store;
