// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "./tokens/BaseToken.sol";
import "./access/Ownable.sol";


contract MyToken is BaseToken("My Token", "MT", 4), Ownable(msg.sender) {

    function mintTo(address account, uint256 amount) external override onlyOwner {
        _whitelist[account] = true;
        _mint(account, amount);
        _whitelist[account] = false;
    }

    function addToWhitelist(address candidate) external override onlyOwner {
        require(candidate != address(0), "Address 0");
        _whitelist[candidate] = true;
    }

    function removeFromWhitelist(address candidate) external override onlyOwner {
        require(candidate != address(0), "Address 0");
        _whitelist[candidate] = false;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override {
        require(to.code.length == 0 || _whitelist[to]);
    }
}