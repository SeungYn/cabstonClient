export default class AuthService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async signup(username, password, name, email, sex, university, dept, sno) {
    const data = await this.http.fetch('/join', {
      method: 'POST',
      body: JSON.stringify({
        nickname: username,
        loginId: password,
        name,
        email,
        sex,
        university,
        dept,
        sno,
      }),
    });
    this.tokenStorage.saveToken(data.token);
    return data;
  }

  async idDuplicateVerification(loginId) {
    const data = await this.http.fetch(`/auth/`, {
      method: 'POST',
      body: JSON.stringify({
        loginId,
      }),
    });
  }

  async login(username, password) {
    const data = await this.http.fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    this.tokenStorage.saveToken(data.token);
    return data;
  }

  async me() {
    const token = this.tokenStorage.getToken();
    return this.http.fetch('/me', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async logout() {
    this.tokenStorage.clearToken();
  }
}
