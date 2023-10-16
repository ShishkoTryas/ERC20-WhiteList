const hre = require("hardhat");

async function main() {
  const myToken = await hre.ethers.deployContract("MyToken");
  await myToken.waitForDeployment();
  console.log("MyToken address: ", await myToken.getAddress());

  const contractAddress = "0xC00354686F11BFE4296bAc53950e66a07a700aB4";
  const signer = await hre.ethers.provider.getSigner();
  const ABI = [{"inputs":[{"internalType":"contract MyToken","name":"token_","type":"address"}],"name":"validate","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
  const contract = new hre.ethers.Contract(contractAddress, ABI, signer);

  const changeOwnerTx = await myToken.transferOwnership(await contract.getAddress());
  await changeOwnerTx.wait();

  const isValid = await contract.validate(await myToken.getAddress());
  await isValid.wait();
  if (isValid) {
    console.log("Validation successful.");
  } else {
    console.log("Validation failed.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
