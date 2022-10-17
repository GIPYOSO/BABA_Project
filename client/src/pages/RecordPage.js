import * as React from "react";
import Aside from "../components/Common/Aside/aside";
import Modal from "../components/Common/modal/Modal";
import MeMi from "../components/Common/MeetingMinutes/MeetingMinutes";


let RecordPage = () => {
  return (
    <>
      <Modal />
      <Aside />
      <MeMi />
    </>
  );
};
export default RecordPage;
