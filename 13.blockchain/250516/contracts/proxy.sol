// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract proxy {
    bytes32 public constant IMPL_SLOT = bytes32(uint(keccak256("IMPL")) - 1); //CA 를 저장
    bytes32 public constant ADMIN_SLOT = bytes32(uint(keccak256("ADMIN")) - 1); // EOA를 저장

    constructor() {
        setOwner(msg.sender);
    }
    modifier onlyOwner() {
        require(getOwner() == msg.sender, "only Owner");
        _;
    }
    function getOwner() private view returns (address) {
        return Slot.getAddressSlot(ADMIN_SLOT).value;
    }
    function setOwner(address owner) private {
        Slot.getAddressSlot(ADMIN_SLOT).value = owner;
    }
    function getImpl() public view returns (address) {
        return Slot.getAddressSlot(IMPL_SLOT).value;
    }

    function setImpl(address _CA) public onlyOwner {
        Slot.getAddressSlot(IMPL_SLOT).value = _CA;
    }

    function delegate(address impl) private {
        // 저수준언어로 모든 CA 컨트렉트를 가져올게
        assembly {
            calldatacopy(0, 0, calldatasize())

            let result := delegatecall(gas(), impl, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())

            switch result
            case 0 {
                revert(0, returndatasize())
            } // 실패 0 을 반환
            default {
                return(0, returndatasize())
            } //성공
        }
    }

    fallback() external payable {
        delegate(getImpl());
    }
    receive() external payable {
        delegate(getImpl());
    }
}
// 외부에서 불러다 쓸 수 있는 재사용 가능한 함수 집합 정의
library Slot {
    struct AddressSlot {
        //타입명시
        address value;
    }
    //  Slot.getAddressSlot(IMPL_SLOT).alue = _impl;
    function getAddressSlot(
        bytes32 _slotAddress
    ) internal pure returns (AddressSlot storage pointer) {
        assembly {
            pointer.slot := _slotAddress
        }
    }
}
