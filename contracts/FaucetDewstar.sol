    // FaucetDewstar contract
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.20;

    interface IERC20 {
        function transfer(address to, uint256 value) external returns (bool);
        function balanceOf(address account) external view returns (uint256);
        event Transfer(address indexed from, address indexed to, uint256 value);
    }
    contract FaucetDewstar {
        address payable public owner;
        IERC20 public token;

        uint256 public withdrawalAmount = 100 * (10**18);
        uint256 public timegate = 1 minutes;
        
        mapping(address => uint256) nextAccessTime;

        event Withdraw(address indexed to, uint256 indexed amount);
        event Deposit(address indexed from, uint256 indexed amount);
        constructor(address tokenAddress) payable {
            token = IERC20(tokenAddress);
            owner = payable(msg.sender);
        }

        function requestTokens() public {
            require(msg.sender != address(0),"Request must not be from the zero account");
            require(token.balanceOf(address(this)) >= withdrawalAmount,"Insufficient balance in the faucet");
            require(block.timestamp >= nextAccessTime[msg.sender],"Insufficient time elapsed since last request");
            
            nextAccessTime[msg.sender] = block.timestamp + timegate;

            token.transfer(msg.sender,withdrawalAmount);
        }

        receive() external payable {
            emit Deposit(msg.sender, msg.value);       
        }

        function getBalance() external view returns (uint256) {
            return token.balanceOf(address(this));
        }

        function drainFaucet() public onlyOwner {
            emit Withdraw(owner, token.balanceOf(address(this)) );
            token.transfer(owner, token.balanceOf(address(this)));
        }

        function setWithdrawAmount(uint256 _amount) public onlyOwner {
            withdrawalAmount = _amount * (10**18);
        }

        function setTimeGate(uint256 _time) public onlyOwner {
            timegate = _time * 1 minutes;
        }
        modifier onlyOwner {
            require(msg.sender == owner, "only the owner can call this function");
            _;
        }
    }