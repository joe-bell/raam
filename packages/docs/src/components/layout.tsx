/** @jsx jsx */
import * as React from "react";
import { jsx } from "theme-ui";
import Head from "./head";
import ToggleColorMode from "./toggle-color-mode";
import config from "../config";
import { cx } from "../styles";

const Layout: React.FC = ({ children }) => (
  <>
    <Head />
    <header
      className={cx(
        "py-4",
        "sticky",
        "top-0",
        "bg-background",
        "z-10",
        "u.border"
      )}
    >
      <div
        className={cx(
          "c.container",
          "sm:flex",
          "sm:items-center",
          "sm:justify-between"
        )}
      >
        <h1 className={cx("c.heading", "text-4xl", "leading-9")}>
          <a href="#" className={cx("c.navLink")}>
            raam
          </a>
        </h1>

        <nav className={cx("flex", "mt-4", "sm:mt-0")}>
          <ul
            className={cx(
              "flex",
              "flex-row",
              "flex-wrap",
              "flex-gap-4",
              "items-center"
            )}
          >
            {config.navigation.map((item) => (
              <li key={item.url} className={cx("flex-initial")}>
                <a className={cx("c.navLink")} href={item.url}>
                  {item.title}
                </a>
              </li>
            ))}
          </ul>

          <ToggleColorMode
            className={cx(
              "top-0",
              "right-0",
              "absolute",
              "sm:relative",
              "mt-4",
              "sm:mt-0",
              "mr-4",
              "sm:mr-0",
              "sm:ml-4"
            )}
          />
        </nav>
      </div>
    </header>

    <div className={cx("u.border", "border-t-0", "py-4")}>
      <main className={cx("c.container")}>{children}</main>
    </div>

    <div className={cx("u.border", "border-t-0", "py-4")}>
      <footer className={cx("c.container")}>
        © 2020{" "}
        <a
          className={cx("c.navLink")}
          href={`https://twitter.com/${config.meta.social.twitter}`}
        >
          {config.meta.author}
        </a>
      </footer>
    </div>
  </>
);

export default Layout;
