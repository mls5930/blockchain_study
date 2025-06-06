# 점수

| 번호 | 요구 사항                                                                  | 점수 |
| ---- | -------------------------------------------------------------------------- | ---- |
| 1    | 프로젝트 구조/환경 구성                                                    | 10   |
| 2    | 레이아웃 구현                                                             | 10   |
| 3    | 카운트 상태 관리                                                           | 4  |
| 4    | 이벤트 처리                                                                | 10   |
| 5    | 데이터 흐름 & 이력(Log)                                                    | 10   |
| 6    | 새로고침 시 DB 연동                                                        | 4   |
| 7    | React 생명주기                                                             | 4   |
| 8    | 이력(Log) 추가 기능                                                       |  0   |
| 9    | styled-components를 활용하여 요소를 꾸몄는가?                              | 4   |
| 10   | 코드 가독성                                                               | 6   |

62점 통과

# 교강사가 판단했을 때 부족한 점

아래 세 가지 관점에서 학생의 문제점을 종합적으로 살펴보면, 

1. 데이터의 흐름을 명확히 이해했는가?(state, props)
2. 리액트 런타임 환경을 명확히 이해했는가?
3. 리액트 생명주기를 명확히 이해했는가?

**가장 큰 이슈는 ‘데이터의 흐름(state, props)과 리액트 생명주기’에 대한 이해가 부족**하다는 것으로 보입니다. 

## 1. **데이터 흐름에 대한 이해(state, props) 부족**

- **이력(Log)을 DB에서 받아서 화면에 뿌리는 과정** 자체가 흔들렸음.  
- 실제로 **백엔드에서 받은 데이터를 어떤 state에 저장해야 하며, 그 state를 어떻게 화면에 반영**해야 하는지 명확하게 설계하지 못함.  
- 특히 “**로그를 어딘가에 누적해야 하는데, 어떻게 해야 하지?”** 하는 시점부터 동요 → “handle 함수, useEffect” 등을 **애매하게** 사용함.  

### 주요 증상

1. **새로고침 시 0으로 초기화**되는 문제  

   - GET 통신 결과를 제대로 state에 반영하지 못하거나, state 초기값과 동기화 로직이 불분명.  

2. **이력(Log) 기능**을 구현해놓고도 제대로 보여주지 못함  

   - “어떤 컴포넌트에서 데이터를 관리하고, 그 상태를 자식에게 어떻게 넘겨줄지”가 흔들렸기 때문.

## 2. **리액트 런타임 환경 이해**는 비교적 경미

- 프로젝트 구조 자체는 어느 정도 만들었으므로, **웹팩이나 CRA 등 런타임 환경에 대한 기초 지식**은 완전히 부족해 보이진 않음.  
- 다만, **“서버 재시작을 깜빡했다”** 같은 부분은 “환경 관리” 측면에서 미숙함을 보일 수 있음.
- 그래도 이 부분은 상대적으로 치명적이라기보다는 **습관/숙달** 문제에 가깝습니다.  

## 3. **리액트 생명주기에 대한 이해(useEffect 등) 미흡**

- **DB 연동 시점**을 잡는 로직(`useEffect`)과 **카운터 로직**을 연결해두지 못해, 데이터가 0으로 초기화되는 상황 발생.  
- 단순 클릭 이벤트 로직은 잘 작성하였으나, **초기 로드 시점** 또는 **값 변경 후 후속 처리 시점**이 어긋남.  
- “`useEffect` 내부에서 DB 호출 → state 업데이트 → 렌더링”의 사이클을 명확히 이해하지 못하면,  
  - “왜 버튼 누르면 증가하는 건 되는데, 새로고침하면 0이지?” 같은 문제로 이어짐.

## **결론적 판단: ‘데이터 흐름 & 생명주기’가 제일 문제**

1) **데이터 흐름**(state, props)  

   - 백엔드로부터 어떤 구조로 데이터를 받고, 그것을 어떤 state에 저장하며, 그 state를 이용해 어디서 어떻게 렌더링할지…  
   - 이 과정을 제대로 구상하지 못했음.  

2) **생명주기**(useEffect, 마운트 시점 등)  

   - *“언제 DB에서 값을 가져오고, 그 후 화면에 어떻게 반영되며, 다시 데이터가 바뀌면 어떻게 후속 처리를 하나?”*  
   - 이 “흐름”을 전부 다루는 것이 `useEffect`지만, 정확히 이해하지 못해 **초기값이 0으로 남거나**, **이력을 뿌리지 못하는 문제**가 생김.

3) **리액트 런타임 환경**은 상대적으로 크게 문제되지 않음.

   - CRA나 Webpack, 서버 구동 등의 기초 세팅은 어느 정도 할 수 있는 것으로 보이므로,  
   - 주로 **실수(서버 재시작 깜빡, env 파일 활용 미숙)** 수준.

## 추가

- **데이터 구조부터 잡기**: “카운트 값”과 “이력(Log)”을 어떤 형태로 state에 담을지, 컴포넌트 간에 어떻게 주고받을지 설계가 필요.  

- **생명주기 로직**: `useEffect`를 활용하여 “초기 로드 시 DB에서 상태를 받아오는 로직”과 “상태가 바뀔 때 서버로 다시 저장하는 로직”을 깔끔히 분리.  

- **데이터 설계 명확하게**: **데이터 흐름을 먼저 확정**해두었지만, 설계 자체를 잘못함. 

> 즉, **학생이 가장 먼저 보완해야 할 점은 ‘데이터 흐름(state, props)과 useEffect를 비롯한 생명주기의 연관관계 이해’**라고 볼 수 있습니다.