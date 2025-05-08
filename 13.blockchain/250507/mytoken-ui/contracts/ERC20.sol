// SPDX-LICENSE-Identifier: MIT
pragma solidity ^0.8.20;
import "./IERC20.sol";
//npx truffle migrate

contract ERC20 is IERC20 {
    address private owner;
    string public name;
    string public symbol;
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint) public balances;
    // 권한 위임 받은 것들 목록
    /*
        _allowances: {
            0x8E43AEbaa5eBb31D4cdd4F14D33c3166F216caBe:{
            0xf63D6E61D751aecD8028C167D094F6e6661489a2: 1000token
            },
            유정님주소: {
                0x8E43AEbaa5eBb31D4cdd4F14D33c3166F216caBe: 2000token
            }
        }
    */
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
        // 단순히 토큰을 가지고있는 A가 B한테 100토큰을 보낼거임
        /*
            1. A는 토큰 그만큼 가지고 있음?
            2. 가지고 있으면 A의 토큰은 차감할게
            3. A의 토큰을 차감한 만큼 B의 토큰을 증가시킬게
            4. ㅇㅋ 이벤트 보낼게
            5. 성공했다고 true 반환할게!
        */
        require(balances[msg.sender] >= amount, "INsufficient balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
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
    function allowance(
        address from,
        address spender
    ) external view override returns (uint256) {
        return _allowances[from][spender];
    }

    function transferFrom(
        address spender,
        address to,
        uint amount
    ) external returns (bool) {
        // 마 너 권한 목록에 권한 넘겨주었나?
        require(
            _allowances[spender][msg.sender] >= amount,
            "Insufficient allowance"
        );
        // 마 그럼 권한 준 만큼의 토큰도 가지고 있나?
        require(balances[spender] >= amount, "Insufficient balance");
        // 마 그럼 권한 목록의 토큰값 뺼게
        _allowances[spender][msg.sender] -= amount;
        // 그리고 너가 가지고 있는 토큰도 차감할께
        balances[to] += amount;

        emit Transfer((spender), to, amount);
        return true;
    }
}
