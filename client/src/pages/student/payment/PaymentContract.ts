import { useState, useEffect } from "react";
import Web3 from "web3";
import { message } from "antd";
import PaymentContract from "../../../../build/contracts/Payment.json";

const CONTRACT_ADDRESS = "0xcB024669A9dbC633937D01B67495F39aFa9bB08d";
const exchangeRate = 101170;

export const usePaymentLogic = () => {
  const [loading, setLoading] = useState(false);
  const [contractBalance, setContractBalance] = useState<string>("0");
  const [account, setAccount] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    fetchBalance();
    fetchAccount();
  }, []);

  const checkMetaMask = () => {
    if (!window.ethereum) {
      message.error("Будь ласка, встановіть MetaMask");
      throw new Error("MetaMask is not installed");
    }
  };

  const fetchAccount = async () => {
    try {
      if (!window.ethereum) {
        message.error("Будь ласка, встановіть MetaMask");
        throw new Error("MetaMask is not installed");
      }

      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      checkOwner(accounts[0]);
    } catch (error) {
      message.error("Не вдалося підключити MetaMask");
    }
  };

  const checkOwner = async (account: string) => {
    try {
      const web3 = new Web3(window.ethereum);
      const paymentContract = new web3.eth.Contract(PaymentContract.abi as any, CONTRACT_ADDRESS);
      const owner: string = await paymentContract.methods.owner().call();
      setIsOwner(account.toLowerCase() === owner.toLowerCase());
    } catch (error) {
      message.error("Не вдалося перевірити власника");
    }
  };

  const handlePayment = async (amountUAN: string) => {
    if (!account) {
      message.error("Будь ласка, підключіть MetaMask");
      return;
    }
  
    try {
      setLoading(true);
      const web3 = new Web3(window.ethereum);
      const paymentContract = new web3.eth.Contract(PaymentContract.abi as any, CONTRACT_ADDRESS);
      const amountETH = (parseFloat(amountUAN) / exchangeRate).toFixed(6);
  
      const transaction = await paymentContract.methods.deposit().send({
        from: account,
        value: web3.utils.toWei(amountETH, "ether"),
      });
  
      console.log("Транзакція успішна, хеш:", transaction.transactionHash);
      message.success("Оплата успішна!");
      await fetchBalance(); 
    } catch (error) {
      message.error("Транзакція не вдалася");
      console.error("Помилка при оплаті:", error); 
    } finally {
      setLoading(false);
    }
  };
  
  const fetchBalance = async () => {
    try {
      checkMetaMask();
      const web3 = new Web3(window.ethereum);
      const paymentContract = new web3.eth.Contract(PaymentContract.abi as any, CONTRACT_ADDRESS);
      const balanceWei: bigint = await paymentContract.methods.getBalance().call();
      const balanceWeiString = balanceWei.toString();
      const balanceEth = web3.utils.fromWei(balanceWeiString, "ether");
      setContractBalance(balanceEth);
      console.log("Баланс оновлено:", balanceEth); 
    } catch (error) {
      message.error("Не вдалося отримати баланс контракту");
      console.error("Помилка при отриманні балансу:", error); 
    }
  };

  const handleWithdraw = async () => {
    if (!account || !isOwner) {
      message.error("Тільки власник може виводити кошти");
      return;
    }
  
    try {
      setLoading(true);
      checkMetaMask();
      const web3 = new Web3(window.ethereum);
      const paymentContract = new web3.eth.Contract(PaymentContract.abi as any, CONTRACT_ADDRESS);
  
      await paymentContract.methods.withdraw().send({ from: account });
  
      message.success("Виведення коштів успішне!");
  
      await fetchBalance();
    } catch (error) {
      message.error("Транзакція не вдалася");
      console.error("Error in withdraw:", error);
    } finally {
      setLoading(false);
    }
  };
  
  
  

  return {
    loading,
    contractBalance,
    isOwner,
    handlePayment,
    handleWithdraw,
    fetchBalance,
  };
};