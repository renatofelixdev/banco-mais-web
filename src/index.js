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


import AppClient from './AppClient';
import LoginClient from './components/LoginClient';
import MyAccounts from './components/client/MyAccounts';
import BankStatement from './components/client/BankStatement';
import BankDeposit from './components/client/BankDeposit';
import BankWithdrawal from './components/client/BankWithdrawal';
import BankTransfer from './components/client/BankTransfer';

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
import { banksAccounts, formBankAccount, bankAccountSelect } from './reducers/bankAccount';
import { bankStatement } from './reducers/operation';


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
                                    formBankAccount,
                                    bankAccountSelect,
                                  bankStatement});

const persistConfig = {
    key:'root',
    storage,
    whitelist:['formUserMaster', 'formUserClient', 'bankAccountSelect', 'bankStatement']
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

          <Route path="/cliente/login" component={LoginClient} store={store} />
          <Route path="/cliente" component={AppClient} store={store}>
            <Route path="/cliente/sair" component={Logout} />            
            <IndexRoute component={MyAccounts}  onEnter={checkAuthentication}/>
            <Route path="/cliente/minhas-contas" component={MyAccounts}  onEnter={checkAuthentication}/>
            <Route path="/cliente/extratos" component={BankStatement}  onEnter={checkAuthentication}/>
            <Route path="/cliente/deposito" component={BankDeposit}  onEnter={checkAuthentication}/>
            <Route path="/cliente/saque" component={BankWithdrawal}  onEnter={checkAuthentication}/>
            <Route path="/cliente/transferencias" component={BankTransfer}  onEnter={checkAuthentication}/>
          </Route>
          
        </Router>
      </Provider>
    ),
    document.getElementById('root')
  );