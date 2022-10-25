# BADA : AI 음성 회의록
> 오픈 STT API를 이용한 AI 회의록 서비스
> BADA란? 내 회의를 '받아 적어 줘'에서 파생된 네이밍  
❓ Problem : 음성을 회의록으로 변환해주는 웹사이트는 많은데 다른 부가 기능을 제공해주는 사이트는 없을까?  
‼️ Idea : 사용자에게 맞춘 템플릿을 함께 제공하면 어떨까?  
💯 Solution : AI 회의록 + 메모와 할일 기능을 제공하는 웹사이트를 만들자

## 시연 영상
![bada_시연영상](https://user-images.githubusercontent.com/62530884/197729514-54ef1a45-db77-4069-b5d9-8eef186943a7.gif)

## 주요 기능과 로직

* 회의록 변환 : 새 탬플릿 추가 -> 파일 업로드 버튼을 눌러 업로드 하면 음성을 텍스트로 변환해줌(VITO speech API 사용)
* 실시간 녹음 : 새 탬플릿 추가 -> 녹음기 버튼을 누르면 실시간 녹음하여 회의록으로 변환해줌
* 회의록 노트 저장 : 회의록 노트 생성, 수정, 삭제
* 회의록 PDF 다운로드 : 노트 상세 페이지에서 PDF 다운로드 버튼을 눌러 내려받기
* 메모 기능 : 회의록 노트 1개당 1개의 메모 생성, 수정
* 할일 기능 : 계정 1개당 1개의 할일 생성, 수정
* 즐겨찾기 기능 : 원하는 노트를 즐겨찾기에 등록, 삭제
* 공유 기능 : 원하는 노트의 공유 링크를 생성
* 휴지통 기능 : 원하는 노트를 휴지통에 등록, 삭제. 휴지통에 있는 노트는 1달간 보관.
* 페이징 기능 : 노트 리스트를 백에서 프론트로 10개씩 보내줌
* 회원가입, 로그인, 회원탈퇴
* DB : 새로 생성된 데이터(user, note, todo) 저장

## 기술 스택

<div>
<li>Front
<img  src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
</li>

<li>Back
<img  src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
<img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
<img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
</li>

<li>IDE
<img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=for-the-badge&logo=Visual Studio Code&logoColor=white">
</li>

<li>UI
<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white">
</li>

<li>Collaboration
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white">
<img src="https://img.shields.io/badge/Notion-181717?style=for-the-badge&logo=Notion&logoColor=white">
</li>
</div>  

## 개발 기간
2022.09.16 ~ 2022.10.21

## 기획 & 설계
* [기술 명세서](https://nutritious-albacore-e40.notion.site/dcb026f6c8e84666b25c0266653f1ec5)  
* [DB 명세서](https://nutritious-albacore-e40.notion.site/DB-3344dbed52df49789dd2fd9389d73ed7)