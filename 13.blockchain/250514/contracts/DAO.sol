// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DAO {
    // 안건은 어떻게 생겨먹음?
<<<<<<< HEAD
    // 앞에 하나 빼먹었음. 오늘들어갈 새로운 구조의 형태 => struct 5.struct
    // 메모리 의 개념 한번호출되면 사라짐
=======
    // 앞에 하나 빼먹었음. 오늘 들어갈 새로운 구조의 형태 => struct
>>>>>>> 194a7c37b861db9f7af4bce572d3e72974e2cbac
    address private chairperson;

    struct Proposal {
        string title;
        uint yes;
        uint no;
        bool finished;
        mapping(address => bool) voted;
    }

<<<<<<< HEAD
    uint private proposalCount = 0; //안건의 아이디 상태
=======
    uint private proposalCount = 0; // 안건의 아이디 상태
>>>>>>> 194a7c37b861db9f7af4bce572d3e72974e2cbac
    mapping(uint => Proposal) public proposal;
    /*
        proposal = {
            0: {
<<<<<<< HEAD
                title: "과연 교수님은 오마카세 살 수있는 권한이 있는가?",
                yes: 0
                no: 4
                voted: {
                    "0x..." false, //voted 는 예시
                    "0x..." false,
                    "0x..." false,
                    "0x..." false,
=======
                title: "고혜성의 프로틴을 빼앗을까?",
                yes: 2
                no: 0
                voted: {
                    "0x...": 1,
                    "0x...": 1,
>>>>>>> 194a7c37b861db9f7af4bce572d3e72974e2cbac
                }
            }
        }
    */

    // 배포했을 때
    constructor() {
        chairperson = msg.sender;
    }

<<<<<<< HEAD
    modifier onlychairoerson() {
        require(msg.sender == chairperson, "Only chairperson allowed");
        _;
    }
    // _title: "프로틴을 뺐어야한다"
    function createProposal(string memory _title) public onlychairoerson {
=======
    modifier onlyChairperson() {
        require(msg.sender == chairperson, "Only chairperson allowed");
        _;
    }
    // _title: 고혜성의 프로틴을 빼앗을까?
    function createProposal(string memory _title) public onlyChairperson {
>>>>>>> 194a7c37b861db9f7af4bce572d3e72974e2cbac
        // p 상태를 만들어볼거에요
        Proposal storage p = proposal[proposalCount++];
        p.title = _title;
    }
    // 지금 시점에서 안건이 열렸죠? 그리고 나 투표하고 싶어.
    // 그러면 vote를 진행시켜! 몇 번째 안건에 true 진행시켜
    function vote(uint _proposalId, bool _support) public {
<<<<<<< HEAD
        // 안건의 발행 수 => _proposalId 가 proposalCount 얘보다 크면 안됌
        require(_proposalId < proposalCount, "Invalid proposalId");
        Proposal storage p = proposal[_proposalId];
        // 안건이 진행중이어야만 한다.
        require(!p.finished, "proposal already finished");
        // 너 투표한거 맞아?
        require(!p.voted[msg.sender], "yoe Already voted");
=======
        // 안건의 발행 수 => _proposalId가 proposalCount 얘보다 크면 안됌
        require(_proposalId < proposalCount, "Invalid proposalId");
        Proposal storage p = proposal[_proposalId];
        // 안건이 진행중이어야만 한다.
        require(!p.finished, "Proposal already finished");
        // 너 투표 진행안한거 맞아?
        require(!p.voted[msg.sender], "you Already voted");
>>>>>>> 194a7c37b861db9f7af4bce572d3e72974e2cbac
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
<<<<<<< HEAD
        require(_proposalId < proposalCount, "Inbalid proposalId");
        // p상태를 다시 선언하려고 함.
=======
        require(_proposalId < proposalCount, "Invalid proposalId");
        // p 상태를 다시 선언하려고 함.
>>>>>>> 194a7c37b861db9f7af4bce572d3e72974e2cbac
        Proposal storage p = proposal[_proposalId];
        /*
            매개변수인 _proposalId가 0이라고 가정했을 때
            
            =>

<<<<<<< HEAD
            title: "고혜성 프로틴 뻈을까?",
            yes: 2,
            no: 0,
            vote : {
            "": true,
            "": true,
=======
            title: "고혜성 프로틴 뺏을까?",
            yes: 2,
            no: 0,
            vote : {
                "0x...": true,
                "0x...": true
>>>>>>> 194a7c37b861db9f7af4bce572d3e72974e2cbac
            }
        */
        title = p.title;
        yes = p.yes;
        no = p.no;
        if (p.finished) {
<<<<<<< HEAD
            result = (p.yes > p.no) ? "proposal passed" : "proposal Rejeted";
        } else {
            result = "Voting in progerss";
        }
    }

    function finishVote(uint _proposalId) public onlychairoerson {
        require(_proposalId < proposalCount, "Inbalid proposalId");
=======
            result = (p.yes > p.no) ? "Proposal passed" : "Proposal Rejeted";
        } else {
            result = "Voting in progress";
        }
    }

    function finishVote(uint _proposalId) public onlyChairperson {
        require(_proposalId < proposalCount, "Invalid proposalId");
>>>>>>> 194a7c37b861db9f7af4bce572d3e72974e2cbac
        Proposal storage p = proposal[_proposalId];
        require(!p.finished, "Already finished");
        p.finished = true;
    }
}
<<<<<<< HEAD
=======

// 51% 공격
>>>>>>> 194a7c37b861db9f7af4bce572d3e72974e2cbac
