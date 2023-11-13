import { useLayoutEffect } from "react";

export const useTitle = ({ title }) => {
  useLayoutEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;
    return function () {
      document.title = " SaKu MOVIES";
    };
  }, [title]);
  return;
};
