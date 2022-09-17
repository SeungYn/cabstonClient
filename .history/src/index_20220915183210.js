import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TokenStorage from './db/token';
import HttpClient from './network/http';
import { AuthErrorEventBus, AuthProvider } from './context/AuthContext';
import AuthService from './service/auth';
import { BrowserRouter } from 'react-router-dom';
import KakaoService from './service/kakao';
import PartyService from './service/party';
import Socket from './network/socket';
import ChatService from './service/chat';

const { kakao } = window;
const baseURL = 'https://8cd242376069fd.lhrtunnel.link'; //'http://192.168.219.102:8080'; //'http://localhost:8080';
const tokenStorage = new TokenStorage();
const authErrorEventBus = new AuthErrorEventBus();
const httpClient = new HttpClient(baseURL, authErrorEventBus);
const authService = new AuthService(httpClient, tokenStorage);
const socketClient = new Socket(baseURL, () => tokenStorage.getToken());
const kakaoService = new KakaoService(httpClient, tokenStorage, kakao);
const partyService = new PartyService(httpClient, tokenStorage);
const chatService = new ChatService(httpClient, tokenStorage, socketClient);
console.log('index');
ReactDOM.render(
  <BrowserRouter>
    <AuthProvider
      authService={authService}
      authErrorEventBus={authErrorEventBus}
    >
      <App
        kakao={kakao}
        kakaoService={kakaoService}
        partyService={partyService}
        chatService={chatService}
      />
    </AuthProvider>
  </BrowserRouter>,

  document.getElementById('root')
);
