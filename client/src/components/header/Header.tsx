import { Layout, Button, Tooltip } from "antd";
import Web3 from "web3";
import { useState, useEffect } from "react";
import DonationContract from "../../../build/contracts/Donation.json";

const { Header } = Layout;

const CONTRACT_ADDRESS = "0x9c012Ee75f7B21CbCEF1f3CF2e1666bcd7d980E4";

const CustomHeader = ({ onToggleCollapse }: { onToggleCollapse: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState<string>("0");

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const donationContract = new web3.eth.Contract(DonationContract.abi as any, CONTRACT_ADDRESS);

      const balanceWei = await donationContract.methods.getBalance().call();

      if (!balanceWei || balanceWei.length === 0) {
        console.error("Received empty balance");
        return;
      }

      const balanceEth = web3.utils.fromWei(balanceWei.toString(), "ether");
      setBalance(balanceEth);
    } catch (error) {
      console.error("Failed to fetch balance:", error);
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

      const tx = await donationContract.methods
        .donate()
        .send({ from: account, value: web3.utils.toWei("0.01", "ether") });
        
      console.log("Transaction:", tx);
      alert("Donation successful!");

      fetchBalance();
    } catch (error) {
      console.error("Donation failed:", error);
      alert("Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
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

      window.location.reload();
    } catch (error) {
      console.error("Withdrawal failed:", error);
      alert("Transaction failed");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Header className="flex items-center px-6 bg-white border-b border-gray-300 z-50 justify-between">
      <div className="flex items-center">
        <div
          onClick={onToggleCollapse}
          className="w-7 ml-1 cursor-pointer opacity-60 transition-opacity border-2 border-transparent hover:bg-zinc-200 rounded-lg"
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H20" stroke="#01274e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <img src="/images/logo.png" alt="TatsYM" width={150} className="ml-3" />
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-lg font-semibold">Баланс: {balance} ETH</div>
        <Tooltip title="Пожертвуйте на піцу студентам" placement="bottom">
          <Button type="primary" onClick={handleDonate} loading={loading}>
            Пожертвувати 0.01 ETH
          </Button>
        </Tooltip>
        <Button type="primary" onClick={handleWithdraw} loading={loading}>
          money money money
        </Button>
      </div>
    </Header>
  );
};

export default CustomHeader;
