## 먼저, 전달 사항

다음 주 3월 10일 ~ 3월 11일 AWS 수업이 예정되어 있습니다.  
학생분들은 반드시!! 다음 사전 준비를 읽고 준비해주세요.  

**AWS 계정 생성 및 로그인**

## 저번 수업에는 뭐했을까?

`5차 월별 평가`  

### 주제: 카운터 구현  

1. 데이터의 흐름을 명확히 이해하는가?(state, props...)
2. 리액트 런타임 환경을 명확히 이해하는가?
3. 리액트 생명주기를 명확히 이해하는가?

여러분이 지금까지 배운 개념을 **실제 개발 환경에서 어떻게 적용할 수 있는지** 평가하는 과정.  

### 카운터 구현? 이걸 잘한다고 실력이 검증될까요?  

카운터는 단순한 기능처럼 보이지만  
**웹 개발의 핵심 개념을 종합적으로 확인할 수 있는 문제**입니다.  
즉, **우리가 진행한 수업의 흐름**을 제대로 이해하고 있는지  
파악하기에 매우 적합한 평가 방식입니다.  

### 결국, 카운터 구현이 중요한 이유  

Node.js와 React.js를 활용해 **데이터가 어떻게 흘러가는지**를 명확히 이해하고 있느냐가 핵심입니다.  
즉, **"웹 개발의 기본 원리와 흐름을 정확히 이해했는가?"**를 평가하는 문제이며,  
이 과정이 정립되지 않았다면 이후 블록체인 개발에서도 개념을 제대로 적용할 수 없습니다.  

> 카운터를 제대로 구현할 수 있다면? → **"기본기가 탄탄하다!"**  
> 카운터조차 구현이 어렵다면? → **"아직 학습이 더 필요하다."**  

고생하셨습니다.  
참고로 재시험 봐야하는 인원 있습니다.  

## 이번 수업에는 뭐할까?

`AWS 및 배포`

## 이번 수업의 핵심

- 배포 과정을 통해 네트워크(서버·클라이언트, 포트·방화벽 등)를 직접 다루게 되므로  
시야와 이해가 폭넓어짐
- 서버 환경에서 돌아가는 코드를 체험하면서, 개발 프로세스 전반에 대한 이해할 수 있다.
- 즉, 배포해서 좋음 ㅠ이 끝이 아니라  
네트워크를 더 폭 넓게 안다면, 코드를 대하는 태도부터가 달라진다.

**배포 실습을 하면, 서버 운영(프로세스·로그·보안 등)에 대한 책임감**  
**네트워크 구조를 이해할 수 있다(이해해야 한다)**

## 이번 수업의 목차

- AWS란?
- EC2
- EC2 Instance
- EC2 Instance 생성해보자
    - AMI (Amazon Machine Image)
    - Region(리전)
    - 키페어란?
    - 네트워크 설정
    - 스토리지 구성
- 인바운드 & 아웃바운드
- EC2 내부 환경에 Node.js, Mysql 설치
- Nginx란?
    - 리버스 프록시

## 백 서버 디렉토리 설정

### counter-api 디렉토리 따로 생성

- blockchain11
- counter-api

동일 선상에 counter-api 디렉토리 생성

### 해당 디렉토리 엽니다.

```sh
mkdir counter-api
cd counter-api
code .
```

### git clone (내(교강사)꺼 git clone해서 가져오라는게 아니야^^)

여러분 fork했죠? 해당 레포지토리 git clone 뜨라는거야

```sh
git clone [여러분fork주소] .
```

### EC2 세팅

근데 먼저, 우분투 계정이 지금 root되어 있잖아요?  
wnqudgus1234(본인 이름 계정) 만들어야지.  
그리고 권한 설정먼저 합시다.  

### 우분투 계정 생성

```sh
sudo adduser [본인계정이름]
```

- 엔터치면 다음과 같이 나옴

```sh
ubuntu@ip-172-31-42-130:~$ sudo adduser wnqudgus1234
info: Adding user `wnqudgus1234' ...
info: Selecting UID/GID from range 1000 to 59999 ...
info: Adding new group `wnqudgus1234' (1001) ...
info: Adding new user `wnqudgus1234' (1001) with group `wnqudgus1234 (1001)' ...
info: Creating home directory `/home/wnqudgus1234' ...
info: Copying files from `/etc/skel' ...
New password: 
```

- 비밀번호 까먹기만 해봐.

```sh
- `Full Name`: 사용자 전체 이름
- `Room Number`: 사무실/방 번호
- `Work Phone`: 회사 전화번호
- `Home Phone`: 집 전화번호
- `Other`: 기타 정보
```

엔터 연타

### 권한 설정

- 지금은 권한을 다 줄거에요.
- sudo 그룹에 포함시켜서

```sh
sudo usermod -aG sudo wnqudgus1234
```

- 위 명령은 `wnqudgus1234` 계정을 `sudo 그룹` 에 추가하는 것
- `sudo` 그룹에 속하면 관리자 권한을 가짐

**주의!!**

- sudo 그룹에 포함시키는 짓은 `되도록` 하지맙시당^^
- 지금은 수업을 위해서 빠르게 하려고 넣은 거임
- 왜 하지말라는지 웹서핑 해볼것!

## 우리 프로젝트 git clone

아까 우리가 fork 뜬 프로젝트를 EC2(가상 컴퓨터)에 올릴거임.  
그리고 npm run start할거임.
=> 실행시킬거임

### 경로 변경

```sh
cd /home/wnqudgus1234
```

필요한게 무엇이 있을까? (리눅스 환경에서 설치)

1. Node.js(express) 
2. git 설치

### Node.js 설치 (LTS 버전 추천)**

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
```

```bash
sudo apt install -y nodejs
```

```sh
sudo apt update
```

### 해당 디렉토리로 이동

```sh
cd /home/wnqudgus1234
```

```sh
git clone https://github.com/imbhj/counter-api.git
```

설치 완

### counter-api로 이동

```sh
cd /home/wnqudgus1234/counter-api
```

### 프로젝트 설치

```sh
npm install
```

### 서버를 실행시킨채로 퍼블릭 주소로 접속

```sh
http://13.125.219.8
```

### 읭? 접속이 안되는데요?

인바운드, 아웃바운드 규칙

`13.inoutbound.md파일 참고`  
80번대, 3005번대(지금은)의 트래픽을 허용해야함.

### 다시 퍼블릭 주소로 접속

```sh
http://13.25.219.8:3005
```

`hello aws!`  

화면이 나올겁니다.  

### 찾아보면 좋은 것

- 80번대와 3005번대인데 왜 우리 로컬에서 브라우저 URL에 버블릭 주소 입력 후 땅 때리면 되지??  
도대체 어떤 연관이 있길래?
- localhost와 차이점은?
- 왜 :3005 포트번호까지 붙힐까?

### counter-api 코드 수정

이제 퍼블릭 주소로 접속이 가능하니, 우리가 만든 API의 주석을 제거한 뒤, 요청을 때려보자

## mysql 설정

```sh
sudo apt update
sudo apt install mysql-server -y
```

### 설치가 완료되었는지 확인

```sh
mysql -v
mysql --version
```

### mysql 서비스 시작 및 활성화

```sh
sudo systemctl status mysql
```

### root 사용자로 MySQL 접속

```bash
sudo mysql -u root -p1
```

- 비밀번호 입력하라고 할 때, 엔터만 눌러영
- 초기에 비밀번호 설정한 적이 없으니까.

### 새로운 데이터베이스 생성

1. 새 대이터베이스 생성

```sql
CREATE DATABASE Ju;
```

2. 생성된 데이터 베이스 목록 확인

```sql
SHOW DATABASES;
```

3. 새로 생성된 데이터베이스 사용

```sql
use Ju;
```

### MySQL 사용자 생성 및 권한 설정

1. 새로운 사용자 생성 (`wnqudgus1234`)

```sql
CREATE USER 'wnqudgus1234'@'%' IDENTIFIED BY 'qwwqsa4544!!';
```
2. 데이터베이스(`Ju`)에 대한 모든 권한 부여

```sql
GRANT ALL PRIVILEGES ON Ju.* TO 'wnqudgus1234'@'%';
```

3. 변경사항 적용

```sql
FLUSH PRIVILEGES;
```

4. 새로 생성한 사용자로 로그인 테스트

```bash
ctrl z
mysql -u wnqudgus1234 -p
```

## mysql & sequelize 파일 설정

### config.js

```js
require('dotenv').config();

const config = {
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 3000,
    db: {
        development: {
            username: process.env.DB_USER || '',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_DATABASE || '',
            port: process.env.DB_PORT || '',
            host: process.env.DB_HOST || '',
            dialect: 'mysql',
        }
    }
}

module.exports = config;
```

해당 config.js는 env 환경 변수를 의존하고 있죠?  
.env파일을 **EC2!!!!!!!!환경에서**에서 생성합시다.  

### vi .env

```ini
DB_USER="wnqudgus1234"
DB_PASSWORD="qwwqsa4544!!"
DB_DATABASE="Ju"
DB_PORT=3306
DB_HOST="127.0.0.1"
NODE_ENV="development"
PORT=3000
```

## server.js API 주석 제거

이제 .env까지 설정했으니, **우리!!!** counter-api(EC2환경 말고)에서  
server.js 코드 수정합시다.

## PM2 설치

14.pm2.md 참고...

### 1. PM2 설치

EC2 인스턴스에 접속 후 PM2 설치  

```sh
npm install -g pm2
```

### 2. PM2가 정상적으로 설치되었는지 확인

```sh
pm2 -v
```

### 3. PM2를 사용하여 서버 실행

```sh
pm2 start server.js --name counter-api
```

### 4. PM2 프로세스 목록 확인

```bash
pm2 list
```
💡 *현재 실행 중인 프로세스를 확인할 수 있습니다.*

### 5. PM2 프로세스 중지 및 삭제

**서버 중지**  

```sh
pm2 stop counter-api
```

**서버 삭제**

```sh
pm2 delete counter-api
```