import React, { useCallback, useEffect, useRef, useState } from "react";
import classes from "./ExchangePage.module.scss";
import exchangePageService from "modules/ExchangePage/exchangePageService";
import errorToastr from "libs/toastr/errorToastr";
import Chart from "chart.js/auto";
import { useLocalStorage } from "hooks/useLocalStorage";
import localStorageKeys from "constants/constants";
import { _v } from "utils/short";
import clsx from "clsx";

const mainCurrencyCode = ["EUR", "USD", "RUB", "PLN"];

const ignoreCodes = ["XPD", "XAU", "XPT", "XAG"];

const transformCoursesDataForCanvas = (coursesArray) => {
  return coursesArray.reduce((accum, currValue) => {
    currValue.forEach(({ exchangedate, cc, rate }) => {
      if (ignoreCodes.includes(cc)) {
        return accum;
      }
      if (accum[cc]) {
        accum[cc] = { ...accum[cc], [exchangedate]: rate };
      } else {
        accum[cc] = { [exchangedate]: rate };
      }
    });

    return accum;
  }, {});
};

const ExchangePage = () => {
  const [mainCourses, setMainCourses] = useState({});
  const [allCourses, setAllCourses] = useState({});
  const [showingCourses, setShowingCourses] = useState({});
  const { setItem, getItem } = useLocalStorage();
  const canvasRef = useRef();
  const chartRef = useRef();

  useEffect(() => {
    if (mainCourses) {
      setShowingCourses(mainCourses);
    }
  }, [mainCourses]);

  useEffect(() => {
    const currentDate = new Date()
      .toLocaleDateString("pt-PT")
      .replaceAll("/", ".");

    const coursesFromStorage = getItem(localStorageKeys.courses);

    if (
      coursesFromStorage &&
      coursesFromStorage["EUR"] &&
      coursesFromStorage["EUR"][currentDate]
    ) {
      const listCopy = { ...coursesFromStorage };
      Object.keys(listCopy).forEach((currency) => {
        if (!mainCurrencyCode.includes(currency)) {
          delete listCopy[currency];
        }
      });
      setMainCourses(listCopy);
      setAllCourses(coursesFromStorage);

      return;
    } else {
      (async () => {
        try {
          const datesForPrev30Days = Array(30)
            .fill(null)
            .map((_, i) => {
              const date = new Date();
              date.setDate(date.getDate() - i);
              return date.toLocaleDateString("en-ZA").replaceAll("/", "");
            });

          const promiseArr = datesForPrev30Days.map((date) =>
            exchangePageService.getDataByDay(date)
          );

          const coursesForAllDates = await Promise.all(promiseArr);

          const transformedData = transformCoursesDataForCanvas(
            coursesForAllDates
          );

          const listCopy = { ...transformedData };
          Object.keys(listCopy).forEach((currency) => {
            if (!mainCurrencyCode.includes(currency)) {
              delete listCopy[currency];
            }
          });
          setMainCourses(listCopy);
          setAllCourses(transformedData);

          setItem(localStorageKeys.courses, transformedData);
        } catch (e) {
          errorToastr("Помилка запиту", e.message);
        }
      })();
    }
  }, []);

  const createCanvas = useCallback(() => {
    const canvas = canvasRef.current.getContext("2d");

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const preparedDatasets = Object.keys(showingCourses).map((curr) => {
      const backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(
        16
      )}`;
      return {
        label: curr,
        data: _v(showingCourses[curr]),
        backgroundColor,
        borderColor: backgroundColor,
      };
    });

    const dataForCanvas = {
      labels: Object.keys(showingCourses["EUR"]),
      datasets: preparedDatasets,
    };

    chartRef.current = new Chart(canvas, {
      type: "line",
      data: dataForCanvas,
      options: {},
    });
  }, [chartRef, canvasRef, showingCourses]);

  const toggleShowingCourses = useCallback(() => {
    if (Object.keys(showingCourses).length === 4) {
      setShowingCourses(allCourses);
    } else {
      setShowingCourses(mainCourses);
    }
    createCanvas();
  }, [createCanvas, showingCourses]);

  useEffect(() => {
    if (canvasRef && showingCourses && showingCourses["EUR"]) {
      createCanvas();
    }
  }, [showingCourses, createCanvas]);

  const [exp, setExp] = useState(false);

  useEffect(() => {
    if (canvasRef && chartRef.current) {
      if (exp) {
        canvasRef.current.height = 3000;
      } else {
        canvasRef.current.height = 1000;
      }
      chartRef.current.update();
    }
  }, [exp]);

  return (
    <div className={classes.root}>
      <div className={classes.title}>Курси валют</div>
      <div
        onClick={toggleShowingCourses}
        className="waves-effect waves-light btn tac mb-4 ml-4 "
      >
        {_v(showingCourses).length === 4 ? "Більше валют" : "Основні валюти"}
      </div>
      <div
        onClick={() => setExp((prev) => !prev)}
        className="waves-effect waves-light btn tac mb-4 ml-4 "
      >
        {exp ? "Згорнути" : "Розгорнути"}
      </div>
      <div className={clsx(classes.canvasRoot, { [classes.expansive]: exp })}>
        <canvas ref={canvasRef}>Нет поддержки канвас</canvas>
      </div>
    </div>
  );
};

export default ExchangePage;
