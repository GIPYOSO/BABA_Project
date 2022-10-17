import { Pagination } from '@mui/material'
import axios from 'axios';
import { useCookies } from "react-cookie";

const List = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  
  
    axios.get("http://localhost:8080/record", {
        params : {
        user_id : cookies.token.user_id,
        }
    }
      ).then(res => {
        console.log("리스트 res", res.data);
      })
      
    // let testData = [
    //     {
    //         title: '첫번째 게시글',
    //         folder_name: '기본 노트',
    //         update_at: '2022-10-16',
    //         length: '03:33',
    //     },
    //     {
    //         title: '두번째 게시글',
    //         folder_name: '기본 노트',
    //         update_at: '2022-10-16',
    //         length: '03:33',
    //     },
    //     {
    //         title: '세번째 게시글',
    //         folder_name: '기본 노트',
    //         update_at: '2022-10-16',
    //         length: '03:33',
    //     },
    // ]
    return (
        <div className="list">
            <h3>노트 목록</h3>
            <table>
                <colgroup>
                    <col width="5%" />
                    <col width="50%" />
                    <col width="15%" />
                    <col width="15%" />
                    <col width="15%" />
                </colgroup>
                <thead>
                    <tr>
                        <th></th>
                        <th>이름</th>
                        <th>폴더</th>
                        <th>작성 일자</th>
                        <th>길이</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {
                        testData.map(data => (
                            <tr key={data.index}>
                                <th><input type="checkbox" /></th>
                                <td>{data.title}</td>
                                <td>{data.folder_name}</td>
                                <td>{data.update_at}</td>
                                <td>{data.length}</td>
                            </tr>
                        ))
                    } */}
                </tbody>
            </table>
            <div className="pagingWrap">
                <Pagination count={10} />
            </div>
        </div>
    );
};

export default List;