import puppeteer from "puppeteer";

export default async function handler(req, res) {
  const { user } = req.query;

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();

  await page.setViewport({
    width: 480,
    height: 260,
    deviceScaleFactor: 2
  });

  await page.goto(
    `https://billions-member-pass.vercel.app/?username=${user}`,
    { waitUntil: "networkidle0" }
  );

  const card = await page.$(".card");

  const buffer = await card.screenshot({
    type: "png",
    omitBackground: false
  });

  await browser.close();

  res.setHeader("Content-Type", "image/png");
  res.send(buffer);
}
