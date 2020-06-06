const black = "#000";
const white = "#FFF";

const colors = {
  text: black,
  textCode: "#f6f6f6",
  background: white,
  backgroundCode: black,
  border: black,
  primary: "#0072CE",
  muted: "#f6f6f6",
  error: "#e23636",
};

const colorModes = {
  modes: {
    dark: {
      text: white,
      background: black,
      border: white,
      muted: "#1C1B20",
    },
  },
};

const space = [0, 4, 8, 16, 32, 64, 128, 256, 512];

const borderStyles = {
  thick: "solid",
};

const borderWidths = {
  thick: space[1],
};

const theme = {
  colors: {
    ...colors,
    ...colorModes,
  },
  space,
  fonts: {
    body: '"Inter", sans-serif',
    heading: "inherit",
    monospace: "Menlo, monospace",
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  layout: {
    container: {
      maxWidth: 960,
      px: 3,
    },
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  borderStyles,
  borderWidths,
  borders: {
    thick: `${borderWidths.thick}px ${borderStyles.thick}`,
  },
  styles: {
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
    },
    blockquote: {
      marginX: 0,
      padding: 1,
      paddingLeft: 3,
      borderLeft: "primary",
      borderColor: "primary",
      bg: "muted",
    },
    h1: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 6,
    },
    h2: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 5,
    },
    h3: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 4,
    },
    h4: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 3,
    },
    h5: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 2,
    },
    h6: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 1,
    },
    p: {
      color: "text",
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
    },
    a: {
      color: "primary",
    },
    pre: {
      fontFamily: "monospace",
      overflowX: "auto",
      code: {
        color: "inherit",
      },
    },
    code: {
      fontFamily: "monospace",
      fontSize: "inherit",
    },
    inlineCode: {
      fontFamily: "monospace",
      fontSize: 1,
      padding: 1,
      backgroundColor: "muted",
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0,
    },
    th: {
      padding: 1,
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    td: {
      padding: 1,
      textAlign: "left",
      borderBottomStyle: "solid",
      borderBottomWidth: 2,
    },
    hr: {
      border: 0,
      borderBottom: "divider",
    },
    img: {
      maxWidth: "100%",
    },
  },
};

export default theme;
