import React, { useCallback, useEffect, useState } from 'react';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './chat.module.css';
import { chatTime } from '../../util/data';
import useWatchLocation from '../../hooks/useWatchLocation';
import { geolocationOptions } from '../../constants/geolocationOptions';
import { FaRegMap } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import MapAgreeAlert from '../../components/mapAgreeAlert/mapAgreeAlert';
const Chat = ({ chatService, kakaoService }) => {
  //1 채팅 소켓 연결
  //2 채팅 내역 가져오기
  //const { partyId } = useParams();
  const [inputText, setInputText] = useState('');
  const [myName, setMyName] = useState('');
  const [chats, setChats] = useState();
  const [partyid, setPartyid] = useState();

  //사용자 위치공유 동의
  const [agree, setAgree] = useState(false);
  const [agreeAlert, setAgreeAlert] = useState(false);
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
  const mapContainerRef = useRef();
  const mapParent = useRef();

  const [mapSwitch, setMapSwitch] = useState(false);

  const onChange = (e) => {
    const {
      target: { name, value, checked },
    } = e;

    switch (name) {
      case 'text':
        return setInputText(value);
    }
  };
  const onCreated = useCallback(
    (chat) => {
      setChats((chats) => [...chats, chat]);
      console.log('새로운', chat);
      contentRef.current.scrollIntoView({ block: 'end', inline: 'end' });
      return;
    },
    [chatService]
  );

  const onMapView = useCallback(() => {
    setAgreeAlert(true);
  }, []);
  const onMapClose = useCallback(() => setMapSwitch(false), []);
  //지도 출력부분

  //마우스 이벤트 부분
  let posX,
    posY,
    shiftX,
    shiftY = 0; //시작 위치

  const onDragStartHandler = (e) => {
    const { left, top } = mapContainerRef.current.getBoundingClientRect();
    posX = e.pageX;
    posY = e.clientY;
    shiftX = e.pageX - left;
    shiftY = e.clientY - top;
  };

  //항상 맵 중앙에 위치하기 때문에 부모의 left 값을 뺴줘야함 지도는 absolute라서 부모의 0부터 시작
  const onDragHeandler = (e) => {
    e.preventDefault();
    const {
      left: mapParentLeft,
      top: mapParentTop,
      width: mapParentWidth,
      height: mapParentHeight,
    } = mapParent.current.getBoundingClientRect();
    console.log(mapParentTop);
    const { width: mapContainerWidth, height: mapContainerHeight } =
      mapContainerRef.current.getBoundingClientRect();

    let moveX = posX - shiftX - mapParentLeft;
    let moveY = posY - shiftY - mapParentTop;
    if (moveX + mapContainerWidth > mapParentWidth) {
      moveX = mapParentWidth - mapContainerWidth;
    }

    if (moveY + mapContainerHeight > mapParentHeight) {
      moveY = mapParentHeight - mapContainerHeight;
    }

    if (moveX < 0) {
      moveX = 0;
    }

    if (moveY < 0) {
      moveY = 0;
    }

    mapContainerRef.current.style.left = `${moveX}px`;
    mapContainerRef.current.style.top = `${moveY}px`;

    posX = e.pageX;
    posY = e.clientY;
  };

  //socket으로 닉네임이랑 위치를 받아옴
  const movePosition = (posSocketData, mainMap2, flag) => {
    if (!flag) {
      return;
    }
    const { location } = posSocketData;
    const nickname = posSocketData.nickname.toString();
    console.log('emitPos', posSocketData);
    console.log(mainMap2);
    console.log(mainMap);
    if (nickname != myName.toString()) {
      console.log(nickname, myName, nickname == myName.toString());
      console.log(usersMarkers);
      //location이 있으면 usersMarkers에 저장
      if (location) {
        const markerPosition = kakaoService.getLatLng(
          location.latitude,
          location.longitude
        );
        const marker = kakaoService.getMapMarker(
          markerPosition,
          mainMap2,
          nickname
        );
        setUsersMarkers((markers) => {
          console.log(markers[nickname], 'set안에서 등록');
          console.log(markers);
          markers[nickname] && markers[nickname].setMap(null);
          return { ...markers, [nickname]: marker };
        });
      }
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
      setMyName(data.nickname.toString());
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

    const exitSync = chatService.onChatSync('exit', (data) =>
      console.log(data)
    );

    return () => {
      //종료 순서 중요 이벤트들 부터 먼저 제거 후 연결 끊기
      chatSync();
      inSync();

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
    let flag = true;
    if (!firstLocation2 || !partyid || !myName || !mapSwitch || !flag) {
      console.log('지도 종료');
      return;
    }
    console.log('ㅁㄴㅇㅁㄴㅇㅁㄴ지도온ㅁㄴㅇㅁㄴㅇ');
    chatService.sendPosMarker(partyid, firstLocation2);
    const mapContainer = mapRef.current;
    const mapOption = kakaoService.getMapOption(
      firstLocation2.latitude,
      firstLocation2.longitude
    );
    //메인지도
    const map = kakaoService.getNewMap(mapContainer, mapOption);

    //위치 이벤트 등록
    const position = chatService.onChatSync('pos', (data) => {
      movePosition(data, map);
    });

    setMainMap(map);
    const markerPosition = kakaoService.getLatLng(
      firstLocation2.latitude,
      firstLocation2.longitude
    );
    const marker = kakaoService.getMapMarker(markerPosition, map);
    setPreMarker(marker);

    return () => {
      console.log('useEffect2종료');
      position();
    };
  }, [agree, firstLocation2, partyid, myName, mapSwitch]);

  //실시간 위치추적
  useEffect(() => {
    let flag = true;
    console.log('움직임');
    if (!firstLocation2 || !partyid || !myName || !mapSwitch || !flag) {
      return;
    }

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

    return () => {
      console.log('실기간 위치추적 종료');
      flag = false;
    };
  }, [location, firstLocation2, partyid, myName, mapSwitch]);

  return (
    <section ref={mapParent} className={`${styles.container}`}>
      {agreeAlert && (
        <MapAgreeAlert
          setAgree={setAgree}
          setAgreeAlert={setAgreeAlert}
          setMapSwitch={setMapSwitch}
        />
      )}
      <div
        ref={mapContainerRef}
        className={`${styles.map__Container} ${
          mapSwitch ? styles.map__on : styles.map__off
        } `}
      >
        <div
          className={styles.map__header}
          onDragStart={onDragStartHandler}
          onDrag={onDragHeandler}
          draggable={true}
        >
          <button
            className={styles.map__closeBtn}
            onClick={useCallback(() => {
              setMapSwitch(false);
            }, [])}
          >
            닫기
          </button>
        </div>
        <div ref={mapRef} className={styles.map__map}></div>
      </div>
      <div className={styles.content}>
        {chats && (
          <ul className={styles.chats} ref={contentRef}>
            {chats.map((item, i) => {
              return (
                <li
                  key={item.id}
                  className={
                    item.user.toString() === myName
                      ? styles.chats__mychat
                      : styles.chats__otherchat
                  }
                >
                  {i == 0 && <p className={styles.nickname}>{item.user}</p>}
                  {i != 0 &&
                    (chatTime(item.createdAt) !=
                    chatTime(chats[i - 1].createdAt) ? (
                      <p className={styles.nickname}>{item.user}</p>
                    ) : (
                      item.user !== chats[i - 1].user && (
                        <p className={styles.nickname}>{item.user}</p>
                      )
                    ))}
                  <div
                    className={`${styles.chats__content} ${
                      item.user.toString() !== myName && styles.chats__otherChat
                    }`}
                  >
                    <p className={styles.chats__time}>
                      {chatTime(item.createdAt)}
                    </p>
                    <p className={styles.chats__chat}>{item.chat}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <form className={styles.inputBar} onSubmit={submit}>
        <IconContext.Provider
          value={{
            color: 'green',
            size: '3rem',
            style: { cursor: 'pointer' },
          }}
        >
          <FaRegMap
            onClick={useCallback(() => {
              setAgreeAlert(true);
            }, [])}
          />
        </IconContext.Provider>
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
