## 저번 수업은 뭐했을까?

`리액트 특성`을 잘 알고 활용해보자

### 데이터 흐름 이해하기

- children을 활용하여 컴포넌트 구조 파악

### React 스타일링 생태계 탐색

리액트에서 스타일을 적용하는 방법은 여러 가지가 있다.  

- **전통적인 CSS 관리 방식**  
  - `css-loader`, `style-loader`를 사용하여 `.css` 파일 적용  

- **CSS-in-JS 방식**  
  - `Styled-Components`를 활용한 동적 스타일링  

이 두 가지 방식이 어떻게 다른지 비교하면서,  
각 방법이 **어떤 상황에서 적절한지**.

## 저번 수업의 핵심

- 리액트의 **핵심 개념(props, children)**을 정확히 이해하고, 이를 기반으로 스타일링 생태계를 탐색한다.
- 리액트에서 다양한 방식으로 CSS를 적용하는 방법을 학습.
=> **React에서 데이터가 어떻게 전달되고 관리되는지** 명확히 이해할 수 있다.  

## 저번 수업 목차

1. React 스타일링 생태계 둘러보기  

   - **기본적인 CSS 관리 방식**  
     - `css-loader`, `style-loader`를 통한 .css 파일 관리  
   - **CSS-in-JS 방식**  
     - Styled-Components를 이용한 동적 스타일링  
     - 왜 CSS-in-JS가 필요한가? 장단점은?  

2. 실습 및 적용  

   - 간단한 컴포넌트(`App`, `Main`, `Button`)에 스타일 적용  
   - `props`로 데이터를 넘기며 컴포넌트 구조 익히기  
   - Styled-Components 세팅 후, 기존 CSS 로더와 병행 사용 테스트  

### 결론 

오늘은 **React 기초(컴포넌트, props)**를 복습하며,  
**CSS 로더 기반 정적 스타일링 → Styled-Components 기반 동적 스타일링**까지 폭넓게 살펴보고 실습. 

## 오늘 수업은 뭐할까?

리액트 프로젝트 `누룩` 초기 세팅

### 리액트 프로젝트 구조화

- React 프로젝트를 생성하고 폴더 구조를 이해.
- **react-router-dom**을 활용하여 페이지 간 이동을 설정.
- styled-components를 활용하여 공통 레이아웃을 설계.
- hooks를 활용한 사용자 입력 관리(`useInput` Hook) 컴포넌트 운용

### 위의 처음보는 키워드

- react-router-dom
- hooks

앞에서 설명할거임!

### 오늘 수업의 핵심

- React 프로젝트를 체계적으로 구조화하고, 유지보수하기 쉬운 디렉토리 구성을 만든다.
- 라우팅을 통해 페이지 전환을 구현하고, Outlet을 활용한 공통 레이아웃 적용법을 익힌다.
- Styled-Components를 이용한 디자인 시스템을 적용해 재사용 가능한 UI를 설계한다.
- 커스텀 훅(useInput)을 만들어 입력값을 효율적으로 관리하는 방법을 학습한다.

## 오늘 수업의 목차

1. **React 프로젝트 초기 설정**  
   - `create-react-app`으로 프로젝트 생성  
   - 폴더 구조 및 역할 정리  

2. **라우팅 적용 (`react-router-dom`)**  
   - `BrowserRouter`, `Routes`, `Route`, `Outlet` 활용  
   - `NavLink`를 사용하여 내비게이션 구성  
   
3. **공통 레이아웃 설계 (`Header`, `Footer`, `BodyWrapper`)**  
   - `styled-components`를 이용한 스타일 관리  
   - `Layout` 컴포넌트에서 `Outlet`을 사용하여 공통 레이아웃 적용  
   
4. **커스텀 훅(`useInput`) 실습**  
   - `useState`를 활용한 사용자 입력값 관리  
   - 재사용 가능한 `useInput` 훅을 만들고 `Form` 컴포넌트에 적용  

### 결론

오늘 수업을 통해 **React 프로젝트의 구조화, 라우팅, 공통 레이아웃 설계, 커스텀 훅 활용법**을 익히며, 유지보수가 쉬운 프로젝트를 설계하는 방법을 실습.

`전역 상태가 왜 필요한지 간접 체험`