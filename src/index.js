import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Login from './components/Login';
import Logout from './components/Logout';
import Bank from './components/main/bank/Bank';

import { Router, Route, browserHistory,IndexRoute } from 'react-router';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import  storage  from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';


function checkAuthentication(nextState, replace) {
    if (localStorage.getItem('user') === null) {
      replace('/?msg=você precisa estar logado para acessar o endereço');
    }
}


const reducers = combineReducers({ });

const persistConfig = {
    key:'root',
    storage,
    whitelist:[]
}

const persistedReducer = persistReducer(persistConfig, reducers);
    
const store = createStore(persistedReducer, applyMiddleware(thunkMiddleware));
const persistor = persistStore(store);


ReactDOM.render(
    (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={Login} store={store} />
          <Route path="/sair" component={Logout} />
          <Route path="/gestao" component={App} onEnter={checkAuthentication} store={store}>
            <Route path="/gestao/sair" component={Logout} />            
  
            <IndexRoute component={Bank}  onEnter={checkAuthentication}/>
            <Route  path="/gestao/bancos" component={Bank}  onEnter={checkAuthentication}/>
  
          </Route>
          {/* <Route path="/cliente" component={App} store={store}>
            <Route path="/cliente/sair" component={Logout} />            
  
            <IndexRoute component={BankAccount} />
            <Route  path="/cliente/conta" component={BankAccount} />
  
          </Route> */}
          
        </Router>
      </Provider>
    ),
    document.getElementById('root')
  );