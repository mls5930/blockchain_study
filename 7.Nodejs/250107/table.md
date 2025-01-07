## 테이블

데이터베이스의 테이블이라함은, 뭘까요?(게시판 기준)

- board

1. 그렇다면, 속성은? 뭐가될까?
2. 필드 타입은 뭐가될까?

- id: 게시판 글 아이디 INT AUTO_INCREMENT PRIMARY KEY
- user_id: 작성한 글 유저 아이디 VARCHAR(50)
- writer: 작성한 글 유저 이름 VARCHAR(20) 
- title: 제목 VARCHAR(255)
- content: 내용 TEXT
- created_at: 생성일 DATETIME CURRENT_TIMESTAMP
- hit: 조회수 INT(20)

```sql
CREATE TABLE board (
    id INT(10) AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    writer VARCHAR(20) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    hit INT(20) DEFAULT 0
);
```

## 현재 MySQL에 접속한 사용자 확인

```sql
 SELECT USER();

+------------------------+
| USER()                 |
+------------------------+
| wnqudgus1234@localhost |
+------------------------+
1 row in set (0.00 sec)
```

## 현재 MySQL에 접속한 데이터베이스 확인

```sql
SELECT DATABASE();

+------------+
| DATABASE() |
+------------+
| NULL       |
+------------+
1 row in set (0.00 sec)
```

핵심

데이터 베이스를 잘한다 => 현재 내가 어떤 "상태"인지 명확히 파악할 줄 알아야 함.

## 기존에 있는 테이블 삭제

```sql
DROP TABLE board;
DROP TABLE store;

Empty set (0.00 sec)
```

이제, 자바스크립트(서버)에 쿼리문을 작성할건데, 비동기 통신으로
데이터베이스 연결 => SQL 명령어를 통해서 연결

`데이터 베이스안에 board테이블의 전체 자료를 가져와줘`

그 이전에, 우분투(터미널)에서 SQL명령어를 작성하여 되는지 안되는지 먼저
테스트
=> 테스트 후 함수 안에 SQL문 코드를 작성할 것임.

```js
const findAll = async() => {
    const [result] = await pool.query("SELECT * FROM board;");
    return result
}
```

- findAll();

```sql
SELECT * FROM board;
```

- findOne();

```sql
-- /board/view/2
SELECT * FROM board WHERE id=2
```

- create();

```sql
INSERT INTO board(user_id, writer, title, content) values("rhgPtjd2232", "고혜성", "데이터베이스....어렵네", "너무 어렵습니다. 아니 할게 너무 많습니다. 외워야할 것도 많아요. 그래서 힘들어요.");
```

## 순서

1. 데이터베이스에 접근하기 위해서 연결풀(connectionPool)을 생성.

왜? mysql(데이터베이스)에 테이블이 존재함.  
테이블에 접근하여서 값을 가져오려고.  
그러면, 기본적으로 연결하기 위한 초기 설정이 필요함.(db.js)

2. 모듈로서 내보낸 연결풀 변수(pool)를 이용하여 쿼리를 작성.

왜? 데이터 베이스 안에 특정 테이블에 값을 가져와야 하니까.

3. 해당 기능을 함수로 선언(findAll).
4. 해당 함수를 모듈로 내보냄.
5. server.js에서 내보낸 모듈을 불러와서 함수를 호출함.

- 아 위의 순서로 보았을 때, 다음으로 Create에 해당하는 함수와 Read(상세 페이지)에 대한 흐름으로 갈거구나
- 그렇다면, Create, Read에 해당하는 함수를 만들거구나