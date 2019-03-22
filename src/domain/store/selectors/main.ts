import { store } from 'domain/store/main';
import { State, Page } from 'domain/store/main';

export function state(): State {
  return store.deref();
}

export function currentPage(): Page {
  return state().currentPage;
}

export function getNavbar(): string {
  return typeof getUser().role !== 'undefined' ? getUser().role : 'PATIENT';
}

export function getMessages(): Array<any> {
  return state().messages;
}

export function getInputText(): string {
  return state().inputText;
}

export function getSessionAttributes(): any {
  return state().sessionAttributes;
}

export function getDocuments(): Array<any> {
  return state().documents;
}

export function getDianosis(): Array<any> {
  return state().dianosis;
}

export function getTreatment(): any {
  return state().treatment;
}

export function getDoctors(): Array<any> {
  return state().doctors;
}

export function getMyDoctors(): Array<any> {
  return state().myDoctors;
}

export function getUser(): any {
  return state().user;
}

export function getSampleUsers(): Array<any> {
  return state().sampleUsers;
}

export function getCurrentPatient(): Array<any> {
  return state().currentPatient;
}
