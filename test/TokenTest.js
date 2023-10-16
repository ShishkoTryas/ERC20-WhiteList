const hre = require("hardhat");
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Token", async function() {
    async function deployFixture() {
        const [owner, user1] = await hre.ethers.getSigners();
        const myToken = await hre.ethers.deployContract("MyToken");
        return { myToken, owner, user1 };
    }

    it('Should properly deploy contract', async function () {
        const { myToken } = await loadFixture(deployFixture);
        console.log("myToken deploy at address: ", await myToken.getAddress())
        expect(await myToken.getAddress()).to.exist;
    });

    it('should properly change owner', async function () {
        const { myToken, user1 } = await loadFixture(deployFixture);
        console.log("Owner after deploy: ",await myToken.owner());
        await myToken.transferOwnership(await user1.getAddress());
        console.log("Owner after transferOwnership", await myToken.owner());
        expect(await myToken.owner()).to.equal(await user1.getAddress());
    });

    it('should properly add to whitelist and remove', async function () {
        const { myToken, owner, user1 } = await loadFixture(deployFixture);
        await myToken.connect(owner).addToWhitelist(await user1.getAddress());
        expect(await myToken.isMember(await user1.getAddress())).to.equal(true);
    });

    it('should properly mint tokens', async function () {
        const { myToken, owner, user1 } = await loadFixture(deployFixture);
        console.log("Owner Balances before mint: ", await myToken.balanceOf(await owner.getAddress()));
        await myToken.connect(owner).mintTo(await owner.getAddress(), 10000);
        console.log("Owner Balances after mint: ", await myToken.balanceOf(await owner.getAddress()));
        expect(await myToken.balanceOf(await owner.getAddress())).to.equal(10000);
    });
});