/** @jsx jsx */
import { jsx, NavLink } from "theme-ui";

const heading = (Tag) => (props) => {
  if (!props.id) return <Tag {...props} />;
  return (
    <Tag
      {...props}
      sx={{
        // Rough approximation of header size to avoid overlap
        scrollMarginTop: ["11rem", "6rem"],
      }}
    >
      <NavLink
        sx={{
          textDecoration: "none",
          "&:hover, &:focus": {
            textDecoration: "underline",
          },
        }}
        href={`#${props.id}`}
      >
        {props.children}
      </NavLink>
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
