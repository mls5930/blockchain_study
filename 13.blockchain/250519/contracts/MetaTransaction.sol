// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./MyToken.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/*
    사용자가 직접 트랜잭션을 날릴 수 없는 상황을 가정
    회사가 지갑을 가지고 있으니, 대신 하겠다. => 대신 실행하는 구조
*/
contract MetaTransaction {
    MyToken myToken;
    constructor(address _CA) {
        myToken = MyToken(_CA);
    }

    // 오늘 시나리오는 사실 목표가
    // 너네가 정의한 토큰을 ERC-20 토큰을 발행받고 싶어요!
    // 우리가 만든 저장소 => txpool에서 하나하나....가져와서 처리함
    // 10명의 사용자가(지갑 모름) 토큰을 받고 싶데!!
    // 토큰 발급 버튼이 존재하는데, 각 사용자마다 하나의 버튼을 누름
    // 이 때, mint라는 함수는 아직 실행이 안되어있어.
    // 근데 특정 분기점에 의해서 관리자가 mint를 딸깍함.

    function mint(
        address[] memory _address,
        uint[] memory token,
        string[] memory message,
        bytes[] memory signature
    ) public {
        // 유저들의 트랜잭션들을 하나씩 꺼내서 서명이 진짜 이 사용자가 만든게 맞는지 확인
        // 그럼 "순회"해야 할건데...
        for (uint256 i = 0; i < _address.length; i++) {
            signTransaction(_address[i], message[i], signature[i]);
            myToken.mint(_address[i], token[i]);
        }
    }

    // 대신 서명 => 여기서 구현할건데
    // 이 서명이 진짜 이 사용자가 만든 게 맞는가?
    function signTransaction(
        address user,
        string memory _msg,
        bytes memory signature
    ) public pure {
        // 메시지를 해시화 함. => 이더리움 전용 포맷
        bytes32 ethSign = getEthSignMsgHash(_msg);
        // 서명값을 => r, s, v로 추출
        (bytes32 r, bytes32 s, uint8 v) = splitSign(signature);
        // ecrecover => 서명에서 복원한 주소가 실제 사용자의 주소와 일치해야 통과
        // => 즉, 서명을 다시 v, r, s값으로 복원 user == 복원된
        require(user == ecrecover(ethSign, v, r, s));
    }

    // 메시지를 해시화하는 함수
    // 이더리움 표준 서명 포맷은 다음과 같음
    // "\x19Ethereum Signed Message:\n" + <length> + <message>
    function getEthSignMsgHash(
        string memory _msg
    ) internal pure returns (bytes32) {
        uint msgLength = bytes(_msg).length;
        return (
            keccak256(
                abi.encodePacked(
                    "\x19Ethereum Signed Message:\n",
                    Strings.toString(msgLength),
                    _msg
                )
            )
        );
    }

    function splitSign(
        bytes memory sign
    ) public pure returns (bytes32 r, bytes32 s, uint8 v) {
        // 정상적인 서명
        require(sign.length == 65, "signed not Invalid");

        // 저수준으로 표현하기 위해서 어셈블리
        // 다음 날 설명해야 할 수학적인 내용
        assembly {
            // sign 변수의 첫 바이트에서 32 바이트 할당
            r := mload(add(sign, 32))
            // sign 변수의 33번부터 32 바이트 할당
            s := mload(add(sign, 64))
            // 0번째부터 65번째 내용까지 할당
            v := byte(0, mload(add(sign, 96)))
        }

        // EIP-155 재생 공격 방지로 추가
        if (v < 27) {
            v += 27;
        }

        require(v == 27 || v == 28);
    }
}
