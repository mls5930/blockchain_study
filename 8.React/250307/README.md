## 먼저, 전달 사항

다음 주 3월 10일 ~ 3월 11일 AWS 수업이 예정되어 있습니다.  
학생분들은 반드시!! 다음 사전 준비를 읽고 준비해주세요.

**1. AWSready.md를 정독해주세요!!**

## 만약, 하다가 막힌다면?

만약 하다가 막히는 부분이 있다면 다음 단계까지만 진행해주세요.  

1. AWS 계정 생성 및 로그인
2. AWS 비용 모니터링 설정

정 안돼면, 1번만이라도 해주시면 됩니다!!

## 저번 수업은 뭐했을까?

1. DB 연동 흐름 살펴보기
2. 선택사항 검토
3. 기본기를 강조하는 세 가지 기준
4. 월별 평가를 위한 초기 세팅

DB 연동에서의 흐름 => + 버튼 → DB에 값 저장 → 서버 응답 수신 → 리액트 상태 업데이트 → 리렌더링.  
이 과정을 이해하고 직접 구현해보는 것이 중요!!

## 저번 수업의 핵심

리액트는 결국 `데이터를 잘 알려주자!` 가 첫 번째.  
즉, 리액트에서 제공하는 기능이 중요한게 아니라, 기본기를 바탕으로  
**리액트가 어떻게 동작하고, 데이터가 어떻게 흘러가는지를 정확히 파악하는 것**  
그 이후에는 여러분들이 원하는 기능을 자유자재로 사용할 수 있음.  
이 부분이 탄탄해야 서버 API 통신부터 고급 훅 활용까지 자연스럽게 연결됨.  

## 이번 수업에는 뭐할까?

**5차 월별 평가**

### 주제: 카운터 구현  

이 평가는 단순한 코딩 시험이 아닙니다.  
여러분이 지금까지 배운 개념을 **실제 개발 환경에서 어떻게 적용할 수 있는지** 평가하는 과정입니다.  

### 카운터 구현? 이걸 잘한다고 실력이 검증될까요?  

카운터는 단순한 기능처럼 보이지만, **웹 개발의 핵심 개념을 종합적으로 확인할 수 있는 문제**입니다.  
즉, **우리가 진행한 수업의 흐름**을 제대로 이해하고 있는지 파악하기에 가장 적합한 평가 방식입니다.  

- **프론트엔드(React.js)**  

  - **상태(state) 관리**: `useState`, `useReducer`를 활용한 상태 변경  
  - **컴포넌트 렌더링 및 최적화**: 상태 변화에 따른 UI 업데이트  
  - **이벤트 핸들링**: 버튼 클릭 시 동작 수행  

- **백엔드(Node.js, DB 연동)**  

  - **API 요청 처리**: Express.js로 카운터 값을 저장 및 불러오기  
  - **데이터베이스 연동(MySQL 또는 Sequelize)**: 값의 저장 및 갱신  

### 결국, 카운터 구현이 중요한 이유  

Node.js와 React.js를 활용해 **데이터가 어떻게 흘러가는지**를 명확히 이해하고 있느냐가 핵심입니다.  
즉, **"웹 개발의 기본 원리와 흐름을 정확히 이해했는가?"**를 평가하는 문제이며,  
이 과정이 정립되지 않았다면 이후 블록체인 개발에서도 개념을 제대로 적용할 수 없습니다.  

> 카운터를 제대로 구현할 수 있다면? → **"기본기가 탄탄하다!"**  
> 카운터조차 구현이 어렵다면? → **"아직 학습이 더 필요하다."**  

### 알겠으니까 문제는 어딨누

해당 디렉토리(250307) 폴더에 monthTest5.md를 확인하시면 됩니다.