//SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./ERC20Mintable.sol";
contract MyToken is ERC20, ERC20Mintable {
  constructor(uint256 initialSupply) ERC20("StarDucks Capu-Token", "SCT") public {
    mint(msg.sender, initialSupply);
    _setupDecimals(0);
  }
}