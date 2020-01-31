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

messaging.usePublicVapidKey("BFmfR5eX_gbssL9B0PPK31MA4RKBq9iLFzUY9MD9B9sL7jovYUhH4aAcgJKWDCBrPUwfjUNx_FcRzaNDELSuxyU");
messaging.useServiceWorker('./worker.js')

messaging.setBackgroundMessageHandler(function (payload) {
	console.log("Message has been handled")
	const notificationTitle = payload.data.title;
	const notificationOptions = {
	  body: payload.data.body,
	  icon: payload.data.icon
	};
	return self.registration.showNotification(notificationTitle,
	  notificationOptions);
});

messaging.showToken = (token) => {
	console.log(token)

}

messaging.getToken().then((currentToken) => {
	if (currentToken) {
		messaging.sendTokenToServer(currentToken);
		messaging.updateUIForPushEnabled(currentToken);
	} else {
	  // Show permission request.
	  console.log('No Instance ID token available. Request permission to generate one.');
	  // Show permission UI.
	  messaging.updateUIForPushPermissionRequired();
	  messaging.setTokenSentToServer(false);
	}
  }).catch((err) => {
	console.log('An error occurred while retrieving token. ', err);
	messaging.showToken('Error retrieving Instance ID token. ', err);
	setTokenSentToServer(false);
});

messaging.onTokenRefresh(() => {
	messaging.getToken().then((refreshedToken) => {
		console.log('Token refreshed.');
		// Indicate that the new Instance ID token has not yet been sent to the
		// app server.
		messaging.setTokenSentToServer(false);
		// Send Instance ID token to app server.
		messaging.sendTokenToServer(refreshedToken);
		// ...
	}).catch((err) => {
		console.log('Unable to retrieve refreshed token ', err);
		messaging.showToken('Unable to retrieve refreshed token ', err);
	});
});

messaging.getInitialNotification((message) => { console.log("Got getInitialNotification "+JSON.stringify(message)); });

messaging.onMessage(function(payload) {
	console.log("Message received. ", payload);
	   // ...
 });
