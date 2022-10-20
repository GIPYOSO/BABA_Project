import { Box, Grid, Button, IconButton, TextField, Typography, Link } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useNavigate } from 'react-router-dom';
import React, { useState, useCallback, useEffect } from "react";
import moment from "moment";
import MicIcon from '@mui/icons-material/Mic';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const FileUpload = () => {
    const navigate = useNavigate();
    const [stream, setStream] = useState();
    const [media, setMedia] = useState();
    const [onRec, setOnRec] = useState(true);
    const [source, setSource] = useState();
    const [analyser, setAnalyser] = useState();
    const [audioUrl, setAudioUrl] = useState();
    const [btnFlg, setBtnFlg] = useState(0); //0: 녹음+파일업로드 버튼, 1: 녹음 버튼, 2: 녹음 제출 버튼

    //------------- 녹음 -----------------

    //녹음기 켜기
    const onRecAudio = () => {
        console.log("녹음 시작");
        setBtnFlg(1); //녹음 시작 flag
        // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
        const analyser = audioCtx.createScriptProcessor(0, 1, 1);
        setAnalyser(analyser);

        function makeSound(stream) {
            // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
            const source = audioCtx.createMediaStreamSource(stream);
            //console.log("오디오 스트림 정보", source);
            setSource(source);
            source.connect(analyser);
            analyser.connect(audioCtx.destination);
        }
        // 마이크 사용 권한 획득
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            setStream(stream);
            setMedia(mediaRecorder);
            makeSound(stream);

            analyser.onaudioprocess = function (e) {
                // 1시간(3600초) 지나면 자동으로 음성 저장 및 녹음 중지
                if (e.playbackTime > 3600) {
                    stream.getAudioTracks().forEach(function (track) {
                        track.stop();
                    });
                    mediaRecorder.stop();
                    // 메서드가 호출 된 노드 연결 해제
                    analyser.disconnect();
                    audioCtx.createMediaStreamSource(stream).disconnect();

                    mediaRecorder.ondataavailable = function (e) {
                        setAudioUrl(e.data);
                        setOnRec(true);
                    };
                } else {
                    setOnRec(false);
                }
            };
        });
    };

    // 사용자가 음성 녹음을 중지했을 때
    const offRecAudio = () => {
        console.log("녹음 중지");
        setBtnFlg(2) //녹음 종료 flag
        return new Promise(() => {
            // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
            media.ondataavailable = function (e) {
                setAudioUrl(e.data);
                setOnRec(true);
            };

            // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
            stream.getAudioTracks().forEach(function (track) {
                track.stop();
            });

            // 미디어 캡처 중지
            media.stop();
            // 메서드가 호출 된 노드 연결 해제
            analyser.disconnect();
            source.disconnect();
        })
    };

    //녹음 파일 만들어 보내기
    const onSubmitAudioFile = useCallback(() => {
        console.log("파일 전송");
        if (audioUrl) {
            console.log(URL.createObjectURL(audioUrl)); // 출력된 링크에서 녹음된 오디오 확인 가능
        }
        // File 생성자를 사용해 파일로 변환
        const nowDate = new Date();
        const sound = new File([audioUrl], `${moment(nowDate).format("YYYY-MM-DD HH:mm:ss")}_회의록`, { lastModified: new Date().getTime(), type: "audio" });
        console.log(sound); // File 정보 출력
        navigate('/record/create', { state: sound });
    }, [audioUrl]);


    //------------- 파일 업로드 ------------
    const handleChangeFile = (e) => {
        navigate('/record/create', { state: e.target.files[0] });
    }

    const PtagStyle = {
        textAlign: 'center',
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '20px'
    }

    return (
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '60%',
            width: '60%',
            transform: 'translate(-50%, -50%)'
        }}>
            <p style={PtagStyle}>실시간 녹음을 하거나 내 PC에서 음성 파일을 첨부하세요. </p>
            <p style={PtagStyle}>녹음은 최대 1시간까지 가능합니다.<br />최대 250MB의 mp4, m4a, mp3, amr, flac, wav 확장자를 지원합니다.</p>
            <div style={{ textAlign: 'center' }}>
                {(function () {
                    if (btnFlg === 1) {
                        return(
                            <>
                                <IconButton variant="contained" aria-label="record mic" component="label" size="large" style={{ background: "#ffa8a8" }}
                                    onClick={() => {
                                        onRec ? onRecAudio() : offRecAudio()
                                    }}>
                                    <MicIcon fontSize="inherit" />
                                </IconButton>
                            </>
                        )
                    } else if (btnFlg === 2) {
                        return(
                            <>
                                <IconButton variant="contained" aria-label="upload record file" component="label" size="large" style={{ background: "#ddd" }}
                                    onClick={() => {onSubmitAudioFile()}}>
                                    <UploadFileIcon fontSize="inherit" />
                                </IconButton>
                            </>
                        )
                    } else {
                        return(
                            <>
                                <IconButton variant="contained" aria-label="record mic" component="label" size="large" style={{ background: '#ddd', marginRight: "10px" }}
                                    onClick={() => {
                                        onRec ? onRecAudio() : offRecAudio()
                                    }}>
                                    <MicIcon fontSize="inherit" />
                                </IconButton>
                                <IconButton variant="contained" aria-label="upload file" component="label" size="large" style={{ background: '#ddd' }}>
                                    <input type="file" id="file" hidden onChange={handleChangeFile} />
                                    <FileUploadIcon fontSize="inherit" />
                                </IconButton>
                            </>
                        )
                    }
                })()}
            </div>
        </Box>
    );
};

export default FileUpload;