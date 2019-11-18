import React from 'react';
import { IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons } from '@ionic/react';

interface HeaderProps {
  title: string,
};
function Header({ title }: HeaderProps) {
  return (
    <IonHeader>
      <IonToolbar
        color="primary"
        style={{
          '--padding-top': '20px',
          '--padding-bottom': '20px',
        }}
      >
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" text="" />
        </IonButtons>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
}

export default Header;