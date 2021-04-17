import React from "react";
import ExchangeRate from "modules/MainContainer/ExchangeRate/ExchangeRate";
import Weather from "modules/MainContainer/Weather/Weather";
import classes from "./MainContainer.module.scss";
import DayPhoto from "modules/MainContainer/DayPhoto/DayPhoto";
import SearchBar from "modules/MainContainer/SearchBar/SearchBar";
import NewsContainer from "modules/MainContainer/NewsContainer/NewsContainer";

const MainContainer = (props) => {
    return (
        <div className={classes.root}>
            <div className="jcsb container mt-4">
                <ExchangeRate />
                <Weather />
                <DayPhoto />
            </div>
            <div className="mt-5 mb-3">
                <SearchBar />
                <NewsContainer />
            </div>
        </div>
    );
};

export default MainContainer;
