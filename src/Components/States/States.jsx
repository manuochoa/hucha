import React from "react";
import InfoCard from "../InfoCard/InfoCard";
import classes from "./States.module.css";
import { useSelector } from "react-redux";

const States = (props) => {
  let { user } = useSelector((state) => state.common);
  return (
    <div className={classes.main}>
      <InfoCard
        value={Number(user.available).toFixed(2)}
        percent={"13.5%"}
        type="available"
      />
      <InfoCard
        value={Number(user.deposits).toFixed(2)}
        percent={"13.5%"}
        type="deposits"
      />
      <InfoCard
        value={Number(user.claimed).toFixed(2)}
        percent={"13.5%"}
        type="claimed"
      />
      <InfoCard
        value={Number(user.maxPayout).toFixed(2)}
        percent={"13.5%"}
        type="payout"
      />
    </div>
  );
};

export default States;
