//SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./Crowdsale.sol";
import "./KYCContract.sol";

contract MyTokenSale is Crowdsale {

  KYCContract kyc;

  /**
   * rate in TKNbits
   */
  constructor(uint256 rate, address payable wallet, IERC20 token, KYCContract _kyc) Crowdsale(rate, wallet, token) public {
    kyc = _kyc;
  }

  function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override {
    super._preValidatePurchase(beneficiary, weiAmount);
    require(kyc.kycCompleted(_msgSender()), "KYC is not completed, purchase isn't allowed");
  }
  

}