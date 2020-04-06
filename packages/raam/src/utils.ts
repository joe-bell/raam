export const determineElement = (parentElement: React.ElementType<any>) => {
  return typeof parentElement === "string"
    ? {
        ul: "li",
        ol: "li",
        span: "span",
        p: "span",
        h1: "span",
        h2: "span",
        h3: "span",
        h4: "span",
        h5: "span",
        h6: "span",
      }[parentElement] || "div"
    : parentElement;
};
