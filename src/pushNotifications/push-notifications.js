import * as firebase from 'firebase';


export const initializeFireBase= () => {
    const config = {
        messagingenderId: 198987621325
    };
    firebase.initializeApp(config);
}

