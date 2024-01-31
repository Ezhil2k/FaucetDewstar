
const hre = require("hardhat");

async function main() {

  const FaucetDewstar = await hre.ethers.getContractFactory("FaucetDewstar");
  console.log("GOT CONTRACT");
  const faucetDewstar = await FaucetDewstar.deploy("0x9905bA4865dB402a4EB05118A1e8860B465AFA7e");
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