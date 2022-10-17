import React from "react";
import Mic from "./../../../assets/images/modal-MIC.png";
import Mplus from "./../../../assets/images/modal_plus.png";
import CloseBtn from "./../../../assets/images/close_icon.png";



function Modal(){
    return(
        <div className="modalBody">
            <div className="modalBox">
                <span className="CloseSpan"><img src={CloseBtn}></img></span>
                <h2>옵션의 종류를 선택해 주세요</h2>
                <p>BADA 회의록은 사용자에게 회의록과 함께 사용할 옵션을 함께 제공합니다.</p>
                
                <div>
                    <img src={Mic}></img>
                    <img src={Mplus}></img>
                    <div>
                        <input id="modal_btn1" type="radio" name="modalBtnGroup"></input>
                        <label htmlFor="modal_btn1" >메모</label>
                        <br/>
                        <input id="modal_btn2" type="radio" name="modalBtnGroup"></input>
                        <label htmlFor="modal_btn2" >캘린더</label>
                        <br/>
                        <input id="modal_btn3" type="radio" name="modalBtnGroup"></input>
                        <label htmlFor="modal_btn3" >할 일</label>
                    </div>
                </div>
                <div>
                    <button>확인</button>
                </div>
            </div>
        </div>
    )
}
export default Modal