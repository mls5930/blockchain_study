## 오늘 뭐가 어려웠어

`useContext`

- 처음뵙겠습니다 ㅎㅎ

=> 전역에서 컴포넌트를 사용하겠다. => 상태도 같이

다음과 같이 생각하면 편하다.

```jsx
const ParentApp = ({children}) => {
  const [a, setA] = useState()
  return (
    <>
      {children}
    </>
  )
}
```

### App.jsx 컴포넌트 수정

```jsx

function App() {
  return (
    <ParentApp>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Header/>}/>
        </Routes>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/counter' element={<Counter/>}/>
          <Route path='/counter2' element={<CounterUseMemo2/>}/>
          <Route path='/counter3' element={<CounterUseCallback/>}/>
        </Routes>
      </BrowserRouter>
    </ParentApp>
  );
}
```

- 위로 봤을 때, 정확하지 않지만, 전역 컴포넌트를 하나 더 만든거임
- 근데 이제 어떤 컴포넌트든 전역 상태에 접근이 가능한

### 자습서 보는거 추천

https://ko.react.dev/learn/passing-data-deeply-with-context

