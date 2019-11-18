import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <HomeContainer>
          <BlueBox>
            <h2>아임포트 테스트</h2>
            <p>아임포트 CAPACITOR 모듈 테스트 화면입니다.</p>
            <p>아래 버튼을 눌러 결제 또는 본인인증 테스트를 진행해주세요.</p>
          </BlueBox>
          <Link to="/payment">
            <Icon type="credit-card" />
            결제하기
          </Link>
          <Link to="/certification">
            <Icon type="user" />
            본인인증 하기
          </Link>
        </HomeContainer>
      </IonContent>
    </IonPage>
  );
};

const HomeContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  
  a {
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #333;
    text-decoration: none;
    text-align: center;
    background-color: #fff;
    width: 130px;
    height: 100px;
    border-radius: 3px;
    margin: 0 0.5rem;
    .anticon {
      font-size: 1.4rem;
      margin-bottom: 0.5rem;
    }
  }
`;

const BlueBox = styled.div`
  position: absolute;
  z-index: 0;
  left: 0;
  right: 0;
  top: 0;
  bottom: 50%;
  background-color: #344e81;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  * {
    color: #fff;
  }

  p {
    margin: 0;
    line-height: 1.5;
    font-size: 0.8rem;
  }
`;

export default Home;
