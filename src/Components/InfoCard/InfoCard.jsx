import React, { useEffect, useState } from "react";
import { cx } from "../../Utils/classnames";
import classes from "./InfoCard.module.css";

import wallet from "../../Assets/Icons/wallet.svg";
import dollar from "../../Assets/Icons/dollar.svg";
import rocket from "../../Assets/Icons/rocket.svg";
import sticker from "../../Assets/Icons/sticker.svg";
import arrow from "../../Assets/Icons/arrow.svg";

const InfoCard = (props) => {
  const { value, percent, type } = props;

  const types = [
    {
      type: "available",
      className: classes.available,
      icon: wallet,
      text: "Available",
    },
    {
      type: "deposits",
      className: classes.deposits,
      icon: sticker,
      text: "Deposits",
    },
    {
      type: "claimed",
      className: classes.claimed,
      icon: dollar,
      text: "Claimed",
    },
    {
      type: "payout",
      className: classes.payout,
      icon: rocket,
      text: "Max Payout",
    },
  ];

  const [currentType, setCurrentType] = useState(types[0]);

  useEffect(() => {
    types.forEach((el) => {
      if (type === el.type) {
        setCurrentType(el);
      }
    });
  }, [type]);

  return (
    <div className={cx(classes.main, currentType.className)}>
      <div className={classes.iconContainer}>
        <img src={currentType.icon} alt={currentType.type} />
      </div>
      <p className={classes.value}>{value} HUCHA</p>
      {/* <div className={classes.percent}>
                <img src={arrow} alt="arrow"/>
                <span>{percent}</span>
            </div> */}
      <span className={classes.text}>{currentType.text}</span>
    </div>
  );
};

export default InfoCard;
