export default async function handler(req, res) {
  res.setHeader("Allow", ["POST"]);
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const token = process.env.ISR_TOKEN;
  if (!token || req.headers.authorization !== `Bearer ${token}`) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const path = req.body?.path;
  const isAllowedPath =
    path === "/" ||
    (typeof path === "string" && /^\/movie\/[1-9]\d*$/.test(path));

  if (!isAllowedPath) {
    return res.status(400).json({ message: "Invalid path" });
  }

  try {
    await res.revalidate(path);
    return res.status(200).json({ revalidated: true, path });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error revalidating" });
  }
}
