// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.20;

contract Jobs {
    struct Job {
        address author;
        address worker;
        string description;
        uint price;
        bool isFinished;
    }

    Job[] jobs;

    event jobAdded(
        address indexed author,
        string description,
        uint price,
        uint id,
        bool isFinished
    );
    event jobTaken(address indexed worker, uint id);
    event jobIsFinishedAndPaid(
        address indexed author,
        address indexed worker,
        uint id,
        uint pricePaid
    );

    function addJob(string calldata _description) external payable {}

    function takeJob(uint _id) external {}

    function setIsFinishedAndPay(uint _id) external {}
}