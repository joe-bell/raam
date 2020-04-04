export const determineElement = (parentElement: React.ElementType<any>) => {
  return typeof parentElement === "string"
    ? {
        ul: "li",
        ol: "li",
        span: "span",
      }[parentElement] || "div"
    : parentElement;
};
