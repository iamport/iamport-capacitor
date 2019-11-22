import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Payment from './pages/Payment';
import Certification from './pages/Certification';
import Result from './pages/Result';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
/* antd */
import 'antd/dist/antd.less';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/home" component={Home} exact />
        <Route path="/payment" component={Payment} exact />
        <Route path="/certification" component={Certification} exact />
        <Route path="/result" component={Result} exact />
        <Route path="/" render={() => <Redirect to="/home" />} exact />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
