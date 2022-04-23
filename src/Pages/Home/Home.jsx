import React, { useEffect, useState } from "react";
import Layout from "../../Components/UI/Layout/Layout";
import classes from "./Home.module.css";
import States from "../../Components/States/States";
import Deposit from "../../Components/Deposit/Deposit";
import Navbar from "../../Components/Menu/Navbar/Navbar";
import Menu from "../../Components/Menu/Menu";
import Card from "../../Components/UI/Card/Card";
import Referals from "../../Components/Referals/Referals";
import ConnectWallet from "../../Components/ConnectWallet/ConnectWallet";
import { useDispatch, useSelector } from "react-redux";
import {
  connectMetamask,
  connectWalletConnect,
  disconnectWallet,
  getContractInfo,
  getUserInfo,
} from "../../Redux/reduxActions";

const Home = (props) => {
  const dispatch = useDispatch();
  const {
    currentTab,
    setCurrentTab,
    isOpenConnectWallet,
    handleWallet,
    setIsOpenConnectWallet,
  } = props;
  let { userAddress, connectionType } = useSelector((state) => state.common);

  const info = {
    referal_rewards: 0,
    team: 112,
    my_referal: "",
    marketing_wallet: "0x593299A04cec407295352A89071CA6E49634e28b",
    total_deposited: 32120800,
    total_users: 11000,
  };

  useEffect(() => {
    dispatch(getContractInfo());
  }, []);

  useEffect(() => {
    if (userAddress) {
      switch (connectionType) {
        case "metamask":
          dispatch(connectMetamask());
          break;
        case "WALLET_CONNECT":
          dispatch(connectWalletConnect());
          break;
        default:
          break;
      }
    }
  }, []);

  useEffect(() => {
    if (userAddress) {
      setIsOpenConnectWallet(false);
    }
  }, [userAddress]);

  return (
    <Layout handleWallet={handleWallet}>
      {isOpenConnectWallet && (
        <ConnectWallet
          connectMetamask={connectMetamask}
          connectWalletConnect={connectWalletConnect}
          onClose={handleWallet}
        />
      )}
      <div className={classes.main}>
        <States />
        <Deposit />
      </div>
      <div className={classes.mobile}>
        <Navbar
          dispatch={dispatch}
          disconnectWallet={disconnectWallet}
          userAddress={userAddress}
          handleWallet={handleWallet}
        />
        <div className={classes.content}>
          {currentTab === 0 && <States />}
          {currentTab === 1 && <Deposit />}
          {currentTab === 2 && (
            <Card>
              <Referals info={info} />
            </Card>
          )}
        </div>
        <Menu setCurrentTab={setCurrentTab} currentTab={currentTab} />
      </div>
    </Layout>
  );
};

export default Home;
