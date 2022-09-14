export default class ChatService {
  constructor(http, tokenStorage, socket) {
    this.http = http;
    this.tokenStorage = tokenStorage;
    this.socket = socket;
  }

  getMyInfo() {
    const data = this.http.fetch(`/auth/info`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
  }

  onConnectChat() {
    return this.socket.onConnectChat();
  }

  onSync(event, callback) {
    return this.socket.onSync(event, callback);
  }

  getHeaders() {
    const token = this.tokenStorage.getToken();
    return { Authorization: `Bearer ${token}` };
  }
}
