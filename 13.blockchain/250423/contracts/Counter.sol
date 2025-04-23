// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

// 비트코인과의 큰 차이점 => 상태를 가질 수 있어.
contract Counter {
    // 컨트랙트의 상태
    uint256 public count;
    // [타입] [접근제어자] [변수명] = 초기값
    // uint => 음수가 없는 정수 타입을 의미해요.
    // uint0, uint64, uint128, uint256
    // 가스와 연관이 있다.

    constructor() {
        count = 0;
    }

    // 플러스 버튼에 들어갈 함수
    function increment() public {
        count += 1;
    }

    function getCount() public view returns (uint256) {
        return count;
    }
}
