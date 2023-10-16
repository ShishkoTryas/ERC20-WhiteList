// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

interface IWhitelist {
    function addToWhitelist(address candidate) external;
    function removeFromWhitelist(address candidate) external;
}