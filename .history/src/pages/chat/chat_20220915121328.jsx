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
  //현재 사용자 위치 추적
  const {
    location,
    cancelLocationWatcha,
    error,
    firstLocation: firstLocation2,
  } = useWatchLocation(geolocationOptions);
  const [location2, setLocation2] = useState();
  const [firstLocation, setFirstLocation] = useState();
  const [locationWatchId, setLocationWatchId] = useState();

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

  const handleSuccess = (pos) => {
    const { latitude, longitude } = pos.coords;

    setLocation2({ latitude, longitude });
    return { latitude, longitude };
  };
  const handleError = (error) => {
    console.error(error);
  };

  const FirstSuccess = (pos) => {
    const { latitude, longitude } = pos.coords;
    alert('first현재위치', latitude, longitude);
    setFirstLocation({ latitude, longitude });
    return { latitude, longitude };
  };

  const cancelLocationWatch = () => {
    const { geolocation } = navigator;
    console.log('종료');
    if (locationWatchId && geolocation) {
      geolocation.clearWatch(locationWatchId.current);
    }
  };

  useEffect(() => {
    console.log('파티아이디호출');
    chatService.getMyInfo().then((data) => {
      if (!data.partyId) {
        return navigation('/partyEmpty');
      }
      setPartyid(data.partyId);
      setMyName(data.nickname);
    });
  }, [chatService]);

  useEffect(() => {
    console.log('useeffect2');

    if (!partyid) {
      console.log('파티아이디가 없음', partyid);
      return;
    }
    console.log('dlTdma');
    const disConnect = chatService.onConnectChat(partyid);

    chatService.getChats(partyid).then((data) => {
      console.log(data);
      setChats([...data]);
      contentRef.current.scrollIntoView({ block: 'end', inline: 'end' });
      return;
    });

    console.log(disConnect);

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
  }, [partyid]);

  useEffect(() => {
    // const { geolocation } = navigator;
    // // If the geolocation is not defined in the used browser we handle it as an error
    // console.log('위치찾기');
    // if (!geolocation) {
    //   return;
    // }
    // const id = geolocation.watchPosition(
    //   handleSuccess,
    //   handleError,
    //   geolocationOptions
    // );
    // setLocationWatchId(id);
    // geolocation.getCurrentPosition(
    //   FirstSuccess,
    //   handleError,
    //   geolocationOptions
    // );
  }, [partyid]);

  //처음 지도 셋팅
  useEffect(() => {
    //사용자가 동의시 채팅방 유저들 위치공유
    // if (!agree) {
    //   return;
    // }
    if (!firstLocation2) {
      return;
    }

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
  }, [agree, firstLocation2]);
  //실시간 위치추적
  useEffect(() => {
    console.log('움직임');

    if (location && mainMap) {
      alert('위치수정');
      const markerPosition = kakaoService.getLatLng(
        location.latitude,
        location.longitude
      );
      console.log(mainMap);
      const marker = kakaoService.getMapMarker(markerPosition, mainMap);
      console.log(marker);
      console.log('premarker', preMarker);
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
    </section>
  );
};

export default Chat;
