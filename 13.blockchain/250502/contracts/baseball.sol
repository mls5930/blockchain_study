// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Baseball {
    address private owner; // 관리자 및 배포한 주체
    uint256 private progress; // 시도 횟수
    uint256 private random; // 랜덤으로 정해진 정답 숫자
    uint256 private reward; // 누적 보상금
    uint256 private constant GAME_COUNT = 10; // constant 는 값을 고정하고 가스비용절감
    uint256 private ticket = 10000000000000000;

    enum GameState {
        playing,
        gameOver
    }

    GameState public gameState;

    constructor(address _owner) {
        owner = _owner; // 배포자가 소유자
        progress = 0; // 초기 시도 횟수는 0
        reward = 0; // 초기 보상금 0
        gameState = GameState.playing;
        // 랜덤 정답 생성
        random = uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp,
                    block.prevrandao,
                    block.coinbase,
                    block.number
                )
            )
        );
        random = (random % 900) + 100; // 100~999 사이 숫자
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "can only owner");
        _;
    }
    // _value: 사용자가 입력한 숫자
    // 사용자가 입력한 숫자와 random을 비교할거임
    function gameStart(uint256 _value) public payable {
        require(progress < GAME_COUNT, "GameOver");
        require(gameState == GameState.playing, "GameOver");
        // 사용자가 입력한 숫자가 100 이상 1000 미만이어라
        // 10000000000000000 == 10000000000000000
        require(msg.value == ticket, "ticket amount error (0.01 ether)");
        require((_value >= 100) && (_value < 1000), "_value error (100 ~ 999)");
        // 몇 번 트라이 했는지?
        progress += 1;

        // 만약에 사용자가 맞추었으면 보상을 준다.
        if (_value == random) {
            // 해당 컨트랙트가 가지고 있는 ETH를 뜻함
            // 그게, 현재 쌓인 보상금(reward)보다 커야 함!
            require(reward <= address(this).balance);
            // 이더가 송수신될 수 있음을 나타내는 명시적 키워드 payable
            payable(msg.sender).transfer(address(this).balance);
            reward = 0;
            gameState = GameState.gameOver;
        } else {
            reward += msg.value;
        }
    }

    function getProgress() public view returns (uint) {
        return progress;
    }

    // get, set
    function getReward() public view returns (uint) {
        return reward;
    }

    // 정답은 소유자만 알 수 있음
    function getRandom() public view onlyOwner returns (uint) {
        return random;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getPlaying() public view returns (uint256) {
        uint256 playing = 0;
        // 게임의 상태가? GameState.playing과 다를 때
        // progress == GAME_COUNT 즉, 게임 종료일 때는
        if ((gameState != GameState.playing) || (progress == GAME_COUNT)) {
            playing = 1;
        }
        return playing;
    }
}
