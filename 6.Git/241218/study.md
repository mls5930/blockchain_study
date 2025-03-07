### 실습 과제: Git과 GitHub를 이용한 간단한 페이지 만들기

이 과제에서는 간단한 웹 페이지를 만들고,  
Git과 GitHub를 활용하여 작업 과정을 기록합니다.  
각 단계에서의 작업 내용을 커밋하고,  
필요할 때 이전 시점으로 돌아가는 방법을 익힐 수 있습니다.

### 주의 사항

- 로컬에서 commit으로 시점만 만들고 push는 한 번만 해주세요.
- develop에서 작업한 후, main에 병합하는 식으로 작업을 진행합니다.  
ex => develop에서 HTML 파일 생성 => commit => switch main => git merge develop

### 실습 목차

- 저장소 생성
- 브랜치 생성
- public 폴더 생성
- public/css/style.css 파일 생성
- public/js/script.js 파일 생성
- DOM 조작
- 파일 수정
- 기능 추가
- 원격 저장소에 푸시
- 커밋 메시지 규칙(한 번 봐주세요 ㅎㅎ)
- 제출 방법

1. 저장소 생성

   - GitHub에서 새로운 저장소를 생성합니다. 저장소 이름은 `study`로 설정합니다.

2. 브랜치 생성

   - 브랜치는 최소 2개를 만들어주세요(main, develop)
   - develop에서 작업한 후, main에 병합하는 식으로 작업을 진행합니다.  
   ex=> develop에서 HTML 파일 생성 => commit => switch main => git merge develop

2. HTML 파일 생성
   - `index.html` 파일을 생성하고 기본 HTML 구조를 작성합니다.
   - 커밋 메시지: `feat: 기본 HTML 구조 작성`

3. public 폴더 생성
   - public 폴더를 생성하고 다음과 같은 커밋 메세지 작성.

4. public/css/style.css 파일 생성
   - `styles.css` 파일을 생성하여 기본 스타일을 추가합니다.
   - 커밋 메시지: `feat: CSS 파일 추가 및 스타일 적용`

5. public/js/script.js 파일 생성
   - `script.js` 파일을 생성하여 페이지에 간단한 동작을 추가합니다.
   - 커밋 메시지: `feat: JavaScript 파일 추가 및 기능 구현`

6. DOM 조작
   - HTML 파일에 JavaScript를 연결하고, 간단한 DOM 조작을 추가합니다.
   - 커밋 메시지: `feat: DOM 조작 추가`

7. 파일 수정
   - DOM 조작하는 Javascript 코드를 수정하여 다음 커밋 메시지 추가
   - 커밋 메시지: `fix: DOM 조작 코드 수정`

8. 기능 추가
   - 버튼을 추가하고, 클릭 시 메시지를 보여주는 기능을 구현합니다.
   - 커밋 메시지: `feat: 버튼 클릭 시 메시지 표시 기능 추가`

9. 원격 저장소에 푸시
    - 모든 변경 사항을 원격 저장소에 푸시합니다.
    
    ```sh
    git push origin main
    ```

### 커밋 메시지 규칙

문서에서 소개된 **커밋 메시지의 유형**은 **Git 커밋 컨벤션**으로,  
작업의 의도를 명확히 전달하는 데 유용합니다

커밋 메시지는 강제하지 않지만, 팀장과 팀원의 논의 끝에 규칙이 필요합니다.  
일단 개인 실습이기 때문에, 아래와 같은 글로벌 커밋 메시지 규칙을 알려드릴게요.  

- `feat`: 새로운 기능 추가  
- `fix`: 버그 수정  
- `docs`: 문서 수정  
- `style`: 코드 스타일 변경 (기능 변화 없음)  
- `design`: UI/UX 관련 수정  
- `test`: 테스트 코드 작성 또는 리팩토링  
- `refactor`: 코드 리팩토링 (기능 변화 없음)  
- `rename`: 파일 이름 변경  
- `remove`: 파일 삭제  
- `hotfix`: main 브런치 코드에서 오류 발생 시 긴급 수정(main 브랜치에서 따서 새로 생성하여 수정 및 기능 테스트 실시)  

hotfix는 필요에 의해서 사용

### 제출 방법

- 작업한 Git 저장소를 GitHub에 푸시한 후, 해당 저장소 URL을 제출합니다.
- URL을 제출한 후, 피드백 받아주세용
