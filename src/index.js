import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Login from './components/Login';
import Logout from './components/Logout';
import Bank from './components/main/bank/Bank';
import FormBank from './components/main/bank/FormBank';
import BankAgency from './components/main/bankAgency/BankAgency';
import FormBankAgency from './components/main/bankAgency/FormBankAgency';
import UserClient from './components/main/userClient/UserClient';
import FormUserClient from './components/main/userClient/FormUserClient';
import BankAccount from './components/main/bankAccount/BankAccount';
import FormBankAccount from './components/main/bankAccount/FormBankAccount';

import { Router, Route, browserHistory,IndexRoute } from 'react-router';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import  storage  from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';


import { notification } from './reducers/notification';
import { progressBar } from './reducers/progressBar';
import { formUserMaster } from './reducers/userMaster';
import { banks, formBank } from './reducers/bank';
import { banksAgencies, formBankAgency } from './reducers/bankAgency';
import { usersClient, formUserClient } from './reducers/userClient';
import { banksAccounts, formBankAccount } from './reducers/bankAccount';


function checkAuthentication(nextState, replace) {
    if (localStorage.getItem('user') === null) {
      replace('/?msg=você precisa estar logado para acessar o endereço');
    }
}


const reducers = combineReducers({ notification, 
                                    progressBar, 
                                    formUserMaster,
                                    banks,
                                    formBank,
                                    banksAgencies,
                                    formBankAgency,
                                    usersClient,
                                    formUserClient,
                                    banksAccounts,
                                    formBankAccount});

const persistConfig = {
    key:'root',
    storage,
    whitelist:['formUserMaster']
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
            <Route  path="/gestao/bancos/formulario" component={FormBank}  onEnter={checkAuthentication}/>

            <Route  path="/gestao/agencias" component={BankAgency}  onEnter={checkAuthentication}/>
            <Route  path="/gestao/agencias/formulario" component={FormBankAgency}  onEnter={checkAuthentication}/>

            <Route  path="/gestao/clientes" component={UserClient}  onEnter={checkAuthentication}/>
            <Route  path="/gestao/clientes/formulario" component={FormUserClient}  onEnter={checkAuthentication}/>


            <Route  path="/gestao/contas-bancarias" component={BankAccount}  onEnter={checkAuthentication}/>
            <Route  path="/gestao/contas-bancarias/formulario" component={FormBankAccount}  onEnter={checkAuthentication}/>
  
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