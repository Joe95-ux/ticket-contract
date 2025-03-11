import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying with:", deployer.address);
  console.log("Balance:", ethers.formatEther(await deployer.provider!.getBalance(deployer.address)), "ETH");

  const TicketTracker = await ethers.getContractFactory("TicketTracker");

  const feeData = await deployer.provider!.getFeeData();
  const gasPrice = feeData.gasPrice!;
  const gasLimit = 1_500_000; // Slightly above estimate

  console.log("Using Gas Price:", ethers.formatUnits(gasPrice, "gwei"), "GWEI");
  console.log("Setting Gas Limit:", gasLimit);

  const ticketTracker = await TicketTracker.deploy({
    gasPrice: gasPrice * 110n / 100n, // Add a 10% buffer
    gasLimit: gasLimit,
  });

  await ticketTracker.waitForDeployment();

  console.log(`TicketTracker deployed to: ${await ticketTracker.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
