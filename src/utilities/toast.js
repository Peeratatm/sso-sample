import React from "react";
import {
  toast as toastify,
} from "react-toastify";

export const toast = {
  show: ({
    title = "",
    type = "success",
    position = "top-right",
    theme = "light",
    autoClose = false,
    onClose = () => {},
    onOpen = () => {},
  }) => {
    return toastify(title, {
      autoClose: type == "success" ? 3000 : autoClose,
      type,
      position,
      theme,
      draggable: true,
      closeButton: true,
      onClose: (props) => {
        onClose(props);
      },
      onOpen: (props) => {
        onOpen(props);
      },
    });
  },

  promise: ({
    callback = () => Promise.resolve(),
    failText = "",
    loadingText = "",
    successText = "",
  }) => {
    return toastify.promise(callback, {
      error: failText,
      pending: loadingText,
      success: {
        render({ data }) {
          // data from resolved promise
          return successText;
        },
      },
    });
  },

  update: (
    id,
    {
      title = "",
      type = "success",
      isLoading = false,
    },
  ) => {
    return toastify.update(id, {
      render: title,
      type,
      isLoading,
      draggable: true,
      closeButton: true,
      autoClose: type == "success" ? 3000 : false,
    });
  },

  loading: ({ title = "" }) => {
    return toastify.loading(title, {});
  },

  clear: () => {
    return toastify.dismiss();
  },
};
