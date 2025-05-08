<<<<<<< HEAD
// SPDX-License-Identifier:MIT
=======
// SPDX-License-Identifier: MIT
>>>>>>> eb24b80e3efe8ab572be6c20b3669d2afa02b2d8
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Baseball {
    address public owner;
    IERC20 public token;
    uint256 public constant GAME_COUNT = 10;
<<<<<<< HEAD
    uint256 public ticket = 100 * 10 ** 18; //100MTK
=======
    uint256 public ticket = 100 * 10 ** 18; // 100MTK;
>>>>>>> eb24b80e3efe8ab572be6c20b3669d2afa02b2d8
    uint256 public progress;
    uint256 public reword;
    uint256 private random;

    enum GameState {
        playing,
        gameOver
    }
<<<<<<< HEAD
=======

>>>>>>> eb24b80e3efe8ab572be6c20b3669d2afa02b2d8
    GameState public gameState;
    constructor(address tokenAddress) {
        owner = msg.sender;
        gameState = GameState.playing;
        token = IERC20(tokenAddress);
        random =
            (uint256(
                keccak256(
                    abi.encodePacked(
                        block.timestamp,
                        block.prevrandao,
                        block.number
                    )
                )
            ) % 900) +
            100;
    }

<<<<<<< HEAD
    // _value: 사용자가 입력한 숫자
    // 사용자가 입력한 숫자와 random을 비교할거임
=======
>>>>>>> eb24b80e3efe8ab572be6c20b3669d2afa02b2d8
    function gameStart(uint256 _value) public {
        require(progress < GAME_COUNT, "GameOver");
        require(gameState == GameState.playing, "GameOver");
        require((_value >= 100) && (_value < 1000), "_value error (100 ~ 999)");
        // 내가 아까 배포한 CA => MTK 토큰에 관련된 코드가 있겠죠? 그리고 토큰이 있습니다.
        bool success = token.transferFrom(msg.sender, address(this), ticket);
        require(success, "Ticket Payment failed. Approve first");
<<<<<<< HEAD
        // 내부적으로 권한을 인증하는것이 구현되어있슴.
        // 몇 번 트라이 했는지?
        progress += 1;
        reword += ticket;
=======
        // 몇 번 트라이 했는지?
        progress += 1;
        reword += ticket;

>>>>>>> eb24b80e3efe8ab572be6c20b3669d2afa02b2d8
        // 만약에 사용자가 맞추었으면 보상을 준다.
        if (_value == random) {
            token.transfer(msg.sender, reword);
            reword = 0;
            gameState = GameState.gameOver;
        } else if (progress == GAME_COUNT) {
            gameState = GameState.gameOver;
        }
    }

    function withdrawToOwner() public {
        require(msg.sender == owner, "Only owner");
        require(
            gameState == GameState.playing || progress >= GAME_COUNT,
            "Game not Over!!!"
        );
        require(reword > 0, "No reword");

        token.transfer(owner, reword);
        reword = 0;
    }
<<<<<<< HEAD
    function getReword() public view returns (uint256) {
        return reword;
    }
    function getProgeress() public view returns (uint256) {
        return progress;
    }
    function getPlaying() public view returns (uint256) {
        return gameState == GameState.playing ? 0 : 1;
    }
=======

    function getReword() public view returns (uint256) {
        return reword;
    }

    function getProgress() public view returns (uint256) {
        return progress;
    }

    function getPlaying() public view returns (uint256) {
        return gameState == GameState.playing ? 0 : 1;
    }

>>>>>>> eb24b80e3efe8ab572be6c20b3669d2afa02b2d8
    function getRandom() public view returns (uint256) {
        require(msg.sender == owner, "Only owner");
        return random;
    }
}
