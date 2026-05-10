import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
} from '@ionic/react';
import { useAuth } from '../utils/AuthContext';

const DashUserPage: React.FC = () => {
  const { logout } = useAuth();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard de Usuario</IonTitle>

          <IonButtons slot="end">
            <IonButton color="danger" onClick={logout}>
              Log Out
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h1>Welcome to the User Dashboard!</h1>
        <p>
          This is a <strong>Protected Route</strong>. If you are seeing this,
          your auth state and user role both passed the guard.
        </p>
        <p>
          Use the login screen role toggle to enter the user dashboard or the
          admin dashboard.
        </p>
      </IonContent>
    </IonPage>
  );
};

export default DashUserPage;