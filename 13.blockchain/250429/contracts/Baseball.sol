// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Baseball {
    uint256 private progress = 10;
    address private owner;

    function getProgress() public view returns (uint) {
        return progress;
    }
    // view 와 pure의 공통점은 상태를 변화시키지 않겠다는 명시적 선언
    // function setProgress() public {
    //     progress = 11;
    // }

    // pure와 view의 차이
    // view는 사용하지 못함 pure는 순수 계산만 하고 상태는 변화시키지 않음
    // 여기서 상태란 progress 나 owner 전역에 선언된 상태
    // set함수
    function add(uint a, uint b) public pure returns (uint) {
        return a + b;
    }
}
