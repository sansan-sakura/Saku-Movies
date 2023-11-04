import { useLayoutEffect } from "react";

export const useTitle = ({ title }) => {
  console.log(title);
  useLayoutEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;
    return function () {
      document.title = " SaKu MOVIES";
    };
  }, [title]);
  return;
};
