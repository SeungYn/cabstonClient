export default class ChatService {
  constructor(http, tokenStorage, socket) {
    this.http = http;
    this.tokenStorage = tokenStorage;
    this.socket = socket;
  }

  async getMyInfo() {
    const data = this.http.fetch(`/auth/info`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return data;
  }

  async getChats(partyId) {
    const data = this.http.fetch(`/chat/${partyId}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return data;
  }

  async creatChat(partyId, chat) {
    const data = this.http.fetch(`/chat/${partyId}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        chat,
      }),
    });
    return data;
  }

  async onConnectChat(partyId) {
    return this.socket.onConnectChat(partyId);
  }

  onSync(event, callback) {
    return this.socket.onSync(event, callback);
  }

  getHeaders() {
    const token = this.tokenStorage.getToken();
    return { Authorization: `Bearer ${token}` };
  }
}
