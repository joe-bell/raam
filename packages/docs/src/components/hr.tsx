/** @jsx jsx */
import { jsx, Box } from "theme-ui";

const hr = {
  hr: (props) => (
    <Box
      as="hr"
      sx={{ color: "hr", pt: 3, mb: 3, borderStyle: "divider" }}
      {...props}
    />
  ),
};

export default hr;
