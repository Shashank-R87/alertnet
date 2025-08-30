import { ethers } from "ethers";
import contractJson from "./ZoneAlert.json";

const provider = new ethers.WebSocketProvider(
  `wss://sepolia.infura.io/ws/v3/${process.env.EXPO_PUBLIC_INFURA_PROJECT_ID}`
);

const contract = new ethers.Contract(
  process.env.EXPO_PUBLIC_CONTRACT_ADDRESS,
  contractJson.abi,
  provider
);

/**
 * Sets up a listener for the "AlertPosted" event on the smart contract.
 * @param {(alertData) => void} onNewAlert - A callback function that will be
 * executed whenever a new alert is received. The function will be passed an

 * object containing the sender and message.
 * @returns {() => void} A cleanup function to be called to remove the listener.
 */

export const setupContractListener = (onNewAlert) => {
  console.log("Setting up contract listener...");

  const listener = (sender, message) => {
    console.log(`🔔 Alert from ${sender}: ${message}`);
    const alertData = {
      sender,
      message,
      timestamp: new Date(),
    };
    onNewAlert(alertData);
  };

  contract.on("AlertPosted", listener);

  return () => {
    console.log("Cleaning up contract listener...");
    contract.off("AlertPosted", listener);
  };
};