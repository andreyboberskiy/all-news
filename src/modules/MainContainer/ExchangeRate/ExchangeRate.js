import clsx from "clsx";
import errorToastr from "libs/toastr/errorToastr";
import exchangeRateServices from "modules/MainContainer/ExchangeRate/exchangeRateServices";
import React, { useEffect, useState } from "react";
import classes from "./ExchangeRate.module.scss";

const ExchangeRate = (props) => {
  const [exchangeData, setExchangeData] = useState(null);

  useEffect(() => {
    try {
      (async () => {
        const { data } = await exchangeRateServices.getExchangeRates("5");
        setExchangeData(data);
      })();
    } catch (e) {
      errorToastr("Error", e.message);
    }
  }, []);

  return exchangeData ? (
    <div className={classes.root}>
      <div className={classes.title}>Курс валют на сьогодні</div>
      <div className={classes.body}>
        <div className={clsx(classes.row)}>
          <div className={classes.item}>
            <b>Валюта</b>
          </div>
          <div className={classes.item}>
            <b>Купівля</b>
          </div>
          <div className={classes.item}>
            <b>Продаж</b>
          </div>
        </div>
        {exchangeData.map(({ ccy, buy, sale }) => (
          <div key={ccy} className={classes.row}>
            <div className={classes.item}>
              <b>{ccy}</b>
            </div>
            <div className={classes.item}>{Number(buy).toFixed(2)}</div>
            <div className={classes.item}>{Number(sale).toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="">Loading...</div>
  );
};

export default ExchangeRate;
