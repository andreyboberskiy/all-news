import clsx from "clsx";
import React from "react";
import { connect } from "react-redux";
import classes from "./Preloader.module.scss";

const Preloader = ({ loading }) => (
    <div className={clsx(classes.root, { ["hide"]: !loading })}>
        <span></span>
    </div>
);

const mapStateToProps = ({ app: { loading } }) => ({
    loading,
});

export default connect(mapStateToProps, {})(Preloader);
