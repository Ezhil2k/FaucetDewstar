
const hre = require("hardhat");

async function main() {

  const FaucetDewstar = await hre.ethers.getContractFactory("FaucetDewstar");
  console.log("GOT CONTRACT");
  const faucetDewstar = await FaucetDewstar.deploy("0xf1fB7eceD0C955A7c00c369B911A988f0677CC1c");
  console.log("DEPLOYING CONTRACT");
  await faucetDewstar.waitForDeployment();
  
  console.log("FaucetDewstar address is :", faucetDewstar.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });