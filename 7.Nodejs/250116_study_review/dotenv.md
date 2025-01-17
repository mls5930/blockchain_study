## process.env

Node.js가 런타임 환경에서 process.env 즉 환경 변수를 가리키는 건 맞음.
근데 process는 운영체제의 프로세스를 뜻 함.
=> process.env는 윈도우 운영체제 환경 변수를 접근한다. 그 안에 이러한 변수를 찾는다 => process.env.DB_PORT

## dotenv

해당 프로젝트 내부에서 .env 파일을 읽어서 환경 변수로 설정해줌.

## 순서

1. .env 파일을 읽음
2. 환경 변수로 설정
3. 운영체제와 무관하게 동작