## 저번 수업은 뭐했을까?

- **React 환경 구성**
- 함수형 컴포넌트를 이용해 간단한 **카운터 예제**를 만들며, **React Hooks**의 기초(`useState`)를 체험합니다.  
- **Webpack Dev Server**로 자동 리프레시(Hot Reloading) 하는 방법을 배웁니다.  

## 저번 수업의 핵심

즉, “리액트로 빠르게 앱을 개발할 수 있는 환경”을 구축하고  
클래스형 컴포넌트가 아닌, 함수형 컴포넌트를 기준으로 “기초 컴포넌트, 상태 관리”를 실습해 볼 계획

1. **프로젝트 구조와 빌드 도구**  
2. **Webpack Dev Server로 빠른 개발**  
3. **함수형 컴포넌트 & Hooks**  
  
## 저번 수업의 목차

1. **개요 & 목표 설정**  

   - 리액트 프로젝트를 시작할 때 필요한 것들 
      - 리액트 디렉토리 구조

2. **개발 환경 셋업**  

   - `npm init` 및 필요한 라이브러리 설치  
   - `webpack.config.js`, `.babelrc` 기본 설정

3. **Webpack Dev Server & Hot Reloading**  

   - `webpack-dev-server` 설정  
   - 핫 리로딩 동작 원리

4. **간단 예제 실습: Counter**  

   - 함수형 컴포넌트(`.jsx`)
   - 생명주기 함수 `useState`, `useEffect`
   - 버튼 클릭 시 카운트 증가/감소

## 오늘 수업은 뭐할까?

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

## 오늘 수업의 핵심

- 리액트의 **핵심 개념(props, children)**을 정확히 이해하고, 이를 기반으로 스타일링 생태계를 탐색한다.
- 리액트에서 다양한 방식으로 CSS를 적용하는 방법을 학습.
=> **React에서 데이터가 어떻게 전달되고 관리되는지** 명확히 이해할 수 있다.  

## 오늘 수업 목차

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