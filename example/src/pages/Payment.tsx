import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage, IonToggle } from '@ionic/react';
import React, { useState } from 'react';
import { IMP, PaymentData, PaymentOptions, PayMethod, Pg, Response } from 'iamport-capacitor';

import Selector from '../components/Selector';

import { PGS } from '../constants';

import { getMethods, getQuotas, getUserCode } from '../utils';
import Header from '../components/Header';

const Payment: React.FC = ({ history }: any) => {

    console.log('헬로헬로 Payment');
    console.log(history.location);

    const [pg, setPg] = useState<Pg>('html5_inicis');
    const [payMethod, setPayMethod] = useState<PayMethod>('card');
    const [cardQuota, setCardQuota] = useState(0);
    const [merchantUid, setMerchantUid] = useState(`mid_${new Date().getTime()}`);
    const [name, setName] = useState('아임포트 결제데이터분석');
    const [amount, setAmount] = useState('39000');
    const [buyerName, setBuyerName] = useState('홍길동');
    const [buyerTel, setBuyerTel] = useState('01012341234');
    const [buyerEmail, setBuyerEmail] = useState('example@example.com');
    const [vbankDue, setVbankDue] = useState('');
    const [bizNum, setBizNum] = useState('');
    const [escrow, setEscrow] = useState(false);
    const [digital, setDigital] = useState(false);

    function callback(response: Response) {
      const newResponse = {
        ...response,
        type: 'payment',
      };


      console.log('콜백 다시 불리는거 아니지?');
      history.replace('/result', { response: newResponse });
    }

    function callbackOnBack() {

      console.log('callbackOnBack');
      history.replace('/');
    }

    const handleSubmit = async () => {

      try {
        const imp = new IMP();
        const userCode = getUserCode(pg);
        const data: PaymentData = {
          pg: pg,
          pay_method: payMethod,
          merchant_uid: merchantUid,
          name: name,
          amount: amount,
          buyer_name: buyerName,
          buyer_tel: buyerTel,
          buyer_email: buyerEmail,
          escrow: escrow,
          app_scheme: 'io.ionic.starter',
        };
        // 신용카드의 경우, 할부기한 추가
        if (payMethod === 'card' && cardQuota !== 0) {
          data.display = {
            card_quota: cardQuota === 1 ? [] : [cardQuota],
          };
        }

        // 가상계좌의 경우, 입금기한 추가
        if (payMethod === 'vbank' && vbankDue.length !== 0) {
          data.vbank_due = vbankDue;
        }

        // 다날 && 가상계좌의 경우, 사업자 등록번호 10자리 추가
        if (payMethod === 'vbank' && pg === 'danal_tpay') {
          data.biz_num = bizNum;
        }

        // 휴대폰 소액결제의 경우, 실물 컨텐츠 여부 추가
        if (payMethod === 'phone') {
          data.digital = digital;
        }

        // 정기결제의 경우, customer_uid 추가
        if (pg === 'kcp_billing') {
          data.customer_uid = `cuid_${new Date().getTime()}`;
        }

        const options: PaymentOptions = {
          userCode,
          data,
          callback,
          callbackOnBack,
        };
        await imp.payment(options);
      } catch (e) {
        console.log(e);
      }
    };


    return (
      <IonPage>
        <Header title='결제 테스트' />
        <IonContent className='ion-padding'>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}>
            <IonItem>
              <IonLabel>
                PG사
              </IonLabel>
              <Selector
                data={PGS}
                value={pg}
                onChange={(e) => {
                  console.log(e.target);
                  setPg(e.target.value);

                  const methods = getMethods(e.target.value);
                  setPayMethod(methods[0].value);

                  const quotas = getQuotas(e.target.value);
                  setCardQuota(quotas[0].value);
                }}
              />
            </IonItem>
            <IonItem>
              <IonLabel>
                결제수단
              </IonLabel>
              <Selector
                data={getMethods(pg)}
                value={payMethod}
                onChange={(e) => setPayMethod(e.target.value)}
              />
            </IonItem>
            {payMethod === 'card' && (
              <IonItem>
                <IonLabel>
                  할부개월수
                </IonLabel>
                <Selector
                  data={getQuotas(pg)}
                  value={cardQuota}
                  onChange={(e) => setCardQuota(e.target.value)}
                />
              </IonItem>
            )}
            {payMethod === 'vbank' && (
              <IonItem>
                <IonLabel>
                  입금기한
                </IonLabel>
                <IonInput type={'number'} onIonChange={(e: any) => setVbankDue(e.target.value)} />
              </IonItem>
            )}
            {payMethod === 'vbank' && pg === 'danal_tpay' && (
              <IonItem>
                <IonLabel>
                  사업자번호
                </IonLabel>
                <IonInput type={'number'} onIonChange={(e: any) => setBizNum(e.target.value)} />
              </IonItem>
            )}
            {payMethod === 'phone' && (
              <IonItem>
                <IonLabel>
                  실물 컨텐츠
                </IonLabel>
                <IonToggle checked={true} onIonChange={(e: any) => setDigital(e.target.value)} />
              </IonItem>
            )}
            <IonItem>
              <IonLabel>
                에스크로
              </IonLabel>
              <IonToggle checked={true} onIonChange={(e: any) => setEscrow(e.target.value)} />
            </IonItem>
            <IonItem>
              <IonLabel>
                주문명
              </IonLabel>
              <IonInput
                placeholder={'주문명은 필수입력입니다.'}
                value={name}
                required={true}
                onIonChange={(e: any) => setName(e.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonLabel>
                결제금액
              </IonLabel>
              <IonInput
                placeholder={'결제금액은 필수입력입니다.'}
                value={amount}
                required={true}
                type={'number'}
                onIonChange={(e: any) => setAmount(e.target.value)}
              />
            </IonItem>
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
                이름
              </IonLabel>
              <IonInput
                value={buyerName}
                onIonChange={(e: any) => setBuyerName(e.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonLabel>
                전화번호
              </IonLabel>
              <IonInput
                value={buyerTel}
                type={'number'}
                onIonChange={(e: any) => setBuyerTel(e.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonLabel>
                이메일
              </IonLabel>
              <IonInput
                value={buyerEmail}
                onIonChange={(e: any) => setBuyerEmail(e.target.value)}
              />
            </IonItem>
            <IonButton size={'large'} expand={'block'} type={'submit'}>결제하기</IonButton>
          </form>
        </IonContent>
      </IonPage>
    );
  }
;

export default Payment;
  