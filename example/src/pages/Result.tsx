import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import styled from 'styled-components';
import { Icon, Button } from 'antd';

import Header from '../components/Header';

const Result: React.FC = ({ history }: any) => {
  const { location } = history;
  const { state } = location;
  const { response } = state;
  if (response) {
    const { type, error_code, error_msg, merchant_uid, imp_uid, success, imp_success } = response;
    const title = type === 'certification' ? '본인인증' : '결제';
    const isSuccess = Object.keys(response).indexOf('imp_success') === -1 ? success === 'true' : imp_success === 'true';

    return (
      <IonPage>
        <Header title={`${title} 결과`} />
        <IonContent className="ion-padding">
          <ResultContainer>
            <Icon
              type={isSuccess ? 'check-circle' : 'exclamation-circle'}
              style={{
                fontSize: 100,
                marginBottom: 30,
                color: isSuccess ? '#52c41a' : '#f5222d',
              }}
            />
            <h3><b>{`${title}에 ${isSuccess ? '성공' : '실패'}하였습니다`}</b></h3>
            <table>
              <tbody>
                {!isSuccess && (
                  <>
                    <tr>
                      <td>에러 코드</td>
                      <td>{error_code}</td>
                    </tr>
                    <tr>
                      <td>에러 메시지</td>
                      <td>{error_msg}</td>
                    </tr>
                  </>
                )}
                <tr>
                  <td>주문번호</td>
                  <td>{merchant_uid}</td>
                </tr>
                <tr>
                  <td>아임포트 번호</td>
                  <td>{imp_uid}</td>
                </tr>
              </tbody>
            </table>
            <Button
              ghost
              size="large"
              type="danger"
              icon="swap-left"
              onClick={(e: any) => {
                e.preventDefault();
                history.push(`/`);
              }}>
                돌아가기
              </Button>
          </ResultContainer>      
        </IonContent>
      </IonPage>
    );
  }
  return <IonPage></IonPage>
};

const ResultContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  left: 1rem;
  right: 1rem;
  top: 1rem;
  bottom: 1rem;
  background-color: #fff;
  border-radius: 3px;

  table {
    margin: 2rem;
    margin-bottom: 2rem;
    tbody {
      tr {
        td {
          line-height: 2;
        }
        td:first-child {
          color: #888;
          padding-right: 1rem;
          white-space: pre;
          vertical-align: top;
        }
      }
    }
  }
`;

export default Result;
