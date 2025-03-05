import { useState, useEffect } from "react";
import Web3 from "web3";
import DonationContract from "../../../../build/contracts/Donation.json";

const CONTRACT_ADDRESS = "0x1dA18C0ab31C330E1975399cF6a3A72734A44EA2";

export const DonateContract = () => {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState<string>("0");
  const [donors, setDonors] = useState<string[]>([]);
  const [randomDonor, setRandomDonor] = useState<string | null>(null);

  useEffect(() => {
    fetchBalance();
    fetchDonors();
  }, []);

  const checkMetaMask = () => {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      throw new Error("MetaMask is not installed");
    }
  };

  const fetchBalance = async () => {
    try {
      checkMetaMask();
      const web3 = new Web3(window.ethereum);
      const donationContract = new web3.eth.Contract(DonationContract.abi as any, CONTRACT_ADDRESS);

      const balanceWei: bigint = await donationContract.methods.getBalance().call();
      const balanceEth = web3.utils.fromWei(balanceWei.toString(), "ether");
      setBalance(balanceEth);
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  };

  const fetchDonors = async () => {
    try {
      checkMetaMask();
      const web3 = new Web3(window.ethereum);
      const donationContract = new web3.eth.Contract(DonationContract.abi as any, CONTRACT_ADDRESS);

      const donorsList = await donationContract.methods.getDonors().call();

      if (Array.isArray(donorsList)) {
        setDonors(donorsList);
      } else {
        console.error("Received data is not an array:", donorsList);
      }
    } catch (error) {
      console.error("Failed to fetch donors:", error);
    }
  };

  const pickRandomDonor = async () => {
    if (donors.length === 0) {
      alert("No donors available.");
      return;
    }
  
    try {
      setLoading(true);

      const web3 = new Web3(window.ethereum);
      const donationContract = new web3.eth.Contract(DonationContract.abi as any, CONTRACT_ADDRESS);
  
      const balanceWei: bigint = await donationContract.methods.getBalance().call();
      const balanceEth = web3.utils.fromWei(balanceWei.toString(), "ether");
  
      if (parseFloat(balanceEth) < 0.02) {
        alert("Insufficient balance to start the lottery");
        return;
      }

  
      const randomIndex = Math.floor(Math.random() * donors.length);
      const winner = donors[randomIndex];
      setRandomDonor(winner);
  
      const accounts = await web3.eth.getAccounts();
  
      await donationContract.methods.withdrawToWinner(winner).send({ from: accounts[0] });
  
      await handleClearDonors();  
    } catch (error) {
      console.error("Error in picking random donor:", error);
      alert("Error picking random donor");
    } finally {
      setLoading(false);
    }
  };
  

  const handleDonate = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }

    try {
      setLoading(true);

      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      const donationContract = new web3.eth.Contract(DonationContract.abi as any, CONTRACT_ADDRESS);

      await donationContract.methods.donate().send({
        from: account,
        value: web3.utils.toWei("0.01", "ether"),
      });

      alert("Donation successful!");
      fetchBalance(); 
      fetchDonors(); 
      console.log("Список донаторів після пожертви:", donors);
    } catch (error) {
      console.error("Donation failed:", error);
      alert("Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawDonate = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }

    try {
      setLoading(true);

      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const accounts = await web3.eth.getAccounts();
      const donationContract = new web3.eth.Contract(DonationContract.abi as any, CONTRACT_ADDRESS);

      await donationContract.methods.withdraw().send({ from: accounts[0] });

      alert("Withdrawal successful!");
      fetchBalance(); 
    } catch (error) {
      console.error("Withdrawal failed:", error);
      alert("Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  const handleClearDonors = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }
  
    try {
      setLoading(true);
  
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
  
      const accounts = await web3.eth.getAccounts();
      const donationContract = new web3.eth.Contract(DonationContract.abi as any, CONTRACT_ADDRESS);

      await donationContract.methods.clearDonors().send({
        from: accounts[0],
      });

      await donationContract.methods.withdraw().send({
        from: accounts[0],
      });

      fetchDonors(); 
      fetchBalance();
  
    } catch (error) {
      console.error("Clearing donors and transferring balance failed:", error);
      alert("Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    balance,
    donors,
    randomDonor,
    handleDonate,
    handleWithdrawDonate,
    pickRandomDonor,
    handleClearDonors,
  };
};
