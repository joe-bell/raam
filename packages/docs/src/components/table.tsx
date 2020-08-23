/** @jsx jsx */
import { jsx, Box } from "theme-ui";

const table = {
  table: (props) => (
    <Box sx={{ overflowX: "auto" }}>
      <table {...props} />
    </Box>
  ),
};

export default table;
