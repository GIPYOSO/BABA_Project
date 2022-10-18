import { Pagination } from '@mui/material'
import server from './../../config/server.json'
import { useCookies } from "react-cookie";
import { useEffect } from 'react';
import axios from 'axios'
import { textAlign } from '@mui/system';
import { useState } from 'react';
import moment from 'moment'
import { useNavigate } from 'react-router-dom';

const List = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const navigate = useNavigate();
    const [noteData, setNoteData] = useState([])
    const [page, setPage] = useState(1);

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
    
    return (
        <div className="list">
            <h3>전체 노트</h3>
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
                        <td style={{textAlign: 'center'}}>데이터가 없습니다.</td>
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
                                <tr key={i} onClick={() => gotoDetail(data)}>
                                    <td><input type="checkbox" /></td>
                                    <td>{data.title}</td>
                                    <td>{moment(data.updatedAt).format('YYYY-MM-DD')}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                
                <div className="pagingWrap">
                    <Pagination count={noteData.totalPage} page={page} onChange={onChangePagenation}/>
                </div>
            </>
            )}
        </div>
    );
};

export default List;