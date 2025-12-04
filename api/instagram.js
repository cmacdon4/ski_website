// /api/instagram.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const APIFY_TOKEN = process.env.APIFY_TOKEN;

    // Run Apify Instagram Scraper
    const run = await fetch(`https://api.apify.com/v2/acts/apify~instagram-scraper/run-sync?token=${APIFY_TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        directUrls: ["https://www.instagram.com/ndskiclub/"],
        resultsLimit: 5,
      }),
    });

    const data = await run.json();

    // The Instagram results are inside "data" → extract them
    const posts = data.items || [];

    res.status(200).json(posts);
  } catch (err) {
    console.error("Instagram API error:", err);
    res.status(500).json({ error: "Failed to load Instagram posts." });
  }
}
