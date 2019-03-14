export function newFirebaseUser(firestore:any, user: any) {
  const { uid } = user;
  firestore.collection("users").doc(uid).set({
    uid,
  }).then(function (docRef) {
    console.log("Document written with ID: ");
  }).catch(function (error) {
    console.log("Couldn't add doc: ", error);
    });
}