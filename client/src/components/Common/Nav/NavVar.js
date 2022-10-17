import React from "react";

function NavVar(){
    return(
        <header>
            <nav>
                <input type={search} placeholder="검색어를 입력하세요."></input>
                <div>
                    <img src="" />
                    <button type="button" className="selectButton">▼</button>
                    <div>
                        <img src="" />
                        <a href="#">마이페이지</a>
                    </div>
                    <span>로그아웃</span>
                </div>
            </nav>
        </header>
    )
}
export default NavVar