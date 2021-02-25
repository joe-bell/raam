import { NextApiRequest, NextApiResponse } from "next";
import { config } from "../../theme.config";
import { getPagesFilePaths, TGetPagesFilePaths } from "../../lib/pages";

const createSitemap = (
  paths: TGetPagesFilePaths
) => `<?xml version="1.0" encoding="UTF-8"?>
<config
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="https://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="https://www.sitemaps.org/schemas/sitemap/0.9
                      https://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${paths.map(
      (path) =>
        `<url>
        <loc>${`${config.url}${path === "/" ? "" : path}`}</loc>
    </url>`
    ).join(`
    `)}
</config>`;

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
  res.setHeader("Content-Type", "text/xml");
  res.status(200);

  try {
    const paths = await getPagesFilePaths();
    res.write(createSitemap(paths));
  } catch (error) {
    res.write(createSitemap(["/"]));
  }

  res.end();
};
