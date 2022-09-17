export default class ChatService {
  constructor(http, tokenStorage, socket) {
    this.http = http;
    this.tokenStorage = tokenStorage;
    this.socket = socket;
  }

  async getMyInfo() {
    const data = await this.http.fetch(`/auth/info`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return data;
  }

  async getChats(partyId) {
    console.log('getchats', partyId);
    const data = await this.http.fetch(`/chat/${partyId}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return data;
  }

  async creatChat(partyId, chat) {
    const data = await this.http.fetch(`/chat/${partyId}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        chat,
      }),
    });
    return data;
  }

  async sendPosMarker(partyId, marker) {
    const data = await this.http.fetch(`/chat/position/${partyId}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        marker,
      }),
    });
  }

  onConnectChat(partyId, nickname) {
    console.log('chatServiceConnectChat', partyId, nickname);
    return this.socket.onConnectChat(partyId, nickname);
  }
  onChatSync(event, callback) {
    return this.socket.onSyncChat(event, callback);
  }
  onSync(event, callback) {
    return this.socket.onSync(event, callback);
  }

  getHeaders() {
    const token = this.tokenStorage.getToken();
    return { Authorization: `Bearer ${token}` };
  }
}
