importScripts('https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.7.0/firebase-messaging.js');

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

const messaging = firebase.messaging();