import { Pagination } from '@mui/material'
import server from './../../config/server.json'
import { useCookies } from "react-cookie";
import { useEffect } from 'react';
import axios from 'axios'
import { textAlign } from '@mui/system';
import { useState } from 'react';
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import { blue } from '@mui/material/colors';

const List = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const navigate = useNavigate();
    const [noteData, setNoteData] = useState([])
    const [page, setPage] = useState(1);
    const [checkedInputs, setCheckedInputs] = useState([]);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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

    //노트 데이터 삭제(휴지통으로 이동)
    let deleteNoteBtn = async () => {
        console.log(checkedInputs);
        return await axios.post(server.url + '/record/delete', checkedInputs);
    }

    return (
        <div className="list">
            <h3>전체 노트</h3>
            <IconButton aria-label="delete" size="large" onClick={() => {
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
            {/* <button onClick={() => {
                            deleteNoteBtn().then(res => {
                                console.log(res);
                                if(res.data.status) {
                                    alert(res.data.message);
                                    window.location.reload();
                                }
                            }).catch(err => {
                                console.log(err)
                            })
                        }}>삭제</button> */}
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
                                <col width="70%" />
                                <col width="20%" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>이름</th>
                                    <th>작성 일자</th>
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
                                            </td>
                                            {/* <td><input type="checkbox" checked={checkedInputs.includes(data._id) ? true : false}
                                                onChange={(e) => {
                                                    changeHandler(e.target.checked, data._id)
                                                }} /></td>
                                            <td onClick={() => gotoDetail(data)}>{data.title}</td> */}
                                            <td>{moment(data.updatedAt).format('YYYY-MM-DD')}</td>
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