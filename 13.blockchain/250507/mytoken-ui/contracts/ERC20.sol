// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./IERC20.sol";

contract ERC20 is IERC20 {
    address private owner;
    string public name;
    string public symbol;
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint) public balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    constructor(string memory _name, string memory _symbol, uint256 _amount) {
        owner = msg.sender;
        name = _name;
        symbol = _symbol;
        _mint(_amount * (10 ** decimals));
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "can onlyOwner");
        _;
    }

    function _mint(uint amount) internal {
        balances[msg.sender] += amount;
        totalSupply += amount;
    }

    function transfer(
        address to,
        uint256 amount
    ) external override returns (bool) {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
        // 안타 날렸음! 보상 받았음! 누가 받았음!
        return true;
    }
    // 권한 위임
    function approve(
        address spender,
        uint256 amount
    ) external override returns (bool) {
        _allowances[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }
    // 권한 위임 목록 단순 반환 (조회용)
    function allowance(
        address from,
        address spender
    ) external view override returns (uint256) {
        return _allowances[from][spender];
    }

    function transferFrom(
        address spender,
        address to,
        uint256 amount
    ) external override returns (bool) {
        // 마 너 권한 목록에 권한 넘겨주었나?
        require(
            _allowances[spender][msg.sender] >= amount,
            "Insufficient allowance"
        );
        // 마 그러면 너 권한 준 만큼의 토큰도 가지고 있나?
        require(balances[spender] >= amount, "Insufficient balance");
        // 마 그럼 권한 목록의 토큰값 뺄게
        _allowances[spender][msg.sender] -= amount;
        // 그리고 너가 가지고 있는 토큰도 차감할께
        balances[spender] -= amount;
        // 토큰 차감한 만큼 to에게 토큰 더할게
        balances[to] += amount;

        emit Transfer(spender, to, amount);
        return true;
    }
}
