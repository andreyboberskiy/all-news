import React from "react";
import { toastr } from "react-redux-toastr";

const warningToastr = (title, message, options = {}) => {
  toastr.warning(title, message, {
    ...options,
    showCloseButton: true,
  });
};

export default warningToastr;
