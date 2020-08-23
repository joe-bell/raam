/** @jsx jsx */
import { jsx, Box, Heading, Link } from "theme-ui";
import Highlight, { defaultProps } from "prism-react-renderer";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import * as Raam from "raam";
import * as RaamThemeUI from "@raam/theme-ui";

const Code = ({ children, className, live }) => {
  const language = className.replace(/language-/, "");
  if (live) {
    return (
      <Box
        sx={{
          display: "block",
          border: "thick",
          borderColor: "border",
          overflow: "hidden",
        }}
      >
        <LiveProvider
          code={children}
          transformCode={(code) => "/** @jsx jsx */" + code}
          scope={{ jsx, Box, Heading, Link, ...Raam, ...RaamThemeUI }}
        >
          <Box
            as={LivePreview}
            sx={{
              fontFamily: "body",
              borderBottom: "thick",
              borderColor: "border",
            }}
          />
          <Box
            as={LiveEditor}
            sx={{ padding: 3, backgroundColor: "backgroundCode" }}
          />
          <Box
            as={LiveError}
            sx={{
              padding: 3,
              borderTop: "thick",
              borderColor: "error",
              color: "textCode",
              backgroundColor: "backgroundCode",
            }}
          />
        </LiveProvider>
      </Box>
    );
  }
  return (
    <Highlight {...defaultProps} code={children} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Box as="pre" className={className} sx={{ ...style, padding: "20px" }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </Box>
      )}
    </Highlight>
  );
};

export default Code;
