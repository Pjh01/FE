import React, { useState, useEffect } from "react";
import * as C from "../CreateLesson/CreateLessonStyle";
import * as D from "../WordCreateTchr/WordDetailStyle";
import * as E from "../CreateLesson/Template3Tchr";
import * as L from "../LessonTchr/LessonStyle";
import * as O from "../CreateLesson/Template1Tchr";
import * as T from "../StudyLesson/Template1Std";
import * as W from "../WordTchr/WordStyle";
import Back from "/src/assets/icon/back.svg";
import correct from "/src/assets/icon/correct.svg";
import wrong from "/src/assets/icon/incorrect.svg";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export const Answer = ({ title, data, correctList = [true, true, true] }) => (
  <T.Container style={{ alignItems: "center" }}>
    <p>{title}</p>
    <O.Line style={{ justifyContent: "center", marginTop: "10px" }}>
      {data.map((el, index) => (
        <W.Section key={index} style={{ padding: "0" }}>
          <T.ImgContainer>
            <img style={{ height: "80px", margin: "8px" }} src={el.image} />
          </T.ImgContainer>
          <T.Text
            style={{
              width: "80px",
              height: "80px",
              fontSize: "1.5rem",
              margin: "8px",
              border: correctList[index]
                ? "2px solid #969696"
                : "2px solid #ff0000",
            }}
          >
            {el.meaning}
          </T.Text>
        </W.Section>
      ))}
    </O.Line>
  </T.Container>
);

const FeedbackTem5 = () => {
  const [feedbackData, setFeedbackData] = useState();
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState('');
  const location = useLocation(); // 피드백 ID를 state에서 가져오기 위해 useLocation 사용
  const feedbackId = location.state?.feedbackId; // 동적으로 feedbackId 받기
  const navigate = useNavigate(); // navigate 사용

  useEffect(() => {
    if (feedbackId) {
      axios
        .get(`https://maeummal.com/feedback/detail?id=${feedbackId}`)
        .then((response) => {
          if (response.data.isSuccess) {
            setFeedbackData(response.data.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [feedbackId]); // feedbackId가 변경될 때마다 호출

  useEffect(() => {
    const fetchUserInfo = async () => {
      const accessToken = localStorage.getItem("key");
      if (!accessToken) {
        setError('Authentication required');
        return;
      }
      try {
        const response = await axios.get('https://maeummal.com/user', {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        if (response.data.isSuccess) {
          setUserInfo(response.data.data);
        } else {
          throw new Error(response.data.message || 'Failed to fetch user info');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        setError('Failed to fetch user info: ' + error.message);
      }
    };
    fetchUserInfo();
  }, []);

  const BackLink = userInfo.iq != null ? '/mypagestd' : '/mypagetchr';

  return (
    <>
      <D.ImageWrap>
        <a href={BackLink}>
          <img src={Back} alt="Back to main" />
        </a>
      </D.ImageWrap>
      {feedbackData && (
        <L.LessonWrapper style={{ marginBottom: "5%" }}>
          <L.Section>
            <h1>{feedbackData.templateTitle || "강의 제목"}</h1>
          </L.Section>
          <C.FeedbackLine style={{ marginBottom: "5%" }}>
            <C.FirstBox>
              <img
                src={
                  feedbackData.correctnessList.includes(false) ? wrong : correct
                }
              />
            </C.FirstBox>
            <C.SecondBox>
              {feedbackData.solution || "No description provided."}
            </C.SecondBox>
          </C.FeedbackLine>
          <C.Result>
            <Answer
              title="학생이 입력한 답"
              data={feedbackData.studentFeedbackCards}
              correctList={feedbackData.correctnessList}
            />
            <Answer title="정답" data={feedbackData.correctFeedbackCards} />
          </C.Result>
          <C.AIWrapper>
            <C.HintGroup2
              style={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: '100%',
                  marginTop: '2%',
                }}
              >
                <C.Label style={{ marginLeft: '-3%' }}>AI 피드백</C.Label>
                <div style={{ width: '70%' }}></div>
              </div>
              <C.HintBox2
                style={{
                  width: '90%',
                  border: 'none',
                  fontSize: '1.2rem',
                  textAlign: 'left',
                }}
              >
                {feedbackData.aiFeedback}
              </C.HintBox2>
            </C.HintGroup2>
          </C.AIWrapper>
        </L.LessonWrapper>
      )}
    </>
  );
};

export default FeedbackTem5;
