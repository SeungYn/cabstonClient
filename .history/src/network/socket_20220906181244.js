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
  }

  onSync(event, callback) {
    if (!this.io.connected) {
      this.io.connect();
    }

    this.io.on(event, (message) => callback(message));
    return () => this.io.off(event);
  }

  onSyncChat(event, callback) {
    if (!this.chatio.connected) {
      this.chatio.connect();
    }

    this.chatio.on(event, (message) => callback(message));
    return () => this.chatio.off(event);
  }

  onConnectChat() {
    if (!this.chatio) {
      this.chatio = socket(`${this.baseURL}/room`, {
        auth: (cb) => cb({ token: this.getAccessToken() }),
      });
      console.log('chat connect!');
    }

    return () => this.chatio.disconnect();
  }
}