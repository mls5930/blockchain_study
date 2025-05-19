// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// import CV1incterface.sol

contract Proxy {
    bytes32 public constant IMPL_SLOT = bytes32(uint(keccak256("IMPL")) - 1);
    bytes32 public constant ADMIN_SLOT = bytes32(uint(keccak256("ADMIN")) - 1);
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

    function getImpl() private view returns (address) {
        return Slot.getAddressSlot(IMPL_SLOT).value;
    }

    function setImpl(address _CA) public onlyOwner {
        Slot.getAddressSlot(IMPL_SLOT).value = _CA;
    }

    function delegate(address impl) private {
        assembly {
            calldatacopy(0, 0, calldatasize())

            let result := delegatecall(gas(), impl, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())

            switch result
            case 0 {
                revert(0, returndatasize())
            }
            default {
                return(0, returndatasize())
            }
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
        address value;
    }
    // Slot.getAddressSlot(IMPL_SLOT).value = _impl;
    function getAddressSlot(
        bytes32 _slotAddress
    ) internal pure returns (AddressSlot storage pointer) {
        assembly {
            pointer.slot := _slotAddress
        }
    }
}
