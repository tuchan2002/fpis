const fs = require('fs');
const path = require('path');

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const contracts = await ethers.deployContract("FPIS");

  const contractAddress = await contracts.getAddress();
  console.log("Contracts address:", contractAddress);
  fs.writeFileSync(path.join(__dirname, '..', "shared_folder/contract-address.txt"), contractAddress);

  const data = fs.readFileSync(path.join(__dirname, '..', "artifacts/contracts/fpis.sol/FPIS.json"), 'utf8');
  const contractABI = JSON.parse(data).abi
  fs.writeFileSync(path.join(__dirname, '..', "shared_folder/contract-abi.json"), JSON.stringify(contractABI));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
