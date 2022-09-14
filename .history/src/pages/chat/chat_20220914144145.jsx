import React, { useCallback, useEffect, useState } from 'react';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './chat.module.css';
import { chatTime } from '../../util/data';
const Chat = ({ chatService }) => {
  //1 채팅 소켓 연결
  //2 채팅 내역 가져오기
  //const { partyId } = useParams();
  const [inputText, setInputText] = useState('');
  const [myName, setMyName] = useState();
  const [chats, setChats] = useState();
  const [partyid, setPartyid] = useState();
  const navigation = useNavigate();
  const submit = useCallback((e) => {
    e.preventDefault();
    if (inputText == '') {
      return;
    }
    chatService
      .creatChat(partyid, inputText)
      .then((data) => console.log('test'));
    console.log('input test');
    inputRef.current.focus();
    setInputText('');
  });
  const contentRef = useRef();
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
  const onCreated = (chat) => {
    setChats((chats) => [...chats, chat]);
    console.log('새로운', chat);
    contentRef.current.scrollIntoView({ block: 'end', inline: 'end' });
    return;
  };

  const getMyInfo = async () => {
    await chatService.getMyInfo().then((data) => {
      setPartyid(data.partyId);
      setMyName(data.nickname);
    });
  };

  useEffect(() => {
    let disConnect = null;
    let chatSync = null;
    let inSync = null;
    let exitSync = null;
    chatService.getMyInfo().then((data) => {
      setPartyid(data.partyId);
      setMyName(data.nickname);
      disConnect = chatService.onConnectChat(partyid);
    });

    if (!partyid) {
      console.log('파티아이디가 없음', partyid);
      return;
    }

    console.log(partyid);
    // if (partyId) {
    //   disConnect = chatService.onConnectChat(partyId);
    // } else {
    //   console.log('a', partyid);
    //   disConnect = chatService.onConnectChat(partyid);
    // }
    console.log('flag', partyid);
    const disConnect = chatService.onConnectChat(partyid);

    chatService.getChats(partyid).then((data) => {
      console.log(data);
      setChats([...data]);

      return;
    });

    console.log(disConnect);
    //contentRef.current.scrollIntoView({ block: 'end', inline: 'end' });
    const chatSync = chatService.onChatSync('chat', (data) => {
      console.log('emitchat');
      return onCreated(data);
    });
    const inSync = chatService.onChatSync('join', (data) => console.log(data));

    const exitSync = chatService.onChatSync('exit', (data) =>
      console.log(data)
    );

    return () => {
      //종료 순서 중요 이벤트들 부터 먼저 제거 후 연결 끊기
      chatSync();
      inSync();
      exitSync();
      disConnect();
    };
  }, [chatService, partyid]);

  // useEffect(() => {
  //   chatService.getMyInfo().then((data) => {
  //     setPartyid(data.partyId);
  //     setMyName(data.nickname);
  //   });

  //   if (!partyid) {
  //     console.log('파티아이디가 없음', partyid);
  //     return;
  //   }

  //   console.log(partyid);
  //   // if (partyId) {
  //   //   disConnect = chatService.onConnectChat(partyId);
  //   // } else {
  //   //   console.log('a', partyid);
  //   //   disConnect = chatService.onConnectChat(partyid);
  //   // }
  //   console.log('flag', partyid);
  //   const disConnect = chatService.onConnectChat(partyid);

  //   chatService.getChats(partyid).then((data) => {
  //     console.log(data);
  //     setChats([...data]);

  //     return;
  //   });

  //   console.log(disConnect);
  //   //contentRef.current.scrollIntoView({ block: 'end', inline: 'end' });
  //   const chatSync = chatService.onChatSync('chat', (data) => {
  //     console.log('emitchat');
  //     return onCreated(data);
  //   });
  //   const inSync = chatService.onChatSync('join', (data) => console.log(data));

  //   const exitSync = chatService.onChatSync('exit', (data) =>
  //     console.log(data)
  //   );

  //   return () => {
  //     //종료 순서 중요 이벤트들 부터 먼저 제거 후 연결 끊기
  //     chatSync();
  //     inSync();
  //     exitSync();
  //     disConnect();
  //   };
  // }, [chatService, partyid]);

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        {chats && (
          <ul className={styles.chats} ref={contentRef}>
            {chats.map((item, i) => {
              if (item.user === myName) {
                return (
                  <li key={item.id} className={styles.chats__mychat}>
                    {i == 0 && <p className={styles.nickname}>{item.user}</p>}
                    {i != 0 &&
                      chatTime(item.createdAt) !=
                        chatTime(chats[i - 1].createdAt) &&
                      item.user !== chats[i - 1].user && (
                        <p className={styles.nickname}>{item.user}</p>
                      )}
                    <div className={styles.chats__content}>
                      <p className={styles.chats__time}>
                        {chatTime(item.createdAt)}
                      </p>
                      <p className={styles.chats__chat}>{item.chat}</p>
                    </div>
                    {/* 
											시간이 같으면 닉네임 출력 x 전에 채팅 닉네임과 다르면 닉네임 출력
										*/}
                  </li>
                );
              }
              return (
                <li key={item.id} className={styles.chats__otherchat}>
                  {i == 0 && <p className={styles.nickname}>{item.user}</p>}
                  {i != 0 &&
                    chatTime(item.createdAt) !=
                      chatTime(chats[i - 1].createdAt) &&
                    item.user !== chats[i - 1].user && (
                      <p className={styles.nickname}>{item.user}</p>
                    )}
                  <div className={styles.chats__content}>
                    <p className={styles.chats__chat}>{item.chat}</p>
                    <p className={styles.chats__time}>
                      {chatTime(item.createdAt)}
                    </p>
                  </div>
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
