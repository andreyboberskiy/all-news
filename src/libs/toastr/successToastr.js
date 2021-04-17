import { toastr } from "react-redux-toastr";
import React from "react";

const successToastr = (title, message, options = {}) => {
  toastr.success(title, message, {
    ...options,
    showCloseButton: true,
  });
};

export default successToastr;
