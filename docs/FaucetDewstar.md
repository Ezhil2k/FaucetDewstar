# Solidity API

## IERC20

### transfer

```solidity
function transfer(address to, uint256 value) external returns (bool)
```

### balanceOf

```solidity
function balanceOf(address account) external view returns (uint256)
```

### Transfer

```solidity
event Transfer(address from, address to, uint256 value)
```

## FaucetDewstar

### owner

```solidity
address payable owner
```

### token

```solidity
contract IERC20 token
```

### withdrawalAmount

```solidity
uint256 withdrawalAmount
```

### timegate

```solidity
uint256 timegate
```

### nextAccessTime

```solidity
mapping(address => uint256) nextAccessTime
```

### Withdraw

```solidity
event Withdraw(address to, uint256 amount)
```

### Deposit

```solidity
event Deposit(address from, uint256 amount)
```

### constructor

```solidity
constructor(address tokenAddress) public payable
```

### requestTokens

```solidity
function requestTokens() public
```

### receive

```solidity
receive() external payable
```

### getBalance

```solidity
function getBalance() external view returns (uint256)
```

### drainFaucet

```solidity
function drainFaucet() public
```

### setWithdrawAmount

```solidity
function setWithdrawAmount(uint256 _amount) public
```

### setTimeGate

```solidity
function setTimeGate(uint256 _time) public
```

### onlyOwner

```solidity
modifier onlyOwner()
```

