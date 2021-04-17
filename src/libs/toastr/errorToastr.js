import React from "react";
import { toastr } from "react-redux-toastr";

const errorToastr = (title, message, options = {}) => {
  toastr.error(title, message, {
    ...options,
    showCloseButton: true,
  });
};

export default errorToastr;
