import "bootstrap/dist/css/bootstrap.min.css";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  AuthProvider,
  DatabaseProvider,
  FirebaseAppProvider,
  useFirebaseApp,
} from "reactfire";
import App from "./App";
import { firebaseConfig } from "./firebase-credentials";
import "./index.css";

function FirebaseProvider({ children }) {
  const firebaseApp = useFirebaseApp();
  const auth = getAuth(firebaseApp);
  const database = getDatabase(firebaseApp);
  return (
    <AuthProvider sdk={auth}>
      <DatabaseProvider sdk={database}>{children}</DatabaseProvider>
    </AuthProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <FirebaseProvider>
          <App />
        </FirebaseProvider>
      </FirebaseAppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
