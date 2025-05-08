// SPDX-License-identifier: MIT

pragma solidity ^0.8.20;
// uint => uint256
interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function approve(address spender, uint256 value) external returns (bool);
    function allowance(
        address from,
        address spender
    ) external returns (uint256);

    function transferFrom(
        address spender,
        address to,
        uint256 amount
    ) external returns (bool);
    event Approval(address from, address to, uint256 value);
    event Transfer(address from, address spender, uint256 value);
}
