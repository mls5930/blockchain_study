## 상아님

## 데이터 설계

어떠한 데이터를 상태로 만들어서 관리할 것인가?

- 입력값
- list

useState가 2개 정도 있으면 좋겠어.
일단, Create가 어렵다면, list먼저 나오게끔.

```js
const list = [
    {
        content: "내용",
        created_at: "2025-02-26"
    }
]
```

자. list했으면 이제 입력값을 `관리`해야겠네?  

```js
const content = "내용"
```

그리고 상태를 관리할 이벤트 핸들러 함수 하나가 필요해

handleInputChange
handleSubmit

```js
const list = [
    {
        content: content,
        created_at: "2025-02-26"
    }
]
```

```js
    const newList = [
        {
            id: 3,
            content: "드가자",
            created_at: "2025-02-26"
        },
        {
            id: 2,
            content: "드가자",
            created_at: "2025-02-26"
        },
        {
            id: 1,
            content: "야호",
            created_at: "2025-02-26"
        }
    ]
```

### Q. index key값 공식문서에서는 배열 메서드에서 제공해주는 index값을
### key값으로 넣으면 좋지 않다고 나와있어요.

맞습니다.
근데 왜요??

내가 추적할 수 있는 `id` 값이어야 함.

## 유정님



## 혜성님

네이밍 컨벤션이나 규칙

```jsx
    <form onSubmit={commentList}>
        <input 
            type="text" value={input}  
            placeholder="댓글 입력" 
            onChange={commentUpdate}>
        </input>
        <button type="submit">등록</button>
    </form>
```

- 초기값

```js
    const newcomment = {
        userid:"rhgPtjd",
        constent: {input},
        date: "02/26"
    }
```

- js, jsx 빼고 봐도 태그 사용 잘못함
- 거의 다 짜놓고 정적인 값을 화면 출력


```jsx
    {list.map((value,index)=> {
            return(
                <li key={index}> {value.userid}</li>
            )
        })
    }
```

## 혜성님 의견

정적인 값을 화면에 출력하는건 알고 있었는데, 자신이 쓴게 아님.
JSX => 자바스크립트 XML 확장된 문법  
=> return() 자바스크립트에 태그를 작성할 수 있다.  

어? 했던 이유

아까말씀하신 리턴이랑

왜 리턴안썼지? 


```jsx
  {list.map(() => (
        <>
            <div>리스트 나올 화면</div>,
            <div>리스트 나올 화면</div>,
            <div>리스트 나올 화면</div>
        </>
    ))}
```

아까 `,` 사용했음

콤마가 중요한게 아니라, JSX 문법 즉, 자스의 영역과 HTML의 영역이 제대로 구분이 안되는 것