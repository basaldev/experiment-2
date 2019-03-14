import firebase from 'firebase';
import { newFirebaseUser } from 'domain/network/login';

export function updateSignedInStatus(firestore:any) {
  const user = firebase.auth().currentUser;
  if (user) {
    console.log(firebase.auth());
    newFirebaseUser(firestore, user);
  }
}