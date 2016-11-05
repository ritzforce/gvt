import loginSaga from './loginSaga';
import dashboardSaga from './dashboardSaga';

export default function* rootSaga(){
  yield [
    loginSaga(),
    dashboardSaga()
  ];
}
