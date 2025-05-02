// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Baseball {
    uint256 private progress = 10; // 시도횟수
    address private owner; // 관리자 및 배포한 주체
    uint256 private random; // 정답 숫자
    uint256 private reward; // 누적 보상금
    uint256 private ticket; // 티켓값
    uint256 private gameState = 0; // 게임종료 progress 초기화
    mapping(address => bool) public addressticket; //티켓 사용자

    event winOrDefeat(string state);

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

    modifier gameOver() {
        require(gameState == 1, "game over");
        _;
    }

    function setTicket() public payable {
        if (!addressticket[msg.sender]) {
            require(msg.value >= 0.01 ether, "ticket fee required");
            addressticket[msg.sender] = true;
            ticket += msg.value;
        } else if (progress > 10) {
            addressticket[msg.sender] = false;
            gameState = 0;
            progress = 0;
        }
    }

    function gameStart(uint256 _value) public payable gameOver {
        require((_value >= 100) && (_value < 1000), "_value error (100~999)");
        progress += 1;
        if (_value == random) {
            require(reward <= address(this).balance);
            payable(msg.sender).transfer(address(this).balance);
            reward = 0;
            gameState = 0;
            emit winOrDefeat("success");
        } else {
            reward += msg.value;
            emit winOrDefeat("defeat");
        }
    }

    function getTicket() public view returns (uint256) {
        return ticket;
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
