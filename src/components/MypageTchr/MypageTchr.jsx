import React, { useState, useEffect } from 'react';
import * as M from './MypageStyle'
import My from '/src/assets/image/profile.svg';
import Upload from '/src/assets/icon/uploadphoto.svg';
import Settings from '/src/assets/icon/settings.svg'; 
import More from '/src/assets/icon/more.svg'; 
import Arrow from '/src/assets/icon/mypagearrow.svg'; 
import UploadPhoto from './UploadPhoto';
import Addstd from '/src/assets/icon/addstd.svg';
import Close from '/src/assets/icon/closebtn.svg';
import StdModal from './MatchingModal';
import Back from '/src/assets/icon/back.svg'
import axios from 'axios';
import tem1 from '/src/assets/icon/template/template1icon.svg';

const MypageTchr = () => {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(My);
    const [isExtended, setIsExtended] = useState(false);
    const [isSettingExtended, setIsSettingExtended] = useState(false);
    const [feedbackExtended, setIsFeedbackExtended] = useState(false);
    const [stdinfoExtended, setIsStdinfoExtended] = useState(false);
    const [isMatchingModalOpen, setIsMatchingModalOpen] = useState(false);
    const [students, setStudents] = useState([]);
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const accessToken = localStorage.getItem("key");
                const response = await axios.get('https://maeummal.com/match/students', {  // API 경로 확인
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                if (response.status === 200) {
                    setStudents(response.data.students);  // 응답 데이터 구조에 맞게 수정
                } else {
                    throw new Error('Failed to fetch students');
                }
            } catch (error) {
                console.error('Error fetching students:', error);
                setError('Failed to fetch students');
            }
        };
    
        fetchStudents();
    }, []);
    
    const toggleMatchingModal = () => {
        setIsMatchingModalOpen(!isMatchingModalOpen);
    };
    const toggleUploadModal = () => {
        setIsUploadModalOpen(!isUploadModalOpen);
    };

    const handleAddImage = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
        toggleUploadModal();
    };


    const handleToggleExtended = () => {
        setIsSettingExtended(false);
        setIsFeedbackExtended(false);
        setIsExtended(!isExtended);
        setIsStdinfoExtended(false);
        if (isSettingExtended) {
            setIsSettingExtended(false);
            setIsFeedbackExtended(false);
            setIsExtended(false);
            setIsStdinfoExtended(false);
        }
    };

    const handleExtended = () => {
        setIsExtended(false);
        setIsFeedbackExtended(false);
        setIsSettingExtended(!isSettingExtended);
        setIsStdinfoExtended(false);
        if (isExtended) {
            setIsExtended(false);
            setIsFeedbackExtended(false);
            setIsStdinfoExtended(false);
        }
    };

    const handleStdinfo = () => {
        setIsSettingExtended(false);
        setIsExtended(false);
        setIsStdinfoExtended(!stdinfoExtended);
        setIsFeedbackExtended(false);
        if (stdinfoExtended) {
            setIsSettingExtended(false);
            setIsFeedbackExtended(false);
            setIsExtended(false);
        }
    };

    const handleFeedback = () => {
        setIsSettingExtended(false);
        setIsExtended(false);
        setIsFeedbackExtended(!feedbackExtended);
        setIsStdinfoExtended(false);
        if (feedbackExtended) {
            setIsSettingExtended(false);
            setIsExtended(false);
            setIsStdinfoExtended(false);
        }
    };

    const closeAll = () => {
        setIsExtended(false);
        setIsSettingExtended(false);
        setIsFeedbackExtended(false);
        setIsStdinfoExtended(false);
    };


    return (
        <M.MypageWrapper>
            <M.Section>
                <M.ContentContainer $isExtended={isExtended || isSettingExtended || stdinfoExtended || feedbackExtended}>
                    <M.Content>
                        <M.InLine>
                            <M.Profile src={profileImage} />
                            <M.Upload src={Upload} alt="Upload Photo" onClick={toggleUploadModal} />
                        </M.InLine>
                        <M.InfoBox>
                            <M.InfoItem>
                                <M.InfoGroup>
                                    <M.InfoTitle>
                                        <M.Label>이름</M.Label>
                                        <M.Label>이메일</M.Label>
                                        <M.Label>휴대폰 번호</M.Label>
                                    </M.InfoTitle>
                                    <M.InfoContent>
                                        <M.Value>부앙단</M.Value>
                                        <M.Value>example@email.com</M.Value>
                                        <M.Value>01012345678</M.Value>
                                    </M.InfoContent>
                                    <M.SettingsIcon src={Settings} onClick={handleExtended}/>
                                </M.InfoGroup>
                            </M.InfoItem>
                            <M.InfoItem>
                                <M.InfoGroup>
                                    <M.InfoTitle>
                                        비밀번호
                                        <M.SubText>비밀번호를 변경하려면 인증이 필요합니다.</M.SubText>
                                    </M.InfoTitle>
                                    <M.SettingsIcon src={Settings} />
                                </M.InfoGroup>
                            </M.InfoItem>
                            <M.InfoItem style={{ maxHeight: '50px' }}>
                                <M.Label>매칭된 학생 목록</M.Label>
                                <M.MoreIcon src={More} onClick={handleToggleExtended} />
                            </M.InfoItem>
                        </M.InfoBox>
                    </M.Content>
                    {isSettingExtended && 
                    <M.Second>
                        <M.SecondLabel>개인정보 변경</M.SecondLabel>
                        <M.Item>
                            <M.InfoGroup style={{padding: '7%', border: '1px solid #eee', borderRadius: '5px', marginTop: '10%'}}>
                                <M.InfoTitle style={{padding: '10px'}}>
                                    <M.Label>이름</M.Label>
                                    <M.Label>이메일</M.Label>
                                    <M.Label>휴대폰 번호</M.Label>
                                    <M.Label>성별</M.Label>
                                    <M.Label>생년월일</M.Label>
                                    <M.Label>소속기관</M.Label>
                                </M.InfoTitle>
                                <M.InfoContent style={{padding: '10px'}}>
                                    <M.Value>부앙단</M.Value>
                                    <M.Value>example@email.com</M.Value>
                                    <M.Value>010-1234-5678</M.Value>
                                    <M.Value>여성</M.Value>
                                    <M.Value>1997-08-12</M.Value>
                                    <M.Value>덕성여자대학교</M.Value>
                                </M.InfoContent>
                            </M.InfoGroup>
                        </M.Item>
                    </M.Second>}
                    {isExtended && 
                    <M.Second>
                        <M.InLineTitle>
                            <M.Start>
                                <M.MatchingLabel>매칭 학생 목록</M.MatchingLabel>
                                <img src={Addstd} onClick={toggleMatchingModal} alt="Add Student" />
                            </M.Start>
                            <M.Start>
                                <img src={Close} onClick={closeAll} />
                            </M.Start>
                        </M.InLineTitle>
                        <M.Item>
                            <M.StdLine>
                                <M.StuProfile src={My} />
                                <M.InfoTitle>김망곰</M.InfoTitle>
                                <M.Blank><img src={Arrow} onClick={handleStdinfo}/></M.Blank>
                            </M.StdLine>
                            <hr />
                            <M.StdLine>
                                <M.StuProfile src={My} />
                                <M.InfoTitle>김망곰</M.InfoTitle>
                                <M.Blank><img src={Arrow} onClick={handleStdinfo} /></M.Blank>
                            </M.StdLine>
                            <hr />
                            <M.StdLine>
                                <M.StuProfile src={My} />
                                <M.InfoTitle>김망곰</M.InfoTitle>
                                <M.Blank><img src={Arrow} onClick={handleStdinfo} /></M.Blank>
                            </M.StdLine>
                            <hr />
                            <M.StdLine>
                                <M.StuProfile src={My} />
                                <M.InfoTitle>김망곰</M.InfoTitle>
                                <M.Blank><img src={Arrow} onClick={handleStdinfo} /></M.Blank>
                            </M.StdLine>
                            <hr />
                            <M.StdLine>
                                <M.StuProfile src={My} />
                                <M.InfoTitle>김망곰</M.InfoTitle>
                                <M.Blank><img src={Arrow} onClick={handleStdinfo} /></M.Blank>
                            </M.StdLine>
                            <hr />
                            <M.StdLine>
                                <M.StuProfile src={My} />
                                <M.InfoTitle>김망곰</M.InfoTitle>
                                <M.Blank><img src={Arrow} onClick={handleStdinfo} /></M.Blank>
                            </M.StdLine>
                        </M.Item>
                    </M.Second>}
                    {stdinfoExtended && 
                        <M.Second style={{paddingTop: '1.7%'}}>
                        <M.DetailTitle>
                            <img src={Back} onClick={handleToggleExtended} alt="Back to main" />
                            <M.DetailLabel><M.StuProfile src={My} /><M.InfoTitle>김망곰 학생</M.InfoTitle></M.DetailLabel>
                            <img src={Close} onClick={closeAll} />
                        </M.DetailTitle>
                        <M.Item>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '60%', marginBottom: '2.5%'}}>
                                <p style={{whiteSpace: 'nowrap', marginLeft: '-110px', fontSize: '1.2rem'}}>학생 정보</p><div style={{width: '100px'}}></div>
                        </div>
                        <div style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between', width: '100%', gap: '2%'}}>
                            <M.InfoFeed style={{ whiteSpace: 'nowrap'}}>지능지수: 50~70(경도)</M.InfoFeed>
                            <M.InfoFeed style={{whiteSpace: 'nowrap'}}>010-1234-5678</M.InfoFeed>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '60%', marginBottom: '2.5%'}}>
                                <p style={{whiteSpace: 'nowrap', marginLeft: '-100px', fontSize: '1.2rem'}}>피드백 목록</p><div style={{width: '100px'}}></div>
                        </div>
                        <button onClick={handleFeedback}>피드백</button>
                        </M.Item>
                        </M.Second>}
                        {feedbackExtended && 
                        <M.Second style={{paddingTop: '1.7%'}}>
                        <M.DetailTitle>
                            <img src={Back} onClick={handleToggleExtended} alt="Back to main" />
                            <M.DetailLabel><M.StuProfile src={My} /><M.InfoTitle>김망곰 학생</M.InfoTitle></M.DetailLabel>
                            <img src={Close} onClick={closeAll} />
                        </M.DetailTitle>
                        <M.Item>
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '60%', marginBottom: '2.5%'}}>
                                <p style={{whiteSpace: 'nowrap', marginRight: '100px', fontSize: '1.2rem'}}>피드백 목록</p><div style={{width: '100px'}}></div>
                            </div>
                        <M.InfoFeed>
                            <M.FeedTitle><M.Start style={{alignItems: 'center', marginBottom: '2%', gap: '15%'}}><img style={{maxWidth: '20px'}} src={tem1}></img><p style={{whiteSpace: 'nowrap', fontSize: '1.1rem'}}>강의 제목</p></M.Start><p style={{marginBottom: '2%'}}>2024.07.29</p> </M.FeedTitle>
                            <M.InfoGroup style={{fontFamily: 'sans-serif'}}>랜덤 이미지의 순서를 배열하는 데 큰 어려움이 없어 보임. 그러나 설명을 바탕으로 이미지를 배열하는 데는 약한 모습을 보임. 문장을 연습하는 학습이 필요함. </M.InfoGroup>
                        </M.InfoFeed>
                        <M.InfoFeed>
                            <M.FeedTitle><M.Start style={{alignItems: 'center', marginBottom: '2%', gap: '15%'}}><img style={{maxWidth: '20px'}} src={tem1}></img><p style={{whiteSpace: 'nowrap', fontSize: '1.1rem'}}>강의 제목</p></M.Start><p style={{marginBottom: '2%'}}>2024.07.29</p> </M.FeedTitle>
                            <M.InfoGroup style={{fontFamily: 'sans-serif'}}>랜덤 이미지의 순서를 배열하는 데 큰 어려움이 없어 보임. 그러나 설명을 바탕으로 이미지를 배열하는 데는 약한 모습을 보임. 문장을 연습하는 학습이 필요함. </M.InfoGroup>
                        </M.InfoFeed>
                        <M.InfoFeed>
                            <M.FeedTitle><M.Start style={{alignItems: 'center', marginBottom: '2%', gap: '15%'}}><img style={{maxWidth: '20px'}} src={tem1}></img><p style={{whiteSpace: 'nowrap', fontSize: '1.1rem'}}>강의 제목</p></M.Start><p style={{marginBottom: '2%'}}>2024.07.29</p> </M.FeedTitle>
                            <M.InfoGroup style={{fontFamily: 'sans-serif'}}>랜덤 이미지의 순서를 배열하는 데 큰 어려움이 없어 보임. 그러나 설명을 바탕으로 이미지를 배열하는 데는 약한 모습을 보임. 문장을 연습하는 학습이 필요함. </M.InfoGroup>
                        </M.InfoFeed>
                        <M.InfoFeed>
                            <M.FeedTitle><M.Start style={{alignItems: 'center', marginBottom: '2%', gap: '15%'}}><img style={{maxWidth: '20px'}} src={tem1}></img><p style={{whiteSpace: 'nowrap', fontSize: '1.1rem'}}>강의 제목</p></M.Start><p style={{marginBottom: '2%'}}>2024.07.29</p> </M.FeedTitle>
                            <M.InfoGroup style={{fontFamily: 'sans-serif'}}>랜덤 이미지의 순서를 배열하는 데 큰 어려움이 없어 보임. 그러나 설명을 바탕으로 이미지를 배열하는 데는 약한 모습을 보임. 문장을 연습하는 학습이 필요함. </M.InfoGroup>
                        </M.InfoFeed>
                        <M.InfoFeed>
                            <M.FeedTitle><M.Start style={{alignItems: 'center', marginBottom: '2%', gap: '15%'}}><img style={{maxWidth: '20px'}} src={tem1}></img><p style={{whiteSpace: 'nowrap', fontSize: '1.1rem'}}>강의 제목</p></M.Start><p style={{marginBottom: '2%'}}>2024.07.29</p> </M.FeedTitle>
                            <M.InfoGroup style={{fontFamily: 'sans-serif'}}>랜덤 이미지의 순서를 배열하는 데 큰 어려움이 없어 보임. 그러나 설명을 바탕으로 이미지를 배열하는 데는 약한 모습을 보임. 문장을 연습하는 학습이 필요함. </M.InfoGroup>
                        </M.InfoFeed>
                        </M.Item>
                        </M.Second>}
                </M.ContentContainer>
            </M.Section>
            <UploadPhoto 
                isOpen={isUploadModalOpen}
                toggleModal={toggleUploadModal}
                handleAddImage={handleAddImage}
            />
            <StdModal
                isOpen={isMatchingModalOpen}
                toggleModal={toggleMatchingModal} 
            />
        </M.MypageWrapper>
    );
};

export default MypageTchr;