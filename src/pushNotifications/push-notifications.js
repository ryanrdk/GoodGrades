import firebase from 'firebase';

export const initializeFireBase = () => {
  firebase.initializeApp({
	apiKey: "AIzaSyAEikoHCcU29gqpwlooVTMklOv5Tpd79AQ",
	authDomain: "goodgrades-1575870013602.firebaseapp.com",
	databaseURL: "https://goodgrades-1575870013602.firebaseio.com",
	projectId: "goodgrades-1575870013602",
	storageBucket: "goodgrades-1575870013602.appspot.com",
	messagingSenderId: "198987621325",
	appId: "1:198987621325:web:efc84e13fd9e33daffda84",
	measurementId: "G-63JQF718BE"
  });
}

export const askForPermissioToReceiveNotifications = async () => {
	try {
	  const messaging = firebase.messaging();
	  await messaging.requestPermission();
	  const token = await messaging.getToken();
	  console.log('Your connection token:', token);
	  
	  return token;
	} catch (error) {
	  console.error(error);
	}
}