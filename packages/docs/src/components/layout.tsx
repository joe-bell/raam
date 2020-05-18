/** @jsx jsx */
import * as React from "react";
import { jsx, Box, Container, Heading, NavLink } from "theme-ui";
import { Wrap } from "raam";
import Head from "./head";
import ToggleColorMode from "./toggle-color-mode";
import config from "../config";

const border = {
  border: "thick",
  borderColor: "border",
};

const gap = 3;

const Layout: React.FC = ({ children }) => (
  <React.Fragment>
    <Head />
    <Box
      as="header"
      sx={{
        paddingY: gap,
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
        <Heading as="h1" sx={{ fontSize: 5 }}>
          raam
        </Heading>

        <Box
          as="nav"
          sx={{
            display: "flex",
            marginTop: [gap, 0],
          }}
        >
          <Wrap as="ul" gap={gap}>
            {config.navigation.map(item => (
              <NavLink key={item.url} href={item.url}>
                {item.title}
              </NavLink>
            ))}
          </Wrap>
          <ToggleColorMode
            sx={{
              position: ["absolute", "relative"],
              top: [gap, 0],
              right: [gap, 0],
              marginLeft: [null, gap],
            }}
          />
        </Box>
      </Container>
    </Box>

    <Box sx={{ ...border, borderTop: 0, paddingY: gap }}>
      <Container as="main">{children}</Container>
    </Box>

    <Box sx={{ ...border, borderTop: 0, paddingY: gap }}>
      <Container as="footer">
        © 2020{" "}
        <NavLink href={`https://twitter.com/${config.meta.social.twitter}`}>
          {config.meta.author}
        </NavLink>
      </Container>
    </Box>
  </React.Fragment>
);

export default Layout;
