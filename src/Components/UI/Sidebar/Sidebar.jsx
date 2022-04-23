import React, { useState } from "react";
import classes from "./Sidebar.module.css";
import CustomButton from "../Button/CustomButton";
import { Button } from "@mui/material";

import logo from "../../../Assets/logo.png";
import exit_icon from "../../../Assets/Icons/logout.svg";
import Referals from "../../Referals/Referals";
import { useDispatch, useSelector } from "react-redux";
import { disconnectWallet } from "../../../Redux/reduxActions";

const Sidebar = (props) => {
  const { handleWallet } = props;
  const dispatch = useDispatch();
  let { userAddress, connectionType } = useSelector((state) => state.common);
  const info = {
    referal_rewards: 0,
    team: 112,
    my_referal: "",
    marketing_wallet: "0x593299A04cec407295352A89071CA6E49634e28b",
    total_deposited: 32120800,
    total_users: 11000,
  };

  return (
    <div className={classes.main}>
      <img src={logo} alt="logo" className={classes.logo} />
      <CustomButton
        onClick={
          userAddress ? () => dispatch(disconnectWallet()) : handleWallet
        }
        text={
          userAddress
            ? `${userAddress.slice(0, 6)}...${userAddress.slice(-6)}`
            : "Connect Wallet"
        }
        variant="primary"
      />
      <Referals info={info} />
      {userAddress && (
        <Button
          onClick={() => dispatch(disconnectWallet())}
          className={classes.exit}
        >
          <img src={exit_icon} alt="exit_icon" />
          <p>Log Out</p>
        </Button>
      )}
    </div>
  );
};

export default Sidebar;
