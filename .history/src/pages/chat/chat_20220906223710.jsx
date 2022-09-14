import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import styles from './chat.module.css';
import { chatTime } from '../../util/data';
const Chat = ({ chatService }) => {
  //1 채팅 소켓 연결
  //2 채팅 내역 가져오기
  const { partyId } = useParams();
  const [inputText, setInputText] = useState();
  const [myName, setMyName] = useState();
  const [chats, setChats] = useState();

  const submit = (e) => {
    e.preventDefault();
    console.log(e);
    console.log(inputRef);
    console.log(inputRef.current);
    inputRef.current.focus();
    setInputText('');
  };
  const inputRef = useRef();
  const onChange = (e) => {
    const {
      target: { name, value, checked },
    } = e;

    switch (name) {
      case 'text':
        return setInputText(value);
    }
  };
  const click = (e) => {
    console.log(123);
  };
  useEffect(() => {
    const disConnect = chatService.onConnectChat();
    chatService.getMyInfo().then((data) => setMyName(data.nickname));

    chatService.getChats(partyId).then((data) => setChats([...data]));

    return () => disConnect();
  }, [chatService]);
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        {chats && (
          <ul className={styles.chats}>
            {chats.map((item) => {
              if (item.user === myName) {
                return (
                  <li key={item.id} className={styles.chats__mychat}>
                    {item.createdAt}
                  </li>
                );
              }
              return (
                <li key={item.id} className={styles.chats__otherchat}>
                  {item.createdAt}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <form className={styles.inputBar} onSubmit={submit}>
        <input
          name='text'
          value={inputText}
          type='text'
          className={styles.input__text}
          ref={inputRef}
          onChange={onChange}
        />
        <button className={styles.sendBtn}>전송</button>
      </form>
    </section>
  );
};

export default Chat;
