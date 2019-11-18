import { IonContent, IonPage } from '@ionic/react';
import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { IMP, CertificationData, CertificationOptions, Response, Carrier } from 'iamport-capacitor';

import Header from '../components/Header';
import FormContainer from '../components/FormContainer';
import Selector from '../components/Selector';

import { CARRIERS } from '../constants';

const  { Item } = Form;

const Certification: React.FC = ({ history, form }: any) => {
  const initialCarrier: Carrier = 'KTF';
  const [carrier, setCarrier] = useState<Carrier>(initialCarrier);

  const { getFieldDecorator, validateFieldsAndScroll } = form;

  function callback(response: Response) {
    const newResponse = {
      ...response,
      type: 'certification',
    };

    history.push('/result', { response: newResponse });
  }

  function handleSubmit(e: any) {
    e.preventDefault();

    validateFieldsAndScroll((error: any, values: any) => {
      if (!error) {
        const { merchantUid, company, name, phone, minAge } = values;
        const imp = new IMP();
        const userCode: string = 'imp10391932';

        const data: CertificationData = {
          merchant_uid: merchantUid,
        };
        if (company) {
          data.company = company;
        }
        if (carrier) {
          data.carrier = carrier;
        }
        if (name) {
          data.name = name;
        }
        if (phone) {
          data.phone = phone;
        }
        if (minAge) {
          data.min_age = minAge;
        }
        
        const options: CertificationOptions = {
          userCode,
          data,
          callback,
        };

        imp.certification(options);
      }
    });
  };

  return (
    <IonPage>
      <Header title="본인인증 테스트" />
      <IonContent className="ion-padding" style={{ backgruondColor: '#f5f5f5' }}>
        <FormContainer onSubmit={handleSubmit}>
          <Item label="주문번호">
            {getFieldDecorator('merchantUid', {
                rules: [
                  {
                    required: true,
                    message: '주문번호는 필수입력입니다.',
                  },
                ],
                initialValue: `mid_${new Date().getTime()}`,
              })(<Input size="large" />)}
          </Item>
          <Item label="회사명">
            {getFieldDecorator('company', {
              initialValue: 'SIOT',
            })(<Input size="large" />)}
          </Item>
          <Item label="통신사">
            <Selector
              data={CARRIERS}
              value={carrier}
              initialValue={initialCarrier}
              onChange={(value: Carrier) => setCarrier(value)}
            />
          </Item>
          <Item label="이름">
            {getFieldDecorator('name', {
              initialValue: '최소리',
            })(<Input size="large" />)}
          </Item>
          <Item label="전화번호">
            {getFieldDecorator('phone', {
              initialValue: '01065791337'
            })(<Input type="number" size="large" />)}
          </Item>
          <Item label="최소연령">
            {getFieldDecorator('minAge')(
              <Input
                type="number"
                size="large"
                placeholder="허용 최소 만 나이"
              />
            )}
          </Item>
          <Button type="primary" size="large" htmlType="submit">
            본인인증 하기
          </Button>
        </FormContainer>
      </IonContent>
    </IonPage>
  );
};

export default Form.create()(Certification);
