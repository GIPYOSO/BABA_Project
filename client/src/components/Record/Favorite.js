import { Pagination } from '@mui/material'
import server from './../../config/server.json'
import { useCookies } from "react-cookie";
import { useEffect } from 'react';
import axios from 'axios'
import { useState } from 'react';
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import { blue } from '@mui/material/colors';
import { IconButton } from '@mui/material';
//import { styled } from '@mui/material/styles';
import BookmarkRemoveRoundedIcon from '@mui/icons-material/BookmarkRemoveRounded';
import styled from 'styled-components';

const DivStyle1 = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`
const Favorite = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const navigate = useNavigate();
    const [noteData, setNoteData] = useState([])
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [checkedInputs, setCheckedInputs] = useState([]);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    useEffect(() => {
        //노트 데이터를 요청하는 함수
        let getFavoriteNoteData = async () => {
            return await axios.get(`${server.url}/record/favorite/${cookies.token.user_id}`)
                .then(res => {
                    let response = res.data
                    setNoteData(response.note)
                    setTotalPage(response.totalPage)
                }).catch(e => {
                    console.log(e)
                })
        }
        getFavoriteNoteData()
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
        // console.log(value)
        // 페이지에 따라 노트 데이터를 요청하는 함수
        let getFavoriteNoteData = async () => {
            return await axios.get(`${server.url}/record/favorite/${cookies.token.user_id}?page=${value}&perPage=10`)
            .then(res => {
                let response = res.data
                setNoteData(response.note)
                setTotalPage(response.totalPage)
            }).catch(e => {
                console.log(e)
            })
        }
        getFavoriteNoteData()
    }

    //즐겨찾기 삭제
    let unfavoriteNoteBtn = async () => {
        console.log(checkedInputs);
        return await axios.post(server.url + '/record/unfavorite', checkedInputs);
    }


    return (
        <div className="list">
            <h3>즐겨찾는 노트</h3>
            <DivStyle1>
                <IconButton style={{marginRight: "20px"}} variant="contained" aria-label="upload record file" component="label" size="large"
                    onClick={() => {
                        if (checkedInputs.length === 0) {
                            alert("즐겨찾기에서 제외할 노트를 선택하세요.");
                            return;
                        }
                        unfavoriteNoteBtn().then(res => {
                            console.log(res);
                            if (res.data.status) {
                                alert(res.data.message);
                                window.location.reload();
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                    }}>
                    <BookmarkRemoveRoundedIcon fontSize="inherit" />
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
                                    noteData.map((data, i) => (
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
                                                }} /></td> */}
                                            <td onClick={() => gotoDetail(data)}>{data.title}</td>
                                            <td>{moment(data.updatedAt).format('YYYY-MM-DD')}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className="pagingWrap">
                            <Pagination count={totalPage} page={page} onChange={onChangePagenation} />
                        </div>
                    </>
                )}
        </div>
    );
};

export default Favorite;