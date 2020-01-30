
import firebase from "firebase/app";
import "firebase/messaging";
const initializedFirebaseApp = firebase.initializeApp({
	// Project Settings => Add Firebase to your web app
    messagingSenderId: "198987621325"
});
const messaging = initializedFirebaseApp.messaging();
messaging.usePublicVapidKey(
	// Project Settings => Cloud Messaging => Web Push certificates
  "BFmfR5eX_gbssL9B0PPK31MA4RKBq9iLFzUY9MD9B9sL7jovYUhH4aAcgJKWDCBrPUwfjUNx_FcRzaNDELSuxyU"
);
export { messaging };