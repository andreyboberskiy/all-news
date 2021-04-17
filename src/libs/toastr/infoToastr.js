import React from "react";
import { toastr } from "react-redux-toastr";

const infoToastr = (title, message, options = {}) => {
  toastr.info(title, message, {
    ...options,
    showCloseButton: true,
  });
};

export default infoToastr;
