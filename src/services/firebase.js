import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { child, get, ref, remove, update } from "firebase/database";
import { db } from "../firebase-credentials";

export async function signInFirebaseUser(auth, values) {
  const { email, password } = values;
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signUpFirebaseUser(auth, values) {
  const { email, password, firstName, lastName } = values;
  const fullName = `${firstName} ${lastName}`;

  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(user, {
    ...user,
    displayName: fullName,
  });
}

export async function signOutFirebaseUser(auth) {
  await signOut(auth);
}

export async function addFavoriteCharacter(uid, characterId) {
  const postData = {
    characterId,
  };

  const updates = {};
  updates["/favorite/" + uid + "/" + characterId] = postData;

  return update(ref(db), updates);
}

export function getFavoriteCharacterIds(uid) {
  const dbRef = ref(db);
  return get(child(dbRef, `/favorite/${uid}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.keys(snapshot.val());
      } else {
        return [];
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function removeFavoriteCharacter(uid, characterId) {
  const dbRef = ref(db);
  remove(child(dbRef, `/favorite/${uid}/${characterId}`));
}
