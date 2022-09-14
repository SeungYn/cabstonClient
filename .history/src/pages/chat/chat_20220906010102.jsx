import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Chat = ({ match }) => {
  //1 채팅 소켓 연결
  //2 채팅 내역 가져오기
  const { partyId } = useParams();
  useEffect(() => {
    console.log(match);
  });
  return 'a';
};

export default Chat;
