## DBMS

데이터베이스 관리 시스템의 약자.  
쉽게 말해서, 데이터를 저장하고 관리하는 소프트웨어.  
우리가 컴퓨터에서 파일을 저장하고 관리하는 것처럼, DBMS는 데이터베이스라는 특별한 공간에 데이터를 저장하고
그 데이터를 쉽게 찾고 사용할 수 있도록 도와줍니다.  

## DBMS 종류

- 관계형(RDBMS)

데이터를 테이블 형태로 저장합니다.  
테이블은 행과 열로 구성.  
SQL을 사용하여 데이터를 관리.

MySQL 

- 비관계형(NoSql)

MongoDB

## MySQL 설치

### Window For Linux(Ubuntu)

- 시스템의 패키지 목록을 업데이트하여 최신 정보 반영.

```sh
sudo apt update
```

- MySQL 서버 설치

```sh
sudo apt install mysql-server
```

- MySQL 설치 버전 확인

```sh
mysql --version
```

- MySQL 서버 스타트

```sh
sudo service mysql start
```

- MySQL 루트 계정 접속

```sh
sudo mysql -u root -p
```

- MySQL 계정 접속

```sh
sudo mysql -u wnqudgus1234 -p
```

## 테이블

데이터베이스의 저장하는 형태  
우리 엑셀 프로그램의 시트 형태와 닮아있음.  

- board 테이블
- user 테이블
- image gallery 테이블
- student 테이블

이름, 나이, 학년

   | 이름 | 나이 | 학년 |
   | ---- | ---- | ---- |
   | 철수 | 12   | 6    |
   | 영희 | 11   | 5    |
   | 민수 | 10   | 4    |
   | 혜성 | 5   | -3    |

우리가 테이블 데이터 구조에 값을 집어넣을 수 있어야한다.  
=> 저장하고 꺼내쓴다. 간단하죠?
근데 위의 테이블에서 데이터를 저장하는 거랑 꺼내오는거를 어떻게 하지?
=> 명령을 해야한다 => SQL

`테이블에 접근하여 혜성이라는 아이를 추가해줘`

## SQL(Structured Query Language)

DBMS에서 구현된 기능을 실행시키기 위해 특정한 언어.  
데이터를 보관, 저장, 삭제, 수정 요청할 수 있게끔 하는 언어.

- SHOW
- CREATE

### 데이터 베이스 생성

```sql
CREATE DATABASE [여러분들영어이름];
CREATE DATABASE Byeong;
```

### 데이터 베이스 생성 후 조회

```sql
SHOW DATABASES;

+--------------------+
| Byeong             |
| Ju                 |
| byeonghyeon        |
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
7 rows in set (0.00 sec)
```

### 해당 데이터베이스에 접속

```sql
USE [데이터베이스이름];
USE Byeong;

Database changed
```

데이터베이스 생성했으니, 테이블을 만들어보자

### 테이블 생성

게시판 속성이 뭐가있을까?

- id: 특정 게시글의 id
- user_id: 게시글을 작성한 아이디
- writer: 게시글을 작성한 이름
- title: 게시글 제목
- content: 게시글 내용
- created_at: 생성날짜
- hit: 조회수

근데, 속성이 너무 많으니, 그리고 처음이니 속성을 간단히 추려볼게요

- user_id: VARCHAR(50) => "wnqudgus1234"
- writer: VARCHAR(50)
- title: VARCHAR(50)
- content: VARCHAR(50)

```sql
CREATE TABLE board (
   user_id VARCHAR(50),
   writer VARCHAR(50),
   title VARCHAR(50),
   content VARCHAR(50)
);
```

위를 복사하여 터미널(우분투)에 붙혀넣는다면 다음과 같이 나옴

```sh
mysql> CREATE TABLE board (
    ->    user_id VARCHAR(50),
    ->    writer VARCHAR(50),
    ->    title VARCHAR(50),
    ->    content VARCHAR(50)
    -> );
```

그리고 엔터치고, 테이블 조회 명령어로 다시 조회

```sql
SHOW tables;

+------------------+
| Tables_in_Byeong |
+------------------+
| board            |
+------------------+
1 row in set (0.00 sec)
```

### 특정 테이블 정보 상세 조회

```sql
DESC board;

+---------+-------------+------+-----+---------+-------+
| Field   | Type        | Null | Key | Default | Extra |
+---------+-------------+------+-----+---------+-------+
| user_id | varchar(50) | YES  |     | NULL    |       |
| writer  | varchar(50) | YES  |     | NULL    |       |
| title   | varchar(50) | YES  |     | NULL    |       |
| content | varchar(50) | YES  |     | NULL    |       |
+---------+-------------+------+-----+---------+-------+
4 rows in set (0.00 sec)
```

### 테이블 이름 바꾸기

```sql
ALTER TABLE board RENAME TO board2;
```

데이터베이스에서 사용하는 데이터의 종류를 정의하는 것을 `필드 타입` 이라고 합니다.  

- 숫자형
- 문자형
- 날짜형

## Field Type

### 숫자형

- INT

설명: 정수형 데이터로, 4바이트의 메모리를 사용
범위: -2,147,483,648부터 2,147,483,647까지의 정수를 표현할 수 있음.

### 문자형

- CHAR: 고정 길이의 문자열을 저장할 때 사용.(255바이트)
- VARCHAR: 가변 길이의 문자열을 저장할 때 사용.(255바이트)
- TEXT: 최대 65,535바이트까지의 긴 문자열을 저장할 때 사용.

### 날짜형

- DATE: 날짜를 저장. 형식은 `yyyy-mm-dd`.
- TIME: 시간을 저장. 형식은 `HH:MM:SS`.
- DATETIME: 날짜와 시간을 함께 저장. 8바이트의 메모리를 사용. 형식은 `YYYY-MM-DD HH:MM:SS`.
- TIMESTAMP: 날짜와 시간을 정수 형태로 저장. 4바이트의 메모리를 사용.  
주로 데이터가 생성하거나수정된 시간을 기록될 떄 사용.
- YEAR: 연도를 저장. 1바이트의 메모리를 사용.
등등

### 데이터 조작어 (DML)

- SELECT(조회)
- INSERT(추가)
- UPDATE(수정)
- DELETE(삭제)

### 테이블을 조회해보자.

```sql
SELECT * FROM board;

Empty set (0.00 sec)
```

=> user 테이블에서 모든 열(`*`)을 선택하겠다는 의미. 즉, user 테이블에 있는 모든 정보를 가져오겠다는 뜻

```sql
SELECT user_id, writer FROM board;
```

=> user 테이블에서 열 중에 user_id와 writer만 선택한 정보를 가져오겠다는 뜻

어라? 값이 없네? 그치 안넣었으니까  
게시글을 작성해보자

### board 테이블에 데이터 추가하기

```sql
INSERT INTO board(user_id, writer, title, content) values("rhgPtjd2232", "고혜성", "두 번째 제목입니다.", "세 번째 내용입니다.");

Query OK, 1 row affected (0.01 sec)

select * from board;
+--------------+-----------+-----------------------------+-----------------------------+
| user_id      | writer    | title                       | content                     |
+--------------+-----------+-----------------------------+-----------------------------+
| wnqudgus1234 | 주병현    | 제목입니다.                 | 내용입니다.                 |
| rhgPtjd2232  | 고혜성    | 두 번째 제목입니다.         | 세 번째 내용입니다.         |
| rhgPtjd2232  | 고혜성    | 두 번째 제목입니다.         | 세 번째 내용입니다.         |
+--------------+-----------+-----------------------------+-----------------------------+
```

근데 나는 특정 컬럼 중에서 특정 값이 포함된걸 조회하고 싶어.
user_id=wnqudgus1234인 글들만 조회해줘.

### where절

```sql
select * from board where user_id="rhgPtjd2232";

+-------------+-----------+-----------------------------+-----------------------------+
| user_id     | writer    | title                       | content                     |
+-------------+-----------+-----------------------------+-----------------------------+
| rhgPtjd2232 | 고혜성    | 두 번째 제목입니다.         | 세 번째 내용입니다.         |
| rhgPtjd2232 | 고혜성    | 두 번째 제목입니다.         | 세 번째 내용입니다.         |
+-------------+-----------+-----------------------------+-----------------------------+
2 rows in set (0.00 sec)
```

근데 나는 데이터를 좀 수정하고 싶어.  
위의 테이블을 조회한걸 보았을 때, 게시글 둘 다 같은 내용이야.

### 테이블의 특정 데이터 수정하기

```sql
UPDATE board SET title="첫 번째 제목입니다.", content="첫 번째 내용입니다." WHERE user_id="wnqudgus1234";

+--------------+-----------+--------------------+-----------------------------+
| user_id      | writer    | title              | content                     |
+--------------+-----------+--------------------+-----------------------------+
| wnqudgus1234 | 주병현    | 제목입니다.        | 내용입니다.                 |
| rhgPtjd2232  | 고혜성    | 둘 다 바뀌나?      | 세 번째 내용입니다.         |
| rhgPtjd2232  | 고혜성    | 둘 다 바뀌나?      | 세 번째 내용입니다.         |
+--------------+-----------+--------------------+-----------------------------+
3 rows in set (0.00 sec)
```

위의 테이블 값을 보았을 때, 고혜성이란 값이 두 개가 중복이 된다.  
둘 다 삭제하고 싶음.

### 데이터 삭제하기

```sql
DELETE FROM board WHERE id=${id};
```

1. 데이터를 조회, 생성, 수정, 삭제한다?
2. MySQL에도 이에 대한 작업을 제어할 수 있는 수단이 있을것이다.
3. 그럼 각 사용자가 있겠네?
=> 그러면, 계정마다 특정 테이블에 대한 권한을 줄 수도 있겠네?

### 데이터 제어어 (DCL)

- GRANT: 특정 테이블을 조작할 수 있는 권한 부여
- REVOKE: 특정 테이블을 조작할 수 있는 권한 회수

권한을 주기 위해서는, 권한을 받는 사용자 계정이 필요하다

### 계정 생성

```sql
CREATE USER 'wnqudgus5565'@'localhost' IDENTIFIED BY "wnqudgus5565";
```

=> 사용자 이름을 `wnqudgus5565` 로 하고, 비밀번호를 `wnqudgus5565`로 할 것이다.

### 권한 부여

```sql
GRANT ALL PRIVILEGES ON Byeong.* TO "wnqudgus5565"@"localhost";
```

### 권한 확인

```sql
SHOW GRANTS FOR 'wnqudgus5565'@'localhost';
```

### 권한 회수

```sql
REVOKE ALL PRIVILEGES On Byeong.* from `wnqudgus5565`@`localhost;`;
```

### 내가 만든 유저 조회

```sql
use mysql;
select user, host from user;
```

### 내 유저 비밀번호 변경

```sql
mysql -u root -p;

alter user '[변경하고싶은계정]'@'localhost' identified with mysql_native_password by 'new password';
```

### 데이터베이스 삭제(주의! 테이블 삭제가 아님)

```sql
DROP DATABASE Byeong;
DROP DATABASE byeonghyeon;
```

저는 Ju라는 데이터베이스 안에 board라는 테이블을 새로 만들게요.

board(게시판) 속성을 정한다면, 뭐가 있을까?

1. 일단 필드 타입부터 정하자

- id: 게시글의 고유한 아이디 INT(20)
- user_id: 유저의 아이디 VARCHAR(50)
- title: 제목 VARCHAR(255)
- content: 내용 TEXT(5000)
- created_at: 생성일 DATETIME
- hit: 조회수 INT(20)

2. 빈 값을 허용할까? 말까?

- id: 게시글의 고유한 아이디 NOT NULL
- user_id: 유저의 아이디 NOT NULL
- title: 제목 NOT NULL
- content: 내용 NOT NULL
- created_at: 생성일 NOT NULL
- hit: 조회수 NOT NULL

3. 글을 쓸때마다 데이트 즉 날짜는 현재날짜로 잡을까?

- created_at: 생성일 datetime DEFAULT CURRENT_TIMESTAMP

4. id는 고유한 값이어야 할까? 그리고 자동적으로 증가되어야 하는 값일까?

- id: 게시글의 고유한 아이디 AUTO_INCREMENT PRIMARY KEY

DEFAULT CURRENT_TIMESTAMP : 기본값으로 현재 시간을 자동으로 설정
PRIMARY KEY : 각 레코드를 고유하게 식별하는 키. 중복된 값을 가질 수 없음. NULL값 허용안함.
AUTO_INCREMENT : 새로운 레코드가 추가될 때마다 자동으로 1씩 증가하는 숫자 생성

```sql
use Ju;
-- 만약 board가 있다면 삭제
DROP TABLE board;

CREATE TABLE board (
   id INT AUTO_INCREMENT PRIMARY KEY,
   user_id VARCHAR(50) NOT NULL,
   title VARCHAR(255) NOT NULL,
   content TEXT NOT NULL,
   created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
   hit INT(20) NOT NULL
);
```
