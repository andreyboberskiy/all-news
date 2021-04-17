// import { Materialbox } from "materialize-css";
import errorToastr from "libs/toastr/errorToastr";
import dayPhotoSevices from "modules/MainContainer/DayPhoto/dayPhotoServices";
import React, { useEffect, useState } from "react";
import classes from "./DayPhoto.module.scss";
import M from "materialize-css";
import useCallbackRef from "hooks/useRefCallback";
const DayPhoto = () => {
  const [photoLink, setPhotoLink] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: {
            urls: { small: photo },
          },
        } = await dayPhotoSevices.getDayPhoto();

        setPhotoLink(photo);
      } catch (e) {
        errorToastr("Error", e.message);
      }
    })();
  }, []);

  const [imgNode, setRef] = useCallbackRef();

  useEffect(() => {
    M.Materialbox.init(imgNode);
  }, [imgNode]);

  return photoLink ? (
    <div className={classes.root}>
      <div className={classes.title}>Фото дня</div>
      <div className={classes.dayPhoto}>
        <img
          className="materialboxed"
          ref={setRef}
          src={photoLink}
          alt="Фото дня"
        />
      </div>
    </div>
  ) : null;
};

export default DayPhoto;
