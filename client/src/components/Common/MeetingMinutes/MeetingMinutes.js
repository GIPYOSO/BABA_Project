import * as React from "react";
import List from './../../Record/List';
import Detail from './../../Record/Detail';
import TabMenu from "../TabMenu/TabMenu";

function MeMi(){
    return(
        <section className="MMSection">
            <h2>회의록</h2>
            <div className="navBox">
                navVar가 올 장소
            </div>
            <div className="titleBox">
                <title>title1</title>
            </div>
            <div className="MMBox">
                <List />
<<<<<<< Updated upstream
                <Detail />
=======
                {/* <Detail /> */}
                <TabMenu />
>>>>>>> Stashed changes
            </div>
            {/* <div className="noteBox">
                <p>메모</p>
                <textarea></textarea>
            </div> */}
           
        </section>
    )
}
export default MeMi