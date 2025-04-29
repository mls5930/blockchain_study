// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Baseball {
    uint256 private progress = 10;
    address private owner;

    function getProgress() public view returns (uint) {
        return progress;
    }
    // view와 pure의 공통점은 상태를 변화시키지 않겠다는 명시적 선언
    // function setProgress() public view {
    //     progress = 11;
    // }
    function setprogress() public {
        uint result = add(1, 2);
        progress = result;
    }
    // pure와 view의 차이
    function add(uint a, uint b) public pure returns (uint) {
        return a + b;
    }
}
