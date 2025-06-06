# 점수

| 번호 | 요구 사항                                     | 점수 |
| ---- | --------------------------------------------- | ---- |
| 1    | 프로젝트 구조/환경 구성                       | 4    |
| 2    | 레이아웃 구현                                 | 4    |
| 3    | 카운트 상태 관리                              | 10   |
| 4    | 이벤트 처리                                   | 10   |
| 5    | 데이터 흐름 & 이력(Log)                       | 0    |
| 6    | 새로고침 시 DB 연동                           | 6    |
| 7    | React 생명주기                                | 4    |
| 8    | 이력(Log) 추가 기능                           | 0    |
| 9    | styled-components를 활용하여 요소를 꾸몄는가? | 6    |
| 10   | 코드 가독성                                   | 6    |

50점 미달

# 교강사가 판단했을 때 부족한 점

- 데이터 흐름(state, props)
- 리액트 생명주기(useEffect 등)에 대한 이해 부족"입니다.

## 1. 데이터의 흐름을 명확히 이해했는가? (state, props) ❌ 부족함

=> 데이터 흐름을 이해하지 못했기 때문에, 상태 관리 방식이 일관되지 않음.

문제점

- `props` 방식과 `useContext` 방식을 혼용해서 사용함.

  - `countText.jsx`에서는 `props.children`을 사용해 데이터를 전달하려고 함.
  - `Time.jsx`에서는 전역 상태(`useContext`)를 직접 가져와 사용함.
  - 같은 프로젝트 내에서 서로 다른 방식으로 상태를 관리하려다 보니 코드가 뒤섞여서 구조가 무너짐.

- 상태(state)를 중심으로 컴포넌트를 설계해야 하는데, UI를 먼저 만들고 거기에 데이터를 억지로 끼워 맞추려는 패턴이 보임.

  - 데이터를 어떻게 저장하고, 어디에서 관리하고, 어떻게 전달할지를 먼저 결정해야 함.

- `useContext`를 굳이 사용할 필요 없는 상황에서 사용하고 있음.

  - 전역 상태를 공유해야 하는 컴포넌트만 Context를 사용해야 함.
  - 하지만 `StyledBox` 내부에서만 state를 관리하는데 `useContext`를 추가함.
  - 필요하지 않은 useContext를 사용하면서 코드가 더 복잡해지고, 데이터 흐름이 꼬임.

해결책

- "일관된 방식"으로 상태를 관리해야 함.
- 전역 상태(`useContext`)를 사용할 거면 모든 컴포넌트가 같은 방식으로 접근해야 함.
- 상태를 설계할 때, UI부터 짜지 말고 먼저 데이터 흐름을 명확히 계획해야 함.

## 2. 리액트 런타임 환경을 명확히 이해했는가? (CRA, Webpack, 환경 구성) ⭕ 이해는 함 (문제는 아님)

문제점

- 기본적인 프로젝트 구조는 구성할 수 있음.

  - CRA 기반 프로젝트를 만들었고, styled-components도 도입함.
  - 컴포넌트 구조 자체는 어느 정도 만들 수 있음.

- 하지만 styled-components의 위치가 일관되지 않음.  
  ㅣ
  - `components` 폴더에 스타일을 분리해서 관리하면서도, 일부는 컴포넌트 내부에 직접 작성함.
  - 유지보수가 어려운 코드가 됨.

해결책

- 코드 구조를 깔끔하게 정리하는 습관을 들여야 함.
- 스타일드 컴포넌트는 일관되게 `components` 폴더에서 관리하도록 통일해야 함.

## 3. 리액트 생명주기를 명확히 이해했는가? (useEffect 등) ❌ 부족함

=> useEffect의 동작 원리를 이해하지 못해서 잘못된 패턴을 사용하고 있음.

문제점

- useEffect 내부에서 `return setState(...)`를 사용함.

  - `return`은 `cleanup function` 용도로만 사용해야 하는데, 그냥 `setState` 앞에 `return`을 붙임.
  - "setState도 함수니까 return 해야 하지 않을까?" 라는 잘못된 개념을 가지고 있는 것으로 보임.

- `useEffect`의 의존성 배열(`[]`)을 제대로 이해하지 못하고 있음.

  - 데이터가 언제 변경되며, 어떤 시점에서 업데이트해야 하는지를 모름.

- 새로고침 시 count 값이 0으로 초기화되는 문제 발생.

  - 데이터를 불러오는 타이밍이 잘못되었거나, 상태 업데이트 과정이 꼬였기 때문.

해결책

- useEffect 내부의 `return`은 cleanup 용도라는 점을 명확히 이해해야 함.
- state 변경 시점을 명확히 하고, 데이터가 초기화되는 문제를 해결해야 함.
- "언제 데이터를 불러오고, 언제 상태를 업데이트해야 하는가?" 를 먼저 고민해야 함.

## 최종 결론 & 학생이 보완해야 할 점

### 우선 해결해야 할 것

- 데이터 흐름(state, props)을 명확히 이해하고, 일관된 상태 관리 방법을 적용해야 함.
- useEffect의 동작 원리를 정확히 이해하고, 불필요한 return을 제거해야 함.

### 다음 단계에서 개선할 부분

- 스타일드 컴포넌트 위치를 통일하고, 코드 구조를 더 깔끔하게 정리해야 함.
- 컴포넌트 설계를 할 때 UI부터 만들지 말고, 먼저 데이터 흐름을 설계하는 습관을 들여야 함.
