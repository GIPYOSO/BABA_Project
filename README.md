# BADA AI 음성 회의록
> 오픈 STT API를 이용한 AI 회의록 서비스

❓ Problem : 음성을 회의록으로 변환해주는 웹사이트는 많은데 다른 부가 기능을 제공해주는 사이트는 없을까?  
‼️ Idea : 사용자에게 맞춘 템플릿을 함께 제공하면 어떨까?  
💯 Solution : AI 회의록 + 메모와 할일 기능을 제공하는 웹사이트를 만들자

![](/client/src/assets/images/recordPage.png)

## 주요 기능과 로직

* 회의록 변환 : 새 탬플릿 추가 -> 파일 업로드 버튼을 눌러 업로드 하면 음성을 텍스트로 변환해줌(VITO speech API 사용)
* 실시간 녹음 : 새 탬플릿 추가 -> 녹음기 버튼을 누르면 실시간 녹음하여 회의록으로 변환해줌
* 회의록 노트 저장 : 회의록 노트 생성, 수정, 삭제
* 메모 기능 : 회의록 노트 1개당 1개의 메모 생성, 수정, 삭제
* 할일 기능 : 계정 1개당 1개의 할일 생성, 수정, 삭제
* 즐겨찾기 기능 : 원하는 노트를 즐겨찾기에 등록, 삭제
* 공유 기능 : 원하는 노트의 공유 링크를 생성
* 휴지통 기능 : 원하는 노트를 휴지통에 등록, 삭제. 휴지통에 있는 노트는 1달간 보관.
* 페이징 기능 : 노트 리스트를 백에서 프론트로 10개씩 보내줌
* 회원가입, 로그인, 회원탈퇴
* DB : 새로 생성된 데이터(user, note, todo) 저장

## 기술 스택 : 

* Front
Javascript, React
* Back
Javascript, node js, Express, mongoDB
* IDE
Visual Studio Code
* Ui
Figma
* AI Model
Vito
* Collaboration tools
Github, Notion

## 개발 기간
2022.09.16 ~ 2022.10.21

## 기획 & 설계
[기술 명세서](https://www.notion.so/dcb026f6c8e84666b25c0266653f1ec5)
[DB 명세서](https://nutritious-albacore-e40.notion.site/DB-3344dbed52df49789dd2fd9389d73ed7)