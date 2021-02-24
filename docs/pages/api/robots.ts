import { NextApiRequest, NextApiResponse } from "next";
import { config } from "../../theme.config";

export default (_req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
  res.setHeader("Content-Type", "text/plain");
  res.status(200);
  res.write(
    [
      "User-agent: *",
      "Disallow: /api",
      `Sitemap: ${config.url}/sitemap.xml`,
    ].join("\n")
  );
  res.end();
};
