import React, { useEffect } from 'react';

const Chat = ({ match }) => {
  //1 채팅 소켓 연결
  //2 채팅 내역 가져오기
  console.log(match);
  useEffect(() => {
    console.log(match);
  });
  return 'a';
};

export default Chat;
