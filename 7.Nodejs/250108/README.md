## 저번 시간에는 뭘했을까?

`express을 활용한 게시판 구현`

근데 이제 데이터베이스를 곁들인.

이번 시간에는 데이터베이스 연결을 통해 데이터를 저장하고,  
각 디렉토리의 역할에 맞는 구조를 만드는 방법을 배웁니다.  

- **DB 연결**: 데이터베이스와 Express 서버를 연결하여 데이터를 주고받는 기본 흐름을 이해합니다.  
- **SQL문 작성**: JavaScript에서 SQL문을 작성하고 결과값을 리턴받아 클라이언트에 전달하는 과정을 다룹니다.  

### **저번 시간의 핵심**  

1. **Express와 데이터베이스의 연결 이해**  
   - 연결풀(Pool)을 생성하고, 이를 통해 서버와 DB 간 효율적인 통신이 가능하도록 설정합니다.  
   
2. **SQL 작성과 결과 처리**  
   - JavaScript에서 SQL문을 작성하고 실행하여 데이터를 CRUD(Create, Read)하는 과정을 실습합니다.  

3. **게시판의 핵심 기능 구현**  
   - 클라이언트 요청(Request)을 받아 데이터를 DB에 저장하고, DB에서 데이터를 불러오는 기본 기능을 구현합니다.  

### **이번 시간의 목차**  

1. **DB 연결 및 설정**  
   - MySQL 설치 및 초기 설정  
   - Node.js에서 `mysql2` 패키지를 사용한 연결풀 생성  

2. **SQL문 작성 및 데이터 처리**  
   - INSERT와 SELECT 문 작성  

3. **게시판 구현: Create, Read**  
   - 새로운 게시글 작성 기능 구현(Create)  
   - 작성된 게시글 목록 조회 기능 구현(Read)  

## 이번 시간에는 뭐할까?

`express와 데이터베이스를 연결하여 게시판 구현`

근데 이제 데이터베이스 디렉토리 구조를 곁들인

그리고 디렉토리 설계를 할겁니다.  
어떤 기준으로? `역할과 책임 분리`

### **이번 시간의 핵심**  

이러한 구조가 실제로 어떤 이점을 제공하는가?
역할과 책임을 왜 이렇게 밥먹듯 할까?를 알게 된다.(알아야 한다.)

**역할과 책임 분리의 필요성 이해**

   - **repository**: 데이터베이스와 직접 통신(SQL문 실행).  
   - **services**: 로직 처리와 데이터 가공.  
   - **controllers**: 클라이언트 요청과 응답 관리.

각각의 역할을 분리함으로써 **유지보수성, 가독성, 재사용성**을 높입니다.  

### **이번 시간의 목차**  

**디렉토리 구조 설계: 역할과 책임 분리**  

### 시간이 남는다면?  

저번 시간에 Express와 MySQL(데이터베이스)를 연결하여 Create, Read를 구현하였으니,  
디렉토리 구조 설계에 따라서 나머지 Update를 구현할겁니다.  

1. **Update 구현**  

   - HTTP 메서드로 요청을 처리하는 API 작성  
   - SQL문 작성과 데이터베이스 연동  

### Delete는요?

실습입니당^^