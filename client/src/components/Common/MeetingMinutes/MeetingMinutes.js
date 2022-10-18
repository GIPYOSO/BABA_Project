import * as React from "react";
import List from "./../../Record/List";
import Detail from "./../../Record/Detail";
import Create from "./../../Record/Create";
import FileUpload from "./../../Record/FileUpload";
import TabMenu from "../TabMenu/TabMenu";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function MeMi() {
  const sampleLocation = useLocation();
  let pathName = sampleLocation.pathname.replace("record/", "");
  return (
    <section className="MMSection">
      <h2>회의록</h2>
      <div className="navBox">navVar가 올 장소</div>
      <div className="titleBox">
        <title>title1</title>
      </div>
      <div className="MMBox">
        {(function () {
          if (pathName === "/fileUpload") {
            return <FileUpload />;
          } else if (pathName === "/create") {
            return <Create />;
          } else if (pathName === "/detail") {
            return <Detail />;
          }
          {
            return <List />;
          }
        })()}
      </div>
      {/* <div className="noteBox">
                <p>메모</p>
                <textarea></textarea>
            </div> */}
    </section>
  );
}
export default MeMi;
