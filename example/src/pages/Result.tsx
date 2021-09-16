import { IonContent, IonIcon, IonPage } from '@ionic/react';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { alertCircleOutline, arrowBackOutline, checkmarkCircleOutline } from 'ionicons/icons';

const Result: React.FC = ({ history }: any) => {

  console.log('헬로헬로 Result gggg');
  console.log(history.location);

  // const { location } = history;
  // const { state } = location;
  // const { response } = state;
  const response1 = history.location.state;

  if (response1) {

    console.log('response 가 있어');
    console.log(history.location.state);

    const { location } = history;
    const { state } = location;
    const { response } = state;

    const { type, error_code, error_msg, merchant_uid, imp_uid, success, imp_success } = response;

    console.log(error_msg);
    const title = type === 'certification' ? '본인인증' : '결제';
    const isSuccess = Object.keys(response).indexOf('imp_success') === -1 ? success === 'true' : imp_success === 'true';
    const color = isSuccess ? '#52c41a' : '#f5222d';

    return (
      <IonPage>
        <IonContent className='ion-padding'>
          <ResultContainer color={color}>
            <IonIcon
              icon={isSuccess ? checkmarkCircleOutline : alertCircleOutline}
              style={{ color, fontSize: 100, marginBottom: 30 }}
            />
            <h3><b>{`${title}에 ${isSuccess ? '성공' : '실패'}하였습니다`}</b></h3>
            <table>
              <tbody>
              {isSuccess ? (
                <>
                  <tr>
                    <td>주문번호</td>
                    <td>{merchant_uid}</td>
                  </tr>
                  <tr>
                    <td>아임포트 번호</td>
                    <td>{imp_uid}</td>
                  </tr>
                </>
              ) : (
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
              </tbody>
            </table>
            <Link to={`/${type}`} replace>
              <IonIcon icon={arrowBackOutline}/>
              돌아가기
            </Link>
          </ResultContainer>
        </IonContent>
      </IonPage>
    );
  }

  console.log('끝까지 왔어 ㅋㅋ');
  // console.log(history.location.pathname)
  return <IonPage>
    {/* <Link to={`/${history.location.pathname}`}/> */}
  </IonPage>;
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

  a {
    border-radius: 3px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: 1px solid ${props => props.color};
    color: ${props => props.color};

    i.anticon {
      margin-right: 0.5rem;
    }
  }
`;

export default Result;
