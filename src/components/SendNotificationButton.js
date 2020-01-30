import React, { useState } from 'react';

export default function SendNotificationButton() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const handleButtonClick = () => {
	fetch(
		`https://fcm.googleapis.com/fcm/send`,
		{
		  method: 'POST',
		  headers: {
			'content-type': 'application/json',
			'authorization': 'key=AAAALlSWI80:APA91bG4ZtFeZ1pn7jnrDNsEMzDhsxAWr-jbuOzduWkOwJ4nQC1hA4opduPvTktfHLyFd7LpE6mLMkhbIppBtmlgx7Rr4lgd2bdg_LQ1jzF--FgilJ9fc8z-t9nhxeGSh2Uxs0Qhpyym'
		  },
		  body: JSON.stringify({
				"notification": {
					"title": "Firebase",
					"body": "Firebase is awesome",
					"click_action": "http://localhost:3000/",
					"icon": "http://url-to-an-icon/icon.png"
				},
				"to": "APA91bE_EsU-HTHC_8LBB-pSuBBc4NGiZKQYsrGHrgU4xwFsMeawV_aZ4M6svVz7-I0IIjORCwitSDUi_rvTNWoxOhpC6u2HUnDY9dYH-4KJ5ll3hIi_g-ziLAWtXRI9YigVmgssiMWb"
			})
		}
	  )
	  .then(response => response.json())
	  .then(data => {
		console.log(data)
	  }
		  
	  )
	  .catch((err) => console.log('Something went wrong with pn'))
  }
  return (
    <div>
      <button onClick={handleButtonClick}>
        Click me
      </button>
    </div>
  );
}