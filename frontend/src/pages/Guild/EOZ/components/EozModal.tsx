import React, { useState } from 'react';
import { createRoom, joinRoom, exitRoom } from '../EozPage';
import EozRoom from './EozRoom';
import RoomModal from './RoomModal';

import {
  EozModalContainer,
  EozRoomBlock,
  EozBtn,
} from '../../../../styles/Guild/GuildEozStyle';
import { ModalBackdrop } from '../../../../styles/DashBoard/DashBoardStyle';

type EnterRoomModalType = {
  onClickModal: () => void;
  isOpenModal: Boolean;
  guildId: number;
  videoId: string;
  roomInfo: {
    roomNumber: number;
    videoId: string | null;
    connectedUsers: never[];
  };
  guildInfo: any;
  localStream: any;
  learningRecordId: number;
};

const EozModal = (props: EnterRoomModalType) => {
  const {
    onClickModal,
    isOpenModal,
    guildId,
    roomInfo,
    localStream,
    learningRecordId,
    guildInfo,
  } = props;
  const [videoId, setVideoId] = useState<string>('');
  const [learningRecordid, setLearningRecordId] = useState<string>('');
  const [startEoz, setStartEoz] = useState<boolean>(false);

  // 입력 받기
  const onChangeVideoId = (event: any) => {
    setVideoId(event.target.value);
  };

  const onChangeRecordId = (event: any) => {
    setLearningRecordId(event.target.value);
  };
  if (startEoz) {
    return (
      <EozRoomBlock>
        <RoomModal
          videoId={videoId}
          learningRecordId={learningRecordId}
          roomInfo={roomInfo}
          guildId={guildId}
          onClickModal={onClickModal}
          guildInfo={guildInfo}
        />
        {/* <EozRoom
          isOpenModal={isOpenModal}
          onClickModal={onClickModal}
          roomNumber={roomInfo.roomNumber}
          guildId={guildId}
          roomInfo={roomInfo}
          learningRecordId={learningRecordId}
        /> */}
      </EozRoomBlock>
    );
  } else {
    return (
      <ModalBackdrop>
        <EozModalContainer>
          {roomInfo.videoId === null && (
            <div>
              <p>학습 영상을 정해주세요</p>
              <input
                type="text"
                onChange={onChangeVideoId}
                value={videoId}
                required
              />
            </div>
          )}
          <p>학습 기록을 골라주세요</p>
          <input
            type="text"
            onChange={onChangeRecordId}
            value={learningRecordid}
            required
          />
          <EozBtn
            widthSize="10vw"
            heightSize="3.5vh"
            fontColor="white"
            backgroundColor="blue"
            onClick={() => {
              JoinRoomhandler(
                roomInfo,
                roomInfo.roomNumber,
                guildId,
                videoId,
                learningRecordId
              );
              setStartEoz(true);
            }}
          >
            입장하기
          </EozBtn>
          <EozBtn
            widthSize="10vw"
            heightSize="3.5vh"
            fontColor="white"
            backgroundColor="grey"
            onClick={onClickModal}
          >
            돌아가기
          </EozBtn>
        </EozModalContainer>
      </ModalBackdrop>
    );
  }
};

const JoinRoomhandler = (
  roomInfo: {
    roomNumber: number;
    videoId: string | null;
    connectedUsers: never[];
  },
  roomNumber: number,
  guildId: number,
  videoId: string,
  learningRecordId: number
) => {
  if (roomInfo) {
    if (roomInfo.connectedUsers.length === 0) {
      createRoom(roomNumber, guildId, videoId, learningRecordId);
    } else {
      joinRoom(roomNumber, guildId, learningRecordId);
    }
  } else {
    createRoom(roomNumber, guildId, videoId, learningRecordId);
  }
};

export default EozModal;
