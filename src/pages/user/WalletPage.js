import React, {useEffect, useState} from "react";
import BalanceCard from "../../components/user/BalanceCard";
import ReusableTable from "../../components/admin/ReusableTable";
import api from "../../config/axiosConfig";
import { useSelector } from "react-redux";

const columns = [
  {label: "Type", field: "type"},
  {label: "Description", field: "description"},
  {label: "Date", field: "date"},
  {label: "Amount", field: "amount"},
];

const WalletPage = () => {
  const [walletData, setWalletData] = useState(null);
  const {user} = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchWalletDetials = async () => {
        try{
            const response = await api.get("wallet/my-wallet")
            setWalletData(response?.data?.wallet)
        }catch(error){
            console.log(error)
        }
    }
    fetchWalletDetials()
  }, []);

  if(walletData==null) return(
    <div>
        <h1>Your wallet in empty</h1>
    </div>
  )

  const transationData = walletData?.transactions?.map((data) => ({
    type: data?.type,
    description: data?.description,
    date: new Date(data.date).toLocaleDateString(),
    amount: data?.amount
  }))
  return (
    <div className="">
      <h1 className="text-2xl font-bold">FootFlex Wallet</h1>
      <div className="mt-5">
        <BalanceCard wallet={walletData} user={user}/>
      </div>
      <div className="mt-3">
        <ReusableTable columns={columns} data={transationData} />
      </div>
    </div>
  );
};

export default WalletPage;
