import React, { useEffect, useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../utils/hooks';
import { useLocation, useParams } from 'react-router-dom';
import { EssayContainer } from '../../../../styles/Speaking/SpeakingStyle';
import EssayForTest from './EssayForTest';
import EssayForSpeaking from './EssayForSpeaking';
import { StudyPageParams } from '../../../../models';
import { studyActions } from '../../../../features/study/study-slice';

const EssayScreen = () => {
  const modeCode = useLocation().search.replace('?mode=', '');

  // Essay for Test
  const pageParams: StudyPageParams = useParams() as any;
  const [selectedText, setSelectedText] = useState<string>('');
  const [flag, setFlag] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  // const speechScores = useAppSelector((state) => state.study.speechScores);
  // const totalScore = useAppSelector((state) => state.study.totalScore);
  // const speechTestError = useAppSelector(
  //   (state) => state.study.speechTestError
  // );
  // const pickedTextBox = useRef<HTMLDivElement>(null);
  // const scoreLoading = useAppSelector((state) => state.study.loading);
  useEffect(() => {
    dispatch(studyActions.resetSpeechScore());
  }, []);

  if (modeCode === 'test') {
    return (
      <EssayForTest
        setSelectedText={setSelectedText}
        pageParams={pageParams}
        // setFlag={flag}
      />
    );
  } else {
    return <EssayForSpeaking />;
  }
};

export default EssayScreen;
