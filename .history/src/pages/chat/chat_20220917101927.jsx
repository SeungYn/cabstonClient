import React, { useCallback, useEffect, useState } from 'react';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './chat.module.css';
import { chatTime } from '../../util/data';
import useWatchLocation from '../../hooks/useWatchLocation';
import { geolocationOptions } from '../../constants/geolocationOptions';

const Chat = ({ chatService, kakaoService }) => {
  //1 채팅 소켓 연결
  //2 채팅 내역 가져오기
  //const { partyId } = useParams();
  const [inputText, setInputText] = useState('');
  const [myName, setMyName] = useState();
  const [chats, setChats] = useState();
  const [partyid, setPartyid] = useState();

  const [agree, setAgree] = useState(false);
  const mapRef = useRef();
  const [mainMap, setMainMap] = useState('');
  const [preMarker, setPreMarker] = useState('');
  //사용자들 위치들
  const [usersMarkers, setUsersMarkers] = useState({});

  //현재 사용자 위치 추적
  const {
    location,
    cancelLocationWatcha,
    error,
    firstLocation: firstLocation2,
  } = useWatchLocation(geolocationOptions);

  const navigation = useNavigate();

  const submit = useCallback((e) => {
    e.preventDefault();
    if (inputText == '') {
      return;
    }
    chatService.creatChat(partyid, inputText).then((data) => console.log(data));
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

  const movePosition = (posSocketData) => {
    const { nickname, location } = posSocketData;

    if (nickname !== myName) {
      console.log(usersMarkers);
      if (usersMarkers[nickname]) {
        console.log('if 안쪽');
        usersMarkers[nickname].setMap(null);
      }

      const markerPosition = kakaoService.getLatLng(
        location.latitude,
        location.longitude
      );
      const marker = kakaoService.getMapMarker(markerPosition, mainMap);

      //setUsersMarkers({ ...usersMarkers, [nickname]: marker });
      setUsersMarkers({ qwe: 'qwe' });
    }
  };

  useEffect(() => {
    console.log('파티아이디호출');
    chatService.getMyInfo().then((data) => {
      if (!data.partyId) {
        return navigation('/partyEmpty');
      }
      setPartyid(data.partyId);
      console.log('nick', data.nickname);
      setMyName(data.nickname);
    });
    return () => {
      console.log('useEffect0종료');
    };
  }, [chatService]);

  useEffect(() => {
    console.log('useeffect2');

    //파티 아이디랑 닉네임이 업데이트 안되면 종료 소켓연결 x
    if (!partyid || !myName) {
      console.log('파티아이디가 없음', partyid, myName);
      return;
    }

    console.log('파티채팅입장', partyid, myName);
    const disConnect = chatService.onConnectChat(partyid, myName);

    chatService.getChats(partyid).then((data) => {
      setChats([...data]);
      contentRef.current.scrollIntoView({ block: 'end', inline: 'end' });
      return;
    });
    const inSync = chatService.onChatSync('join', (data) => console.log(data));
    const chatSync = chatService.onChatSync('chat', (data) => {
      console.log('emitchat');
      return onCreated(data);
    });

    const position = chatService.onChatSync('pos', (data) => {
      console.log(data);
      console.log(usersMarkers);
      movePosition(data);
    });

    const exitSync = chatService.onChatSync('exit', (data) =>
      console.log(data)
    );

    return () => {
      //종료 순서 중요 이벤트들 부터 먼저 제거 후 연결 끊기
      chatSync();
      inSync();
      position();
      exitSync();
      disConnect();
      console.log('useEffect1종료');
    };
  }, [partyid, myName]);

  //처음 지도 셋팅
  useEffect(() => {
    //사용자가 동의시 채팅방 유저들 위치공유
    // if (!agree) {
    //   return;
    // }
    if (!firstLocation2) {
      return;
    }
    console.log('지도');
    chatService.sendPosMarker(partyid, firstLocation2);
    const mapContainer = mapRef.current;
    const mapOption = kakaoService.getMapOption(
      firstLocation2.latitude,
      firstLocation2.longitude
    );
    //메인지도
    const map = kakaoService.getNewMap(mapContainer, mapOption);
    setMainMap(map);
    const markerPosition = kakaoService.getLatLng(
      firstLocation2.latitude,
      firstLocation2.longitude
    );
    const marker = kakaoService.getMapMarker(markerPosition, map);
    setPreMarker(marker);
    return () => {
      console.log('useEffect2종료');
    };
  }, [agree, firstLocation2]);

  //실시간 위치추적
  useEffect(() => {
    console.log('움직임');

    if (location && mainMap) {
      const markerPosition = kakaoService.getLatLng(
        location.latitude,
        location.longitude
      );
      chatService.sendPosMarker(partyid, location);
      console.log(usersMarkers);
      const marker = kakaoService.getMapMarker(markerPosition, mainMap);
      preMarker && preMarker.setMap(null);
      setPreMarker(marker);
    }

    return () => {};
  }, [location]);

  return (
    <section className={styles.container}>
      <div className={styles.map__Container}>
        <div className={styles.map__header}>x</div>
        <div ref={mapRef} className={styles.map__map}></div>
      </div>
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
      <div>{usersMarkers}</div>
    </section>
  );
};

export default Chat;
