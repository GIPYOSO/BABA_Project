import { Button, Pagination, TextField } from '@mui/material'
import server from './../../config/server.json'
import { useCookies } from "react-cookie";
import { useEffect } from 'react';
import axios from 'axios'
import { textAlign } from '@mui/system';
import { useState, useRef } from 'react';
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import { blue } from '@mui/material/colors';
import ReplyIcon from '@mui/icons-material/Reply';
import zIndex from '@mui/material/styles/zIndex';
import styled from 'styled-components';
import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';

const DivStyle1 = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`

const List = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const navigate = useNavigate();
    const [noteData, setNoteData] = useState([])
    const [page, setPage] = useState(1);
    const [checkedInputs, setCheckedInputs] = useState([]);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [open, setOpen] = useState(
        {
            id: "",
            status: false
        }
    );
    const ref = useRef(null);

    const copyLinkRef = useRef();

    // tooltip close
    const handleTooltipClose = (e) => {
        if (open.status && !ref.current.contains(e.target)) {
            setOpen({
                ...open,
                status: false
            });
        }
    };

    // tooltip open
    const handleTooltipOpen = (id) => {
        setOpen({
            id,
            status: true
        });
    };

    let textCopy = () => {
        // 선택 후 복사
        copyLinkRef.current.focus();
        copyLinkRef.current.select();
        document.execCommand('copy');

        // 복사 완료 알림
        alert("복사되었습니다.");
    }

    // id값에 따라 tooltip open
    let Tooltip = ({ id }) => {
        if (open.id === id && open.status === true) {
            return (
                <div ref={ref} style={{
                    position: 'absolute',
                    right: '8%',
                    padding: '30px',
                    width: '400px',
                    height: '100px',
                    background: '#fff',
                    border: '1px solid #ddd',
                    zIndex: '100'
                }}>
                    <p><span style={{
                        display: 'inline-block',
                        marginBottom: '20px',
                        paddingBottom: '10px',
                        borderBottom: '3px solid #000',
                        fontWeight: 'bold',
                    }}>노트 공유</span></p>
                    <div>
                        <div style={{
                            display: 'inline-block',
                            marginRight: '15px',
                            padding: '8px 0'
                        }}>링크</div>
                        <div style={{
                            width: '280px',
                            display: 'inline-block'
                        }}>
                            <TextField inputRef={copyLinkRef} type="text" defaultValue={`http://localhost:8080/record/${id}`} variant="outlined" size="small" fullWidth xs={{ display: 'inline-block' }} style={{ verticalAlign: 'middle' }} />
                        </div>
                        <button style={{
                            display: 'inline-block',
                            marginLeft: '18px',
                            width: '50px',
                            height: '40px',
                            border: '1px solid #ddd',
                            color: '#505050',
                            background: '#f1f1f1',
                            cursor: 'pointer'
                        }}
                            onClick={textCopy}
                        >복사</button>
                    </div>
                </div>
            )
        } else {
            return (<></>)
        }
    }

    useEffect(() => {
        //노트 데이터를 요청하는 함수
        let getNoteData = async () => {
            return await axios.get(`${server.url}/record/${cookies.token.user_id}`)
                .then(res => {
                    let response = res.data
                    setNoteData(response)
                }).catch(e => {
                    console.log(e)
                })
        }
        getNoteData()
    }, [])

    // 툴팁 배경화면 클릭시 display: none
    useEffect(() => {
        if (open.status) document.addEventListener('mousedown', handleTooltipClose)
        return () => {
            document.removeEventListener('mousedown', handleTooltipClose)
        }
    })

    //체크박스 이벤트 핸들러
    const changeHandler = (checked, id) => {
        if (checked) { // 체크 선택
            setCheckedInputs([...checkedInputs, id]);
        } else {
            // 체크 해제
            setCheckedInputs(checkedInputs.filter((el) => el !== id));
        }
        //console.log("선택 데이터:" , checkedInputs);
    };

    const gotoDetail = (data) => {
        navigate('/record/detail', { state: data });
    }


    let getShareData = async (id) => {
        console.log(id);
        return await axios.get(`${server.url}/record/share/${id}`)
            .then(res => {
                let response = res.data
                console.log(res)
                // setNoteData(response)
            }).catch(e => {
                console.log(e)
            })
    }


    const shareDetail = (id) => {
        //공유할 떄 노트의 url을 가져오는 함수 
        console.log("쉐어 입니다", id);
        getShareData(id);

    }

    const onChangePagenation = (event, value) => {
        console.log(value)
        //페이지에 따라 노트 데이터를 요청하는 함수
        // let getNoteData = async () => {
        //     return await axios.get(`${server.url}/record/${cookies.token.user_id}?page=${value}&perPage=10`)
        //     .then(res => {
        //         let response = res.data
        //         console.log(response)
        //         setNoteData(response)
        //     }).catch(e => {
        //         console.log(e)
        //     })
        // }
        // getNoteData()
    }

    let favoriteNoteBtn = async () => {
        console.log(checkedInputs);
        return await axios.post(server.url + '/record/favorite', checkedInputs)
    }

    //노트 데이터 삭제(휴지통으로 이동)
    let deleteNoteBtn = async () => {
        console.log(checkedInputs);
        return await axios.post(server.url + '/record/delete', checkedInputs);
    }

    return (
        <div className="list">
            <h3>전체 노트</h3>
            <DivStyle1>
            <IconButton variant="contained" aria-label="favorite" component="label" size="large"
                    onClick={() => {
                        if (checkedInputs.length === 0) {
                            alert("즐겨찾기에 추가할 노트를 선택하세요.");
                            return;
                        }
                        favoriteNoteBtn().then(res => {
                            console.log(res);
                            if (res.data.status) {
                                alert(res.data.message);
                                window.location.reload();
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                    }}>
                    <BookmarkAddRoundedIcon fontSize="inherit" />
                </IconButton>
                <IconButton style={{ marginRight: "20px" }} aria-label="delete" size="large" onClick={() => {
                    if (checkedInputs.length === 0) {
                        alert("삭제할 노트를 선택하세요.");
                        return;
                    }
                    deleteNoteBtn().then(res => {
                        console.log(res);
                        if (res.data.status) {
                            alert(res.data.message);
                            window.location.reload();
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                }}>
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            </DivStyle1>
            {noteData.length === 0 ?
                (<table>
                    <colgroup>
                        <col width="100%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ textAlign: 'center' }}>데이터가 없습니다.</td>
                        </tr>
                    </tbody>
                </table>) : (
                    <>
                        <table>
                            <colgroup>
                                <col width="10%" />
                                <col width="65%" />
                                <col width="15%" />
                                <col width="10%" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>이름</th>
                                    <th>작성 일자</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    noteData.note.map((data, i) => (
                                        <tr key={i}>
                                            <td>
                                                <Checkbox {...label} size="small" sx={{
                                                    // color: pink[800],
                                                    '&.Mui-checked': {
                                                        color: blue[900],
                                                    },
                                                }} checked={checkedInputs.includes(data._id) ? true : false}
                                                    onChange={(e) => {
                                                        changeHandler(e.target.checked, data._id)
                                                    }} />
                                                {/* <button onClick={() => shareDetail(data)}>공유</button> */}

                                            </td>
                                            {/* <td><input type="checkbox" checked={checkedInputs.includes(data._id) ? true : false}
                                                onChange={(e) => {
                                                    changeHandler(e.target.checked, data._id)
                                                }} /></td>*/}
                                            <td onClick={() => gotoDetail(data)}>{data.title}</td>
                                            <td>{moment(data.updatedAt).format('YYYY-MM-DD')}</td>
                                            <td>
                                                <IconButton onClick={() => {
                                                    handleTooltipOpen(data._id)
                                                }} size="large" style={{ background: '#ddd' }}>
                                                    <ReplyIcon sx={{ transform: 'scaleX(-1)' }} fontSize="inherit" />
                                                </IconButton>
                                                {<Tooltip id={data._id} />}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <div className="pagingWrap">
                            <Pagination count={noteData.totalPage} page={page} onChange={onChangePagenation} />
                        </div>
                    </>
                )}
        </div>
    );
};

export default List;