## 저번 시간에는 뭐했을까?

ORM in `sequelize`라는 외부 모듈

데이터베이스(database in mysql)와의 상호작용을 간편하고 직관적으로 사용해보자.

`쿼리문 작성하지 않고도 좀 더 쉽게 데이터베이스에 값을 조회, 생성, 수정, 삭제하자!`

## 이번 시간의 핵심

1. **ORM(객체 관계 매핑)의 이해**

   - 데이터베이스와 객체 지향 프로그래밍 간의 연결을 자동화하는 ORM의 역할과 이점을 이해합니다.
   - SQL을 작성하지 않고도 데이터베이스와 상호작용하는 방식을 배웁니다.

2. **Sequelize의 흐름과 구조**

   - Sequelize가 ORM으로서 데이터를 처리하는 기본 흐름을 학습합니다.
   - 모델(model), 연결 설정(config.js) 등 핵심 개념에 집중합니다.

## 이번 시간의 목차

- ORM이란?
- sequelize는 뭔데?
- Sequelize ORM 설정 가이드
- 백엔드 서버 개발 순서
- Sequelize를 사용한 CRUD 흐름만 파악!

만약, 이해가 잘 가시지 않는 것들은 오후에 질문받겠습니다.

## 이번 시간에 뭐할까?

`multer` 외부 모듈을 이용한 파일 업로드

## 이번 시간의 핵심

`Content-Type` => `multipart/form-data`
=> 파일 업로드 하겠습니다

## 오후 실습 시간 때

어제 실습 진행한거 리뷰

- config.js

dotenv 사용안함

## 이번 시간의 목차

- Content-type in multipart/form-data
- fs란? => 파일 읽고, 쓰고, 해석해서 보여주는
- fs.createWriteStream 메서드
- multer
  - multer란?
  - multer 문법
  - 왜 미들웨어인가?
  - multer.diskStorage
  - destination 함수
  - filename 함수
- 어제 실습 리뷰(전체 리뷰가 아닌 config.js dotenv적용)
