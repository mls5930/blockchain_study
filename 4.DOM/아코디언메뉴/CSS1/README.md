목표

1. 클릭한 항목만 열리고, 나머지는 닫히도록 구현
2. CSS와 자바스크립트를 이용해 `transition` 효과로 부드럽게 열고 닫히는 애니메이션 추가

#### HTML 구조 잡기

- accordion
  - accordion-item
    - accordion-title
    - accordion-content
      - 내용

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CSS 아코디언</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="accordion">
      <div class="accordion-item">
        <input type="checkbox" id="accordion-title1" hidden />
        <div class="accordion-content">
          <p>내용 1</p>
        </div>
      </div>
      <div class="accordion-item">
        <input type="checkbox" id="accordion-title2" hidden />
        <div class="accordion-content">
          <p>내용 2</p>
        </div>
      </div>
      <div class="accordion-item">
        <input type="checkbox" id="accordion-title3" hidden />
        <div class="accordion-content">
          <p>내용 3</p>
        </div>
      </div>
    </div>
  </body>
</html>
```

#### CSS 스타일 추가

```css
/* 기본 스타일 */
body {
  font-family: Arial, sans-serif;
}

.accordion {
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.accordion-item {
  border-top: 1px solid #ddd;
}

/* 제목 스타일 */
.accordion-title {
  background-color: #f7f7f7;
  padding: 15px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  text-align: left;
  border: none;
  outline: none;
}

/* 내용 스타일 */
.accordion-content {
  max-height: 0; /* 숨겨진 상태로 시작 */
  overflow: hidden;
  transition: max-height 0.3s ease; /* 부드러운 애니메이션 */
  background-color: #fafafa;
  padding: 0 15px;
}

.accordion-content p {
  padding: 15px 0;
  margin: 0;
}

/* 아코디언 활성화 상태 */
.accordion-item.active .accordion-content {
  max-height: 100px; /* 콘텐츠가 펼쳐졌을 때 높이 설정 */
}
```
