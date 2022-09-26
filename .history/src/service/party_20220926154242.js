export default class PartyService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async outParty(partyId) {
    const data = await this.http.fetch(`/party/outParty/${partyId}`, {
      method: 'POST',
      headers: this.getHeaders(),
    });

    return data;
  }

  //파티참가하기
  //노드 /party/joinParty/:partyId
  async partyJoin(partyId) {
    const data = await this.http.fetch(`/party/joinParty/${partyId}`, {
      method: 'POST',
      headers: this.getHeaders(),
    });

    return data;
  }

  //준비하기
  //노드 /auth/partyReady
  async partyReady() {
    const data = await this.http.fetch(`/party/partyReady`, {
      method: 'POST',
      headers: this.getHeaders(),
    });
    return data;
  }

  //준비해제
  // 노드 /auth/PartyReady
  async partyUnReady() {
    const data = await this.http.fetch('/auth/partyUnReady', {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return data;
  }

  //스프링 서버 /user/restaurant/${id}/parties
  //노드 서버 /party/${id}
  async getPartyByRestaurantId(id) {
    const data = await this.http.fetch(`/party/${id}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return data;
  }

  //스프링 서버 /user/restaurant/party/${id}/join

  async makePartyByRestaurantId(id, title, count) {
    console.log('???');
    const data = await this.http.fetch(`/user/restaurant/party/${id}/join`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        title,
        maximumCount: count,
      }),
    });

    return data;
  }

  // 파티만들기
  // 노드 서버 /party/makeParty2/:resId
  // /user/restaurant/{restaurant_id}/party
  async makePartyByRestaurantId2(title, maximumCount, clickedRestaurantId) {
    console.log('party Start');
    const data = await this.http.fetch(
      `/party/makeParty2/${clickedRestaurantId}`,
      {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          title,
          maximumCount,
        }),
      }
    );
    console.log('party222', data);
    return data;
  }

  //유저가 소속된 파티가져오기
  //노드 /party/myParty
  ///user/party
  async getMyParty() {
    const data = await this.http.fetch(`/party/myParty`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return data;
  }

  getHeaders() {
    const token = this.tokenStorage.getToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  }
}
