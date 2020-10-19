import * as React from "react";
import { cx } from "../styles";

const heading = (Tag) => (props) => {
  if (!props.id) return <Tag {...props} />;

  return (
    <Tag {...props} className={cx(`c.${Tag}`, "c.headingScrollMargin")}>
      <a
        className={cx("c.navLink", "focus: underline", "hover:underline")}
        href={`#${props.id}`}
      >
        {props.children}
      </a>
    </Tag>
  );
};

const headings = {
  h1: heading("h1"),
  h2: heading("h2"),
  h3: heading("h3"),
  h4: heading("h4"),
  h5: heading("h5"),
  h6: heading("h6"),
};

export default headings;
