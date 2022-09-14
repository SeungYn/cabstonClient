export default class AuthService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  

  //노드 /signup
  //스프링 /join
  async signup(nickname, loginId, password, email, sex, university, dept, sno) {
    const data = await this.http.fetchText('/join', {
      method: 'POST',
      body: JSON.stringify({
        nickname,
        password,
        loginId,
        email,
        sex,
        university,
        dept,
        sno,
      }),
    });
    //this.tokenStorage.saveToken(data.token);
    return data;
  }

  //헤더로 토큰 받고 로그인
  async headerTokenLogin(loginId, password) {
    const res = await fetch(`${this.http.baseURL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ loginId, password }),
    });

    const token = res.headers.get('Authorization').split(' ')[1];

    this.tokenStorage.saveToken(token);
    console.log(token);
    return token;
  }

  //노드서버 /idDuplicate
  //스프링서버 /duplicate-loginId
  async idDuplicateVerification(username) {
    const data = await this.http.fetchText(`/duplicate-loginId`, {
      method: 'POST',
      body: username,
    });
    return data;
  }

  //이메일로 인증번호 받기
  async emailVerification(email) {
    console.log(email);
    const data = await this.http.fetch('/mail-auth', {
      method: 'POST',
      body: email,
      // JSON.stringify({
      //   loginId,
      // }),
    });
    return data;
  }

  //인증번호 확인
  async authenticationNumberVerification(number) {
    const data = await this.http.fetch('/mailcode-auth', {
      method: 'POST',
      body: number,
      // JSON.stringify({
      //   loginId,
      // }),
    });
    return data;
  }
  //노드서버 auth/login
  async login(loginId, password) {
    const data = await this.http.fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ loginId, password }),
    });
    this.tokenStorage.saveToken(data.token);
    return data;
  }

  async test() {
    const data = await this.http.fetch('/user', {
      method: 'GET',
      headers: this.getHeaders(),
    });
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

  getHeaders() {
    const token = this.tokenStorage.getToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  }
}
