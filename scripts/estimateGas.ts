import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying with:", deployer.address);
  console.log("Balance:", ethers.formatEther(await deployer.provider!.getBalance(deployer.address)), "ETH");

  const TicketTracker = await ethers.getContractFactory("TicketTracker");
  const deployTx = await TicketTracker.getDeployTransaction();

  // Estimate the gas required
  const estimatedGas = await deployer.provider!.estimateGas({
    data: deployTx.data,
    from: deployer.address,
  });

  const gasPrice = await deployer.provider!.getFeeData();
  
  console.log("Estimated Gas:", estimatedGas.toString());
  console.log("Estimated Cost:", ethers.formatEther(estimatedGas * gasPrice.gasPrice!), "ETH");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
