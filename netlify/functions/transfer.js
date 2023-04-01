const { schedule } = require("@netlify/functions");
require("dotenv").config()
import * as zksync from "zksync-web3";
import { Wallet, utils } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const PRIVATE_KEY_1 = "e29a306dfb592e3f71a0172f1eab3a267f1c60c9bbe25ad9864dc05dfcfd5abd";
const PRIVATE_KEY_2 = "e0a57ed710bb8d8fb132b3b953cf50d7bdeccb3a4306dc8d0a81acb4b58c97e7";

const zkSyncProvider = new zksync.Provider("https://zksync2-testnet.zksync.dev");
const ethereumProvider = ethers.getDefaultProvider("goerli");
const wallet1 = new Wallet(PRIVATE_KEY_1, zkSyncProvider, ethereumProvider);
const wallet2 = new Wallet(PRIVATE_KEY_2, zkSyncProvider, ethereumProvider);

async function main() {
    const USDC_L2_ADDRESS = "0x852a4599217e76aa725f0ada8bf832a1f57a8a91";
    
  // Get balance in USDC for wallet1
  const usdcBalance1 = await wallet1.getBalance(USDC_L2_ADDRESS);
  console.log("Wallet 1 USDC balance:", usdcBalance1.toString());

  // Get balance in ETH for wallet1
  const ethBalance1 = await wallet1.getBalance();
  const balanceEther1 = ethers.utils.formatEther(ethBalance1);
  console.log("Wallet 1 ETH balance:", balanceEther1);

  // Get number of transactions for wallet1
  const wallet1Nonce = await wallet1.getNonce();
  console.log("Wallet 1 transactions:", wallet1Nonce.toString());

  // Get balance in USDC for wallet2
  const usdcBalance2 = await wallet2.getBalance(USDC_L2_ADDRESS);
  console.log("Wallet 2 USDC balance:", usdcBalance2.toString());

  // Get balance in ETH for wallet2
  const ethBalance2 = await wallet2.getBalance();
  const balanceEther2 = ethers.utils.formatEther(ethBalance2);
  console.log("Wallet 2 ETH balance:", balanceEther2);

  // Get number of transactions for wallet2
  const wallet2Nonce = await wallet2.getNonce();
  console.log("Wallet 2 transactions:", wallet2Nonce.toString());

  // We transfer 0.01 ETH to the recipient and pay the fee in USDC
    const transferHandle = wallet1.transfer({
        to: wallet2.address,
        amount: ethers.utils.parseEther("0.001"),
    });
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

exports.handler = schedule("@hourly", handler)
