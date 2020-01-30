import React from 'react';
import { askForPermissioToReceiveNotifications } from '../pushNotifications/push-notifications';

const NotificationButton = () => (
    <button onClick={askForPermissioToReceiveNotifications} >
      Click to Recieve a Notification
    </button>
);

export default NotificationButton;