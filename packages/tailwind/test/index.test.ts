import postcss from "postcss";
import tailwindcss from "tailwindcss";
import config from "./tailwind.config";

const generatePluginCss = (testConfig = {}, pluginOptions = {}) => {
  const postcssPlugins = [tailwindcss({ ...config, ...testConfig })];

  return postcss(postcssPlugins)
    .process("@tailwind base; @tailwind utilities;", { from: undefined })
    .then((result) => result);
};

describe("flex", () => {
  test("returns utilities and responsive variants", () => {
    const testConfig = {};
    generatePluginCss(testConfig).then((result) => {
      console.log(result.css);
      expect(result).toMatchSnapshot();
    });
  });

  test("returns with prefix", () => {
    const testConfig = { prefix: "tw-" };
    generatePluginCss(testConfig).then((result) => {
      console.log(result.css);
      expect(result).toMatchSnapshot();
    });
  });
});
