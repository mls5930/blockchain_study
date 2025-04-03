# 수업

## 목표: 제네시스 블록을 구현

### 수업 흐름 요약

- **지난 시간**

  - 머클 트리 / 머클 루트 개념 학습 및 실습
  - 해시를 통해 데이터 무결성을 증명하는 구조 학습

- **이번 시간**

  - 타입스크립트를 활용해 **제네시스 블록**을 직접 구현
  - 블록 헤더, 블록 구조, 해시 연결의 실제 코드 구조 설계

---

### 디렉토리 구조 설명

```sh
250403/
├─ src/
│  ├─ core/                         # 블록체인의 핵심 기능 구현
│  │  ├─ _test/                         # 테스트 파일 모음
│  │  │  └─ block.test.ts                   # 블록 관련 유닛 테스트
│  │  ├─ block/                         # 블록 및 블록헤더 정의
│  │  │  ├─ block.ts                        # 블록 클래스 정의
│  │  │  └─ blockHeader.ts                  # 블록 헤더 정의 (이전 해시, 머클루트 등 포함)
│  │  ├─ crypto/                        # 암호 관련 기능 (해시 등)
│  │  │  └─ crypto.module.ts                # SHA256 등 해시 함수 모듈화
│  │  ├─ interface/                     # 공통 인터페이스 정의
│  │  │  ├─ block.interface.ts              # 블록 구조 타입 정의
│  │  │  └─ faillable.interface.ts          # 실패/예외 처리를 위한 인터페이스
│  │  └─ config.ts                      # 환경설정값, 제네시스 블록 정의 등
├─ jest.config.ts                       # Jest 테스트 환경 설정
├─ package.json                         # 의존성, 실행 스크립트 정의
├─ package-lock.json                    # 정확한 패키지 버전 기록
└─ tsconfig.json                        # 타입스크립트 컴파일 설정
```

문서를 수정해야 함.

해당 교안을 작성했던 교수님에게 여쭈어보니 순서가 좀 다름

## 기존에 내가 작성했던 순서

1.genesisBlock.md
2.genesisBlockInterface.md
3.genesisBlockData.md

## 변경된 순서

1.crypto.md
2.genesisBlock.md
3.genesisBlockInterface.md
4.genesisBlockData.md

변경된 순서는 위와 같습니다.

왜 이렇게 바뀌었나??
저번 시간에

- 머클 트리 / 머클 루트 개념 학습 및 실습
- 해시를 통해 데이터 무결성을 증명하는 구조 학습

이걸 진행했는데, 복습겸 다음과 같은 코드에 대해서 수업을 진행했습니다

```ts
class CryptoModule {
  // 우리가 블록을 생성할때 해시값을 받아서 2진수로 변환해서
  // 난이도 충족하는 값을 비교할때 사용할 2진수 값
  // 난이도가 2면 2진수 값이 앞에서부터 난이도의 갯수만큼 0이 포함되어있는지 검사를 해야함.
  static hashToBinary(hash: string): string {
    let binary: string = "";
    // 16 진수를 -> 2진수로 바꿀 식
    for (let i = 0; i < hash.length; i++) {
      // 반복문에서 현재 인덱스 2자리
      const hexByte = hash.substr(i, 2);

      // 16진수의 바이트를 10진수로 반환
      const dec = parseInt(hexByte, 16);

      // 10진수를 2진 문자열로 반환
      // 8자리로 고정 8자리가 안되면 앞자리 패딩
      const binaryByte = dec.toString(2).padStart(8, "0");

      // 현재의 2진 바이트를 최종 이진 문자열에 추가
      binary += binaryByte;
    }

    return binary;
  }
}

export default CryptoModule;
```

이거 먼저 빌드업을 진행한 후,

1. # 제네시스 블록
2. # 제네시스 블록 구조 – 인터페이스부터!
3. # `GENESIS` 객체 생성

예정대로 순서 진행해야 함.

```
250403
├─ 1.genesisBlock.md
├─ 2.genesisBlockInterface.md
├─ 3.genesisBlockHeader.md
├─ 4.genesisBlockBody.md
├─ 5.TDD.md
├─ 6.whyTDD.md
├─ 7.playTDD.md
├─ README.md
├─ jest.config.ts
├─ package-lock.json
├─ package.json
├─ src
│  └─ core
│     ├─ _test
│     │  └─ block.test.ts
│     ├─ block
│     │  ├─ block.ts
│     │  └─ blockHeader.ts
│     ├─ config.ts
│     ├─ crypto
│     │  ├─ crypto.module.ts
│     │  └─ mining.ts
│     └─ interface
│        ├─ block.interface.ts
│        └─ faillable.interface.ts
└─ tsconfig.json

```
