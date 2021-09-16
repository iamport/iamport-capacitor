import React from 'react';
import { IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import { chevronBack } from 'ionicons/icons';

interface HeaderProps {
  title: string,
};

function Header({ title }: HeaderProps) {
  return (
    <IonHeader>
      <IonToolbar
        color='primary'
        style={{
          '--padding-top': '20px',
          '--padding-bottom': '20px',
        }}
      >
        <IonButtons slot='start'>
          <IonBackButton defaultHref='/' icon={chevronBack} />
        </IonButtons>
        <IonTitle className={'ion-text-center'}>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
}

export default Header;