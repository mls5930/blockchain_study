## 저번 시간에는 뭘했을까?

### 로그인 코드 리뷰

- 여태 배운 지식으로 로그인 맛보기 개념으로 구현해보았습니다.

1. 데이터가 있다고 가정(객체)하고 입력값과 비교.
2. 로그인을 구현하면서 "검증"을 해보았다.
3. 사실 `검증` 이라는 단어로 말하긴 지금 너무나 간단한 코드였습니다.

제가 여러분들에게 계속 얘기해왔던 말이 있는데 다음 글이었죠?

로그인 기준으로 목표를 살펴봐요.

1. **내가 원하는 요소**에 여러 가지 이벤트 **(`click` => 로그인 버튼)**을 등록.
2. 내가 원하는 **기능(함수 => 검증)**을 동작시킬 수 있다.
=> 내가 구현하고 싶은 것이 로그인이었다면?을 가정하고 구현을 해보았습니다.

## 저번 시간의 목차는?

- 로그인 구현 코드 리뷰
- 조회수 증가 구현
- 댓글 구현하기 기본 폼 구현
- 중간 점검 시간 => 평가와 실행.feat 커피내기 => 프로그래머스 문제도 0레벨 문제 풀었었죠?

## 이번 시간에는 뭘할까?

댓글 CRUD

### CRUD란?

웹 페이지를 구성할 때 가장 많이 쓰이는 구조.
CRUD는 모든 웹 애플리케이션의 기본.

1. 댓글을 입력할 수 있다. (Create)
2. 댓글을 리스트로 볼 수 있다. (Read)
3. 댓글을 수정할 수 있다. (Update)
4. 댓글을 삭제할 수 있다. (Delete)

=> 참조 타입 중 객체와 배열 둘 중 무엇을 사용하냐? => 둘 다 사용한다.
[{}] => 정말 많이 사용한다. 

### 왜 게시판이 아니라 댓글을 먼저 구현해요?  

1. CRUD의 기본 구조를 학습하기에 적합합니다.  
   댓글 구현은 실시간으로 데이터를 처리하고 화면에 반영하는 과정에서 **CRUD의 핵심 로직(생성, 읽기, 수정, 삭제)**을 간단하고 직관적으로 이해할 수 있게 도와줍니다.  

   - 댓글 CRUD의 간단한 구현 흐름:  
     1. 댓글 리스트를 화면에 표시 (Read)  
     2. 새로운 댓글 작성 (Create)  
     3. 댓글 수정 (Update)  
     4. 댓글 삭제 (Delete)  

2. 이를 기반으로 로컬 스토리지를 활용한 게시판 구현으로 확장합니다.  
   댓글 구현에서 배운 CRUD 구조를 활용해 로컬 스토리지를 데이터베이스처럼 사용하는 **게시판**을 설계할 수 있습니다.  

3. 로컬 스토리지는 무엇인가요?  
   로컬 스토리지는 브라우저에 데이터를 저장하는 공간

4. 브라우저의 동작 방식을 학습합니다.  
   브라우저는 **매 페이지 요청마다 HTML, CSS, JavaScript 코드**를 읽고 해석하여 화면을 그립니다.  
   - 이번 댓글 구현은 페이지 이동 없이 실시간으로 데이터를 추가, 수정, 삭제해 브라우저가 화면을 그리는 방식을 직관적으로 이해하도록 돕습니다.  

## 이번 시간의 목표

내가 어떠한 글을 수정하고 삭제할지 필요한 `index` 를 정확하게 파악하여 필요한 곳에 전달할 수 있다.
댓글을 수정하거나 삭제할 때, 어떤 댓글이 선택되었는지를 식별하는 것이 중요합니다.  
이때 배열의 `index`를 활용하면 정확한 데이터를 처리할 수 있습니다.
=> 배열 `index` 중요하다고 정말 많이도 말씀드렸습니다
=> 근데, `index`가 왜 필요한지 아직 실습을 하여 훈련을 하지 않았기 때문에 오늘 해볼 것.

## 이번 시간의 목차

- 댓글 구현(CRUD)
  1. 댓글 리스트를 화면에 표시 (Read) => 저랑 같이
  2. 새로운 댓글 작성 (Create) => 저랑 같이
  3. 댓글 수정 (Update) => 실습 과제(두 번째로 쉬운 처리입니다.)
  4. 댓글 삭제 (Delete) => 실습 과제(첫 번째로 쉬운 처리입니다.)

