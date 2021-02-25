import { NextApiRequest, NextApiResponse } from "next";
import { config } from "../../theme.config";

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
  res.status(200).json({
    name: config.title,
    description: config.description,
    icons: [
      {
        src: "/img/icon@128.png",
        type: "image/png",
        sizes: "128x128",
      },
      {
        src: "/img/icon@192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        src: "/img/icon@512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    start_url: "/",
    display: "standalone",
    scope: "/",
  });
  res.end();
};
