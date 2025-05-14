// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DAO {
    // 안건은 어떻게 생겨먹음?
    // 앞에 하나 빼먹었음. 오늘 들어갈 새로운 구조의 형태 => struct
    address private chairperson;

    struct Proposal {
        string title;
        uint yes;
        uint no;
        bool finished;
        mapping(address => bool) voted;
    }

    uint private proposalCount = 0; // 안건의 아이디 상태
    mapping(uint => Proposal) public proposal;
    /*
        proposal = {
            0: {
                title: "고혜성의 프로틴을 빼앗을까?",
                yes: 2
                no: 0
                voted: {
                    "0x...": 1,
                    "0x...": 1,
                }
            }
        }
    */

    // 배포했을 때
    constructor() {
        chairperson = msg.sender;
    }

    modifier onlyChairperson() {
        require(msg.sender == chairperson, "Only chairperson allowed");
        _;
    }
    // _title: 고혜성의 프로틴을 빼앗을까?
    function createProposal(string memory _title) public onlyChairperson {
        // p 상태를 만들어볼거에요
        Proposal storage p = proposal[proposalCount++];
        p.title = _title;
    }
    // 지금 시점에서 안건이 열렸죠? 그리고 나 투표하고 싶어.
    // 그러면 vote를 진행시켜! 몇 번째 안건에 true 진행시켜
    function vote(uint _proposalId, bool _support) public {
        // 안건의 발행 수 => _proposalId가 proposalCount 얘보다 크면 안됌
        require(_proposalId < proposalCount, "Invalid proposalId");
        Proposal storage p = proposal[_proposalId];
        // 안건이 진행중이어야만 한다.
        require(!p.finished, "Proposal already finished");
        // 너 투표 진행안한거 맞아?
        require(!p.voted[msg.sender], "you Already voted");
        // 너 진행했어! 딴말하기 없어! 기록에 다 남아!
        p.voted[msg.sender] = true;

        // _support = true ? p.yes += 1 : p.no += 1;
        if (_support) {
            p.yes += 1;
        } else {
            p.no += 1;
        }
    }

    function getResult(
        uint _proposalId
    )
        public
        view
        returns (string memory title, uint yes, uint no, string memory result)
    {
        require(_proposalId < proposalCount, "Invalid proposalId");
        // p 상태를 다시 선언하려고 함.
        Proposal storage p = proposal[_proposalId];
        /*
            매개변수인 _proposalId가 0이라고 가정했을 때
            
            =>

            title: "고혜성 프로틴 뺏을까?",
            yes: 2,
            no: 0,
            vote : {
                "0x...": true,
                "0x...": true
            }
        */
        title = p.title;
        yes = p.yes;
        no = p.no;
        if (p.finished) {
            result = (p.yes > p.no) ? "Proposal passed" : "Proposal Rejeted";
        } else {
            result = "Voting in progress";
        }
    }

    function finishVote(uint _proposalId) public onlyChairperson {
        require(_proposalId < proposalCount, "Invalid proposalId");
        Proposal storage p = proposal[_proposalId];
        require(!p.finished, "Already finished");
        p.finished = true;
    }
}

// 51% 공격
