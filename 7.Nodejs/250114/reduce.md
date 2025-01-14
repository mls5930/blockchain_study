### 목표

주어진 `cookieString`을 `reduce`를 사용하여 쿠키 값을 객체로 변환하는 것입니다.

### 1. 쿠키 문자열 준비

```javascript
const cookieString = "user_id=wnqiudgus1234";
```

- 여기에서 `cookieString`은 "user_id=wnqiudgus1234"라는 하나의 쿠키 값이 들어있는 문자열입니다.
- 실제로 여러 쿠키 값이 있을 수 있지만, 이 예제에서는 단일 쿠키만 다루고 있습니다.

### 2. `split(";")`로 쿠키 분리

```javascript
cookieString.split(";")
// 결과: ['user_id=wnqiudgus1234']
```

- `split(";")`: 쿠키 문자열을 `;`를 기준으로 나눕니다. 
- 예제에서는 `;`가 없기 때문에 `['user_id=wnqiudgus1234']`라는 배열을 반환합니다.
- 여러 개의 쿠키 값이 있을 경우 각 쿠키를 구분할 수 있게 됩니다.

### 3. `map()`을 이용해 `=` 기준으로 분리

```javascript
cookieString.split(";")
    .map((cookie) => cookie.split("="))
// 결과: [['user_id', 'wnqiudgus1234']]
```

- `map((cookie) => cookie.split("="))`: 배열의 각 요소에 대해 `=` 문자를 기준으로 나눕니다.
- 여기서 `cookie`는 `user_id=wnqiudgus1234`이고, 이를 `=` 기준으로 나누면 `['user_id', 'wnqiudgus1234']`가 됩니다.
- 결과적으로 `[['user_id', 'wnqiudgus1234']]` 형태의 2차원 배열이 됩니다.

### 4. `reduce()`를 사용해 객체로 변환

```javascript
cookieString.split(";")
    .map((cookie) => cookie.split("="))
    .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {})
// 결과: { user_id: 'wnqiudgus1234' }
```

- `reduce()`는 배열을 순회하며 누적값을 생성하는 함수입니다.
- 여기서 `reduce`의 콜백 함수는 `(acc, [key, value]) => { ... }`입니다.
    - `acc`는 누적값으로, 각 단계에서 `{}`로 시작합니다.
    - `[key, value]`는 `map()`에서 변환된 `['user_id', 'wnqiudgus1234']`입니다.
  
#### 4.1: 첫 번째 (그리고 마지막 => 배열에 인덱스 [0]값 밖에 안담겼기 때문에 마지막이라고 하는거임) 순회

- `acc`: `{}` (초기값)
- `[key, value]`: `['user_id', 'wnqiudgus1234']`

```javascript
acc[key] = value;
// acc.user_id = 'wnqiudgus1234';
```

- `acc[key]`에 `value`를 할당합니다.
- `acc` 객체는 `{ user_id: 'wnqiudgus1234' }`로 업데이트됩니다.

#### 4.2: 반환

- `reduce`는 최종적으로 `{ user_id: 'wnqiudgus1234' }`를 반환합니다.

### 5. 결과 요약

```javascript
console.log(cookieObject);
// 결과: { user_id: 'wnqiudgus1234' }
```

- `split(";")`: 쿠키를 `;` 기준으로 분리 => ["user_id=wnqudgus1234"]
- `map((cookie) => cookie.split("="))`: `=` 기준으로 키와 값 분리 => [["user_id","wnqudgus1234"]]
- `reduce((acc, [key, value]) => {...})`: 각 `key`, `value` 쌍을 객체로 변환 => { user_id : "wnqudgus1234"}