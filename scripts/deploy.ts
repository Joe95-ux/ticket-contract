import { ethers } from "hardhat";

async function main() {
  try {
    console.log("Starting deployment...");
    
    const TicketTracker = await ethers.getContractFactory("TicketTracker");
    console.log("Deploying contract...");
    
    const ticketTracker = await TicketTracker.deploy({
      gasLimit: 3000000,
      gasPrice: ethers.parseUnits("50", "gwei"), // Higher gas price for faster processing
    });

    console.log("Waiting for deployment...");
    await ticketTracker.waitForDeployment();

    const address = await ticketTracker.getAddress();
    console.log(`TicketTracker deployed to: ${address}`);
  } catch (error) {
    console.error("Deployment failed:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
