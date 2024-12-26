## API?

Application Progrmmaing Interface

=> 현실세계에서 레스토랑
=> 음식을 주문함(요청) 
=> 종업원(서버)는 주방으로 요청을 가지고 감.
=> 주방에선 음식을 요리하고 종업원 줌.
=> 종업원은 손님에게 음식을 내줌(응답).

이 과정에서 대화 규칙을 제공하는게 바로 API라고 합니다.

## Rest?

Representational State Transfer

효율적으로 데이터를 주고받는 방법

## RESTful API는

규칙을 제공하는데, 효율적으로 데이터를 주고받자 => REST원칙을 따르는 API
=> 자원
=> REST의 특징은 모든 자원을 URL로 표현
http://localhost:3000/list => 게시판 목록에 대한 자원(list) => 게시판 목록
GET /list
POST /list

**자원을 URL로 표현하고, HTTP 메서드로 동작을 정의**하는 방식

- 특별한 기술이다? X
- 특정 기능이다 X
- 데이터를 효율적으로 주고받는데에 있어서의 규칙이다.  

GET /boardList => 아 게시판 목록을 정의하는 규칙의 기능을 담았구나.
POST / boardModify/:id => 게시판의 수정을 정의하는 규칙의 기능을 담았구나.

게시판을 예로 들면서 설계를 함

게시판 CRUD => Create, Read, Update, Delete

GET /list
GET /view
GET /modify
PUT /modify
DELETE /delete

=> 위의 설계를 보면 쉽게 예측이 가능함.