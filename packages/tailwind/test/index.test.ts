import postcss from "postcss";
import tailwindcss from "tailwindcss";

const generatePluginCss = (testConfig = {}) => {
  const postcssPlugins = [
    tailwindcss({
      corePlugins: false,
      theme: {},
      plugins: [require("../dist")],
      ...testConfig,
    }),
  ];

  return postcss(postcssPlugins)
    .process("@tailwind base; @tailwind utilities;", { from: undefined })
    .then((result) => result.css);
};

describe("flex", () => {
  const flexConfig = {
    theme: { raam: { flexbox: true } },
  };

  test("returns utilities and responsive variants", () => {
    generatePluginCss({}).then((result) => {
      expect(result).toMatchSnapshot();
    });

    generatePluginCss(flexConfig).then((result) => {
      expect(result).toMatchSnapshot();
    });
  });

  test("returns nothing when disabled", () => {
    generatePluginCss({ theme: { raam: { flexbox: false } } }).then(
      (result) => {
        expect(result).toMatchSnapshot();
      }
    );
  });

  test("returns with prefix", () => {
    const testConfig = { prefix: "tw-" };
    generatePluginCss(testConfig).then((result) => {
      expect(result).toMatchSnapshot();
    });
  });

  test("should warn users to disable corePlugins", () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    generatePluginCss({
      corePlugins: true,
      ...flexConfig,
    });

    generatePluginCss({ corePlugins: true });

    expect(consoleSpy).toHaveBeenCalledTimes(2);
  });
});
