import { useState } from "react";
import { Button, Tooltip } from "antd";
import { usePaymentLogic } from "./PaymentContract";
import { DonateContract } from "./DonateContract";

const PaymentPage = () => {
  const [amountUAN, setAmountUAN] = useState("");

  const {
    loading,
    contractBalance,
    isOwner,
    handlePayment,
    handleWithdraw,
  } = usePaymentLogic();

  const {
    loading: donateLoading,
    balance,
    handleDonate,
    handleWithdrawDonate,
    randomDonor,
    pickRandomDonor,
  } = DonateContract();

  return (
    <div className="flex justify-center min-h-full bg-gray-100">
      <div className="w-full flex flex-col items-center p-4 mt-10">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full md:w-1/2 mb-8">
          <h2 className="text-2xl font-bold">Оплата за навчання</h2>
          <hr className="my-4 border-gray-300" />
          <input
            type="number"
            placeholder="Введіть суму в UAH"
            value={amountUAN}
            onChange={(e) => setAmountUAN(e.target.value)}
            className="border p-3 w-full rounded mb-4 text-lg"
            min="0"
          />
          <p className="text-gray-600">≈ {(parseFloat(amountUAN) / 101170).toFixed(6)} ETH</p>

          <Tooltip title="Краще скиньте студентам на піцу">
            <Button
              type="primary"
              onClick={() => handlePayment(amountUAN)} 
              loading={loading}
              className="bg-[#86aac0] hover:bg-[#6b8a9e] border-none text-white px-6 py-4 font-medium rounded-lg shadow-md text-base w-full mt-2"
            >
              {loading ? "Обробка..." : "Оплатити"}
            </Button>
          </Tooltip>

          <hr className="my-4 border-gray-300" />

          {isOwner && (
            <div className="mt-4">
              <p className="text-gray-600">Баланс контракту: {contractBalance} ETH</p>
              <Tooltip title="Вивести кошти з контракту">
                <Button
                  type="primary"
                  danger
                  onClick={handleWithdraw}
                  loading={loading}
                  className="bg-[#86aac0] hover:bg-[#6b8a9e] border-none text-white px-6 py-4 font-medium rounded-lg shadow-md text-base w-full mt-2"
                >
                  {loading ? "Обробка..." : "Вивести кошти"}
                </Button>
              </Tooltip>
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full md:w-1/2 mr-5">
            <h2 className="text-2xl font-bold">Пожертви</h2>
            <hr className="my-4 border-gray-300" />
            <p className="text-gray-600">Баланс пожертв: {balance} ETH</p>
            <Tooltip title="Пожертвувати студентам на піцу">
              <Button
                type="primary"
                onClick={handleDonate}
                loading={donateLoading}
                className="bg-[#86aac0] hover:bg-[#6b8a9e] border-none text-white px-6 py-4 font-medium rounded-lg shadow-md text-base w-full mt-4"
              >
                {donateLoading ? "Обробка..." : "Пожертвувати 0.01 ETH"}
              </Button>
            </Tooltip>
            <hr className="my-4 border-gray-300" />
            {isOwner && (
              <Tooltip title="Вивести кошти">
                <Button
                  type="primary"
                  danger
                  onClick={handleWithdrawDonate}
                  loading={donateLoading}
                  className="bg-[#86aac0] hover:bg-[#6b8a9e] border-none text-white px-6 py-4 font-medium rounded-lg shadow-md text-base w-full mt-2"
                >
                  {donateLoading ? "Обробка..." : "Вивести кошти"}
                </Button>
              </Tooltip>
            )}
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Колесо розіграшу</h2>
            <div className="bg-gray-200 p-4 w-full h-48 flex justify-center items-center rounded-lg">
              <p className="text-gray-600">
                {randomDonor || "Ще не вибрано"}
              </p>
            </div>
            {isOwner && (
              <Tooltip title="Запустити колесо розіграшу">
                <Button
                  type="primary"
                  danger
                  onClick={async () => {
                    pickRandomDonor();
                  }}
                  loading={donateLoading}
                  className="bg-[#86aac0] hover:bg-[#6b8a9e] border-none text-white px-6 py-4 font-medium rounded-lg shadow-md text-base w-full mt-2"
                >
                  Запустити колесо
                </Button>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
