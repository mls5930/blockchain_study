## 저번 시간에는 뭐할까?

`Babel` 과 `Webpack`  

이전 시간에는 틱택토를 구현하면서, 리액트 런타임 환경에 대해서 어느 정도 이해됬다고 생각함.  
다음은, 그렇다면, React가 브라우저에서 실행되기까지의 과정은 어떻게 이루어질까?  
Node.js 런타임 환경에서 Babel과 Webpack이 어떤 역할을 하는지 알아보자.  

## 저번 시간의 핵심

Babel과 Webpack을 활용하여 React 환경을 구축하고,  
모듈 번들링 및 트랜스파일링 과정이 어떻게 이루어지는지 이해한다.

## 저번 시간의 목차

- Babel: 트랜스파일링 과정

   - Step 1. Babel의 개념과 필요성, 기본적인 설정 및 실행 과정
   - Step 2. 모듈 시스템 변환
   - Step 3. JSX 트랜스파일링(Transpiling)

- Webpack: 번들링 과정

   - Step 1. Webpack 기본 개념 및 필요성 이해
   - Step 2. Webpack을 활용한 CSS 번들링
   - Step 3. Webpack 설정 및 React 환경 구성

## 오늘 수업은 뭐할까?

- **React 환경 구성**
- 함수형 컴포넌트를 이용해 간단한 **카운터 예제**를 만들며, **React Hooks**의 기초(`useState`)를 체험합니다.  
- **Webpack Dev Server**로 자동 리프레시(Hot Reloading) 하는 방법을 배웁니다.  

## 오늘 수업의 핵심

즉, “리액트로 빠르게 앱을 개발할 수 있는 환경”을 구축하고  
클래스형 컴포넌트가 아닌, 함수형 컴포넌트를 기준으로 “기초 컴포넌트, 상태 관리”를 실습해 볼 계획

1. **프로젝트 구조와 빌드 도구**  
2. **Webpack Dev Server로 빠른 개발**  
3. **함수형 컴포넌트 & Hooks**  
  
## 오늘 수업의 목차

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
