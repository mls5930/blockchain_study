// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DAO {
    address private chairperson;

    string public membersmsg = "";
    uint private count = 0;
    struct Proposal {
        string title;
        uint yes;
        uint no;
        bool finished;
        mapping(address => bool) voted;
    }

    uint private proposalCount = 0;
    mapping(uint => Proposal) public proposal;

    uint private memberCount;
    mapping(address => bool) private members;

    constructor(address owner) {
        chairperson = owner;
        // 의장도 멤버다.
        members[owner] = true;
        memberCount++;
    }

    modifier onlyChairperson() {
        require(msg.sender == chairperson, "Only chairperson allowed");
        _;
    }

    modifier onlyMember() {
        require(members[msg.sender], "you not Member!");
        _;
    }

    // 멤버로 승인해줘야하는 함수
    function setMember(address _address) public onlyChairperson {
        // 멤버로 승인
        members[_address] = true;
        memberCount += 1;
    }

    function createProposal(string memory _title) public onlyChairperson {
        Proposal storage p = proposal[proposalCount++];
        p.title = _title;
    }

    function vote(uint _proposalId, bool _support) public onlyMember {
        require(_proposalId < proposalCount, "Invalid proposalId");
        Proposal storage p = proposal[_proposalId];
        require(!p.finished, "Proposal already finished");
        require(!p.voted[msg.sender], "you Already voted");
        p.voted[msg.sender] = true;

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
        Proposal storage p = proposal[_proposalId];
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
