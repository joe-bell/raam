import path from "path";
import glob from "glob";

const PAGES_DIR = path.join(process.cwd(), "pages");
const PAGES_GLOB = path.join(PAGES_DIR, "**", "*.{js,jsx,ts,tsx,md,mdx}");
const PAGES_TO_IGNORE = ["api/", "_app.tsx", "_document.tsx"].map((p) =>
  path.join(PAGES_DIR, p)
);

export type TGetPagesFilePaths = string[];

export const getPagesFilePaths = async (): Promise<TGetPagesFilePaths> => {
  const filePathsUnfiltered = await glob.sync(PAGES_GLOB);

  return filePathsUnfiltered
    .filter(
      (filePath) => !PAGES_TO_IGNORE.some((ignore) => filePath.includes(ignore))
    )
    .map((filePath) => {
      const removeDirAndExt = filePath
        .replace(PAGES_DIR, "")
        .replace(/\.[^.$]+$/, "");

      return removeDirAndExt === "/index" ? "/" : removeDirAndExt;
    });
};
