/** @jsx jsx */
import * as React from "react";

import { jsx, Box, Container, Heading, NavLink } from "theme-ui";
import { Inline } from "raam";
import Head from "./head";
import config from "../config";

const border = {
  border: "primary",
};

const Layout: React.FC = ({ children }) => (
  <>
    <Head />
    <Box
      as="header"
      sx={{
        paddingY: 3,
        position: "sticky",
        top: 0,
        backgroundColor: "background",
        ...border,
        zIndex: 2,
      }}
    >
      <Container
        sx={{
          display: ["block", "flex"],
          alignItems: [null, "center"],
          justifyContent: [null, "space-between"],
        }}
      >
        <Heading as="h1">raam</Heading>
        <Box
          as="nav"
          sx={{
            marginTop: [3, 0],
          }}
        >
          <Inline as="ul">
            {config.navigation.map(item => (
              <NavLink key={item.url} href={item.url}>
                {item.title}
              </NavLink>
            ))}
          </Inline>
        </Box>
      </Container>
    </Box>

    <Box sx={{ ...border, borderTop: 0, paddingY: 3 }}>
      <Container as="main">{children}</Container>
    </Box>

    <Box sx={{ ...border, borderTop: 0, paddingY: 3 }}>
      <Container as="footer">
        © 2020{" "}
        <NavLink href={`https://twitter.com/${config.meta.social.twitter}`}>
          {config.meta.author}
        </NavLink>
      </Container>
    </Box>
  </>
);

export default Layout;
