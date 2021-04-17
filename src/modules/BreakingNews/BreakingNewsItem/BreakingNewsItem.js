import clsx from "clsx";
import SpriteIcon from "components/common/SpriteIcon";
import React, { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Scrollbar from "react-scrollbars-custom";
import classes from "./BreakingNewsItem.module.scss";

const BreakingNewsItem = ({ title, desc, imgSrc, url }) => {
    const [fullDesc, setFullDesc] = useState(false);

    const handleOpenDesc = useCallback(() => {
        setFullDesc(true);
    }, [setFullDesc]);

    const handleCloseDesc = useCallback(() => {
        setFullDesc(false);
    }, [setFullDesc]);

    const [swipeActive, setSwipeActive] = useState(true);

    const handleToggleSlider = useCallback(
        (isActive) => {
            setSwipeActive(isActive);
        },
        [setSwipeActive]
    );

    return imgSrc.startsWith("http") ? (
        <div className={swipeActive ? "card" : "card no-swipe"}>
            <div className="card-image waves-effect waves-block waves-light">
                <img
                    className="activator"
                    onClick={handleOpenDesc}
                    src={imgSrc}
                    style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="card-content">
                    <span
                        className={clsx(
                            "card-title activator grey-text text-darken-4  fw600 p-0",
                            classes.title
                        )}
                        onClick={handleOpenDesc}
                    >
                        {title.length < 55
                            ? title
                            : `${title.slice(0, 55)} ...`}
                    </span>

                    <div className="flex-center">
                        <p>
                            <a
                                href={url}
                                target="_blank"
                                className="waves-effect waves-light btn"
                            >
                                Показати орігінал
                            </a>
                        </p>
                        <div onClick={handleOpenDesc} className={classes.dots}>
                            <span />
                        </div>
                    </div>
                </div>
                <div
                    className={clsx("card-reveal", classes.desc, {
                        [classes.open]: fullDesc,
                    })}
                    onMouseEnter={() => {
                        handleToggleSlider(false);
                    }}
                    onMouseLeave={() => {
                        handleToggleSlider(true);
                    }}
                >
                    <Scrollbar style={{ width: 280 }}>
                        <>
                            <span
                                className={clsx(
                                    "card-title grey-text text-darken-4",
                                    classes.closeDesc
                                )}
                                onClick={handleCloseDesc}
                            >
                                <span />
                            </span>
                            <p>
                                <b> {title}</b> <br /> <br />
                                {desc}
                            </p>
                        </>
                    </Scrollbar>
                </div>
            </div>
        </div>
    ) : null;
};

export default BreakingNewsItem;
