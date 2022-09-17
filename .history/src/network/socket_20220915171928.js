import socket from 'socket.io-client';

export default class Socket {
  constructor(baseURL, getAccessToken) {
    this.baseURL = baseURL;
    this.getAccessToken = getAccessToken;
    this.chatio = null;

    this.io = socket(baseURL, {
      auth: (cb) => cb({ token: getAccessToken() }),
    });
    console.log(
      socket(baseURL, {
        auth: { token: getAccessToken() },
      })
    );
    this.io.on('connext_error', (err) => {
      console.log('socket error', err.message);
    });
    console.log('socket class!!!!');
  }

  onSync(event, callback) {
    if (!this.io.connected) {
      this.io.connect();
    }

    this.io.on(event, (message) => callback(message));
    return () => this.io.off(event);
  }

  onSyncChat(event, callback) {
    //이것때문에 계속 재연결;;
    // if (!this.chatio.connected) {
    //   this.chatio.connect();
    //   console.log('connect재연결');
    // }

    this.chatio.on(event, (message) => callback(message));
    return () => {
      console.log(event, '제거');
      return this.chatio.off(event);
    };
  }

  onConnectChat(partyId, nickname) {
    console.log('socket', partyId);
    if (!this.chatio) {
      this.chatio = socket(`${this.baseURL}/room`, {
        auth: (cb) => cb({ token: this.getAccessToken(), partyId, nickname }),
      });
      //파티아이디 임시로 auth에 넣어줌 새로고침하면 query가 전달이안됨 우짜지
      console.log('다음', partyId);
      console.log('chat connect!');
    }

    return () => {
      console.log('연결종료');
      this.chatio.disconnect();
      this.chatio = null;
      return;
    };
  }
}
