# 오늘 뭐가 어려웠나?

## 학생 의견: difficulty랑 nonce가 이미 정답이 공개된거 아니냐.

블록이 생성되고 있어요. 다른 사람이 우리 블록의 속성을 볼 수 있어요?
=> 블록이 해킹될 수 있는거 아니에요?
=> 어렵다. 무지무지 어렵다.

1. nonce는 채굴을 하려고 시도한 횟수임. 즉, `블록 채굴 시작된다!`해서 nonce가 정해지는게 아님
2. 그렇다고, 남들이 내가 채굴하려고 하는 블록의 정보들을 볼 수 없음.

## 학생 의견: 왜 볼 수 없지?

네트워크 개념과 관련이 있음
특히 P2P

### 심화

1. 블록 후보를 생성한다
2. 이 때, 트랜잭션들을 고른다 누가? 노드들이
3. 로컬에서 가져온 후에 채굴을 시작한다.
4. 채굴이 되었다면 P2P 네트워크로 전 노드들에게 알린다.
5. 블록이 공식적으로 전 노드들에 의해서 검증이 되고 블록이 추가가 된다.

## 공부할 것

1. (학생 몫) socket에 대해서 공부해야 함 (P2P를 이해하기 위한 기초)

안하면 죽임

## 위의 내용 정리해서 보내줄게요....

## 블록 후보를 생성하잖아요? 그 때 노드들이 트랜잭션을 가지고 온다면서요. 그 정보들은 다 볼 수 있는거에요? 누가? 노드들이

볼 수 없어요.

### 트랜잭션을 어떻게 가지고 와요?

500만원
내가 조상아한테 100만원 보냄
내가 조상아한테 100만원 또 보냄

=> 새로운 값: 내가 조상아한테 200만원 보내려고 함.

절때 블록 후보를 생성하는 과정중에는 남들이 내 정보를 볼 수 없음.
=> 로컬
=> P2P
=> socket을 이해해야 함.
