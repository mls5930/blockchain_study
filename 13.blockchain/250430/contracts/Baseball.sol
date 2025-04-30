// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Baseball {
    uint256 private progress = 10; // 시도횟수
    address private owner; // 관리자 및 배포한 주체
    uint256 private random; // 정답 숫자
    uint256 private reward; // 누적 보상금

    constructor(address _owner) {
        owner = _owner;
        // 사용자가 랜덤 숫자를 맞추어야 함.
        // 랜덤한 숫자를 랜덤으로 정해야 함.
        progress = 0;
        reward = 0;

        random = uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp, //블록이 생성된 시간
                    block.prevrandao, // 이전 블록의 난수 값
                    block.coinbase, // 블록을 만든 노드 주소
                    block.number // 현재 블록 번호
                )
            )
        );
        random = (random % 900) + 100; // 100~999 숫자
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "can only owner");
        _;
    }

    // _value: 사용자가 입력한 숫자
    // 사용자가 입력한 숫자와 random을 비교할거임
    // payable 은 보상
    function gameStart(uint256 _value) public payable {
        // 사용자가 입력한 숫자가 100 이상 1000미만 이여라
        require((_value >= 100) && (_value < 1000), "_value error (100~999)");
        // 몇 번 트라이 했는지?
        progress += 1;

        // 만약에 사용자가 맞추었으면 보상을 준다.
        if (_value == random) {
            // 해당 컨트랙트가 가지고 있는 ETH를 뜻함
            // 그게, 현재 쌓인 보상금(rewaed)보다 커야 함!
            require(reward <= address(this).balance);
            // 이더가 송수신될 수 있음을 나타내는 명시적 키워드 payable
            payable(msg.sender).transfer(address(this).balance);
            reward = 0;
        } else {
            reward += msg.value;
        }
    }

    function getProgress() public view returns (uint) {
        return progress;
    }
    function getReward() public view returns (uint) {
        return reward;
    }

    function getRandom() public view onlyOwner returns (uint) {
        return random;
    }
}
