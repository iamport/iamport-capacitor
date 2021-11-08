import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage } from '@ionic/react';
import React, { useState } from 'react';
import { Carrier, CertificationData, CertificationOptions, IMP, Response } from 'iamport-capacitor';

import Header from '../components/Header';
import Selector from '../components/Selector';

import { CARRIERS } from '../constants';

const Certification: React.FC = ({ history }: any) => {
  const [merchantUid, setMerchantUid] = useState(`mid_${new Date().getTime()}`);
  const [company, setCompany] = useState('아임포트');
  const [carrier, setCarrier] = useState<Carrier>('SKT');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [minAge, setMinAge] = useState('');

  function callback(response: Response) {
    const newResponse = {
      ...response,
      type: 'certification',
    };

    history.replace('/result', { response: newResponse });
  }

  function callbackOnBack() {
    history.replace('/');
  }

  const handleSubmit = async () => {

    try {
      const imp = new IMP();
      const userCode: string = 'imp10391932';
      const data: CertificationData = {
        merchant_uid: merchantUid,
        company: company,
        name: name,
        phone: phone,
        carrier: carrier,
        min_age: minAge,
      };

      const options: CertificationOptions = {
        userCode,
        data,
        callback,
        callbackOnBack,
      };

      await imp.certification(options);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <IonPage>
      <Header title='본인인증 테스트' />
      <IonContent className='ion-padding'>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
          <IonItem>
            <IonLabel>
              주문번호
            </IonLabel>
            <IonInput
              placeholder={'주문번호는 필수입력입니다.'}
              value={merchantUid}
              required={true}
              onIonChange={(e: any) => setMerchantUid(e.target.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel>
              회사명
            </IonLabel>
            <IonInput
              value={company}
              onIonChange={(e: any) => setCompany(e.target.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel>
              통신사
            </IonLabel>
            <Selector
              data={CARRIERS}
              value={carrier}
              onChange={(e) => setCarrier(e.target.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel>
              이름
            </IonLabel>
            <IonInput
              value={name}
              onIonChange={(e: any) => setName(e.target.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel>
              전화번호
            </IonLabel>
            <IonInput
              value={phone}
              onIonChange={(e: any) => setPhone(e.target.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel>
              최소연령
            </IonLabel>
            <IonInput
              value={minAge}
              onInput={(e: any) => setMinAge(e.target.value)}
            />
          </IonItem>
          <IonButton size={'large'} expand={'block'} type={'submit'}>
            본인인증 하기
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Certification;
