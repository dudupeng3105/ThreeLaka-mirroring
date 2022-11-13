import { PayloadAction } from '@reduxjs/toolkit';

import { call, put, takeLatest, fork, select } from 'redux-saga/effects';
import { GuildNotice, VideoInfo, GuildMemberList } from '../../models/guild';
import {
  getGuildNoticeApi,
  getProgressTaskApi,
  getUpcomingTaskApi,
  getGuildMemberApi,
  deleteGuildNoticeApi,
  createGuildNoticeApi,
  putGuildNoticeApi,
  postGuildHandOverApi,
} from '../../services/guildApi';
import { guildActions } from './guild-slice';

// 길드 공지 받아오기 SAGA
function* onGetGuildNoticeAsync(action: PayloadAction<string>) {
  // 길드 공지 받아오기 성공하면
  try {
    // model에 적어준 dto 값으로 작성
    const response: GuildNotice = yield call(getGuildNoticeApi, action.payload);

    yield put(guildActions.getGuildNoticeSuccess(response));
    // console.log('성공했나');
  } catch (error) {
    console.error();
  }
}

// 길드 진행중인 과제 받아오기 SAGA
function* onGetProgressTaskAsync(action: PayloadAction<string>) {
  // 길드 과제 받아오기 성공하면
  try {
    // model에 적어준 dto 값으로 작성
    const progressResponse: VideoInfo[] = yield call(
      getProgressTaskApi,
      action.payload
    );
    yield put(guildActions.getProgressTaskSuccess(progressResponse));
    const upcomingResponse: VideoInfo[] = yield call(
      getUpcomingTaskApi,
      action.payload
    );
    yield put(guildActions.getUpcomingTaskSuccess(upcomingResponse));
  } catch (error) {
    console.error();
  }
}

function* onGetGuildMemberListAsync(action: PayloadAction<string>) {
  // 멤버 정보 받아오기 성공하면
  try {
    const response: GuildMemberList = yield call(
      getGuildMemberApi,
      action.payload
    );
    yield put(guildActions.getGuildMemberSuccess(response));
  } catch (error) {
    console.error();
  }
}

function* onDeleteGuildNoticeStartAsync(action: PayloadAction<string>) {
  try {
    yield call(deleteGuildNoticeApi);
    yield put(guildActions.getGuildNotice(action.payload));
  } catch (error) {
    console.error();
  }
}

function* onCreateGuildNoticeStartAsync(action: PayloadAction<string>) {
  try {
    console.warn('되나');
    const guildId: string = yield select(
      (state) => state.auth.currentUser.guildId
    );
    yield call(createGuildNoticeApi, action.payload);
    yield put(guildActions.getGuildNotice(guildId));
  } catch (error) {
    console.error();
  }
}

function* onPutGuildNoticeStartAsync(action: PayloadAction<string>) {
  try {
    console.warn('되나');
    const guildId: string = yield select(
      (state) => state.auth.currentUser.guildId
    );
    yield call(putGuildNoticeApi, action.payload);
    yield put(guildActions.getGuildNotice(guildId));
  } catch (error) {
    console.error();
  }
}

function* onPostGuildHandOverAsync(action: PayloadAction<string>) {
  try {
    yield call(postGuildHandOverApi, action.payload);
  } catch (error) {
    console.error();
  }
}

// 길드 공지 받아오기 watch
export function* watchGetGuildNoticeAsync() {
  yield takeLatest(guildActions.getGuildNotice.type, onGetGuildNoticeAsync);
}
// 길드 진행중인 과제 받아오기 watch
export function* watchGetProgressTaskAsync() {
  yield takeLatest(guildActions.getProgressTask.type, onGetProgressTaskAsync);
  yield takeLatest(guildActions.getUpcomingTask.type, onGetProgressTaskAsync);
}
// 길드 멤버 받아오기 watch
export function* watchGetGuildMemberListAsync() {
  yield takeLatest(guildActions.getGuildMember.type, onGetGuildMemberListAsync);
}
// 길드 공지 삭제 watch
export function* watchDeleteGuildNoticeAsync() {
  yield takeLatest(
    guildActions.deleteGuildNoticeStart.type,
    onDeleteGuildNoticeStartAsync
  );
}

// 길드 공지 생성 watch
export function* watchCreateGuildNoticeAsync() {
  yield takeLatest(
    guildActions.createGuildNoticeStart.type,
    onCreateGuildNoticeStartAsync
  );
}

// 길드 공지 수정 watch
export function* watchPutGuildNoticeAsync() {
  yield takeLatest(
    guildActions.putGuildNoticeStart.type,
    onPutGuildNoticeStartAsync
  );
}

// 길드 마스터 넘기기 watch
export function* watchPostGuildHandOverAsync() {
  yield takeLatest(
    guildActions.postGuildHandOverStart.type,
    onPostGuildHandOverAsync
  );
}

export const guildSagas = [
  fork(watchGetGuildNoticeAsync),
  fork(watchGetProgressTaskAsync),
  fork(watchGetGuildMemberListAsync),
  fork(watchDeleteGuildNoticeAsync),
  fork(watchCreateGuildNoticeAsync),
  fork(watchPutGuildNoticeAsync),
  fork(watchPostGuildHandOverAsync),
];
