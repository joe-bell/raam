/** @jsx jsx */
import * as React from "react";
import { jsx, Box, Container, Heading, NavLink } from "theme-ui";
import { Wrap } from "raam";
import Head from "./head";
import ToggleColorMode from "./toggle-color-mode";
import config from "../config";
import { HStack, VStack } from "./stack";

const border = {
  border: "thick",
  borderColor: "border",
};

const gap = 3;

const Layout: React.FC = ({ children }) => (
  <>
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
      <Container as="main">
        <HStack>
          {["Test 1", "Test 2", "Test 3", "Test 4", "Test 5", "Test 6"]}
        </HStack>

        <Box mt="4" />

        <VStack
          flexDirection={[
            "column",
            // @ts-ignore
            {
              "@media (min-width: 500px)": "row",
            },
          ]}
          gap={[
            // @ts-ignore
            "16px",
            // @ts-ignore
            {
              "@media (min-width: 500px)": "2rem",
            },
            // @ts-ignore
            {
              "@media (min-width: 600px)": "4rem",
            },
          ]}
        >
          {["Test 1", "Test 2", "Test 3"]}
        </VStack>

        <Box mt="4" />

        {children}
      </Container>
    </Box>

    <Box sx={{ ...border, borderTop: 0, paddingY: gap }}>
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
