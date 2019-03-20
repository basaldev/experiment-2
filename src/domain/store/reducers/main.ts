import { getLogger } from 'domain/logger';
import { store, State, Page, Item } from 'domain/store/main';
import { normaliseDocuments } from 'domain/normalisers';

const logger = getLogger('State');

export function updateCurrentPage(currentPage: Page) {
  logger.debug(`Update current page ${currentPage.name}`);
  return store.swap(oldState => ({ ...oldState, currentPage }));
}

export function updateInputText(inputText: string) {
  return store.swap(oldState => ({ ...oldState, inputText }));
}

export function updatesessionAttributes(sessionAttributes: any) {
  logger.debug(`Update sessionAttributes `, sessionAttributes);
  return store.swap(oldState => ({
    ...oldState,
    sessionAttributes
  }));
}

export function updateChat(message: any) {
  return store.swap(oldState => ({
    ...oldState,
    messages: [...oldState.messages, message]
  }));
}

export function updateDiagnosis(newDianosis: any) {
  return store.swap(oldState => ({
    ...oldState,
    dianosis: [...oldState.dianosis, newDianosis]
  }));
}

export function updateMyDoctor(newDoctor: any) {
  return store.swap(oldState => ({
    ...oldState,
    myDoctors: [...oldState.myDoctors, newDoctor]
  }));
}

export function updateCurrentUser(user: { id: string; name: string; avatar: string; age: number }) {
  return store.swap(oldState => ({
    ...oldState,
    user
  }));
}

export function updateUserDocuments(userDocuments): State {
  logger.info('Adding documents');
  return store.swap(oldState => ({
    ...oldState,
    documents: userDocuments.map(normaliseDocuments)
  }));
}

export function updateSnackbarVisible(snackbarVisible): State {
  return store.swap(oldState => ({
    ...oldState,
    snackbarVisible
  }));
}

export function updateSnackbarContent(snackbarContent): State {
  return store.swap(oldState => ({
    ...oldState,
    snackbarContent
  }));
}
