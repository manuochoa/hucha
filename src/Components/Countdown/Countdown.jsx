import React from "react";
import { useCountdown } from "../../Hooks/useCountdown";
import classes from "./Countdown.module.css";

const Countdown = (props) => {
  const { date } = props;

  const [days, hours, minutes, seconds] = useCountdown(date);

  return (
    <div className={classes.main}>
      {seconds < 0 ? (
        <>
          <div className={classes.block}>
            <div className={classes.numbers}>
              <div className={classes.number}>0</div>
              <div className={classes.number}>0</div>
            </div>
            <span>Days</span>
          </div>
          <label>:</label>
          <div className={classes.block}>
            <div className={classes.numbers}>
              <div className={classes.number}>0</div>
              <div className={classes.number}>0</div>
            </div>
            <span>Hours</span>
          </div>
          <label>:</label>
          <div className={classes.block}>
            <div className={classes.numbers}>
              <div className={classes.number}>0</div>
              <div className={classes.number}>0</div>
            </div>
            <span>Minutes</span>
          </div>
          <label>:</label>
          <div className={classes.block}>
            <div className={classes.numbers}>
              <div className={classes.number}>0</div>
              <div className={classes.number}>0</div>
            </div>
            <span>Seconds</span>
          </div>
        </>
      ) : (
        <>
          <div className={classes.block}>
            <div className={classes.numbers}>
              {days < 10 && (
                <div className={classes.number}>
                  <p>0</p>
                </div>
              )}
              {days
                .toString()
                .split("")
                .map((el) => (
                  <div className={classes.number}>
                    <p>{el}</p>
                  </div>
                ))}
            </div>
            <span>Days</span>
          </div>
          <label>:</label>
          <div className={classes.block}>
            <div className={classes.numbers}>
              {hours < 10 && (
                <div className={classes.number}>
                  <p>0</p>
                </div>
              )}
              {hours
                .toString()
                .split("")
                .map((el) => (
                  <div className={classes.number}>
                    <p>{el}</p>
                  </div>
                ))}
            </div>
            <span>Hours</span>
          </div>
          <label>:</label>
          <div className={classes.block}>
            <div className={classes.numbers}>
              {minutes < 10 && (
                <div className={classes.number}>
                  <p>0</p>
                </div>
              )}
              {minutes
                .toString()
                .split("")
                .map((el) => (
                  <div className={classes.number}>
                    <p>{el}</p>
                  </div>
                ))}
            </div>
            <span>Minutes</span>
          </div>
          <label>:</label>
          <div className={classes.block}>
            <div className={classes.numbers}>
              {seconds < 10 && (
                <div className={classes.number}>
                  <p>0</p>
                </div>
              )}
              {seconds
                .toString()
                .split("")
                .map((el) => (
                  <div className={classes.number}>
                    <p>{el}</p>
                  </div>
                ))}
            </div>
            <span>Seconds</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Countdown;
