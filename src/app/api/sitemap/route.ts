import { NextResponse } from "next/server";

export async function GET() {
  const tours = await fetch(
    "https://gotosamarkand.onrender.com/api/all-tour"
  ).then((r) => r.json());
  const events = await fetch(
    "https://gotosamarkand.onrender.com/api/all-event"
  ).then((r) => r.json());
  const services = await fetch(
    "https://gotosamarkand.onrender.com/api/all-sedrvic"
  ).then((r) => r.json());

  let urls = [
    { loc: "https://gotosamarkand.com/", priority: "1.0" },
    { loc: "https://gotosamarkand.com/service", priority: "0.9" },
    { loc: "https://gotosamarkand.com/tour", priority: "0.9" },
    { loc: "https://gotosamarkand.com/events", priority: "0.8" },
  ];

  tours.forEach((tour) => {
    const slug = tour.title.toLowerCase().replace(/\s+/g, "-");
    urls.push({
      loc: `https://gotosamarkand.com/tour/${slug}`,
      priority: "0.7",
    });
  });

  events.forEach((event) => {
    const slug = event.title.toLowerCase().replace(/\s+/g, "-");
    urls.push({
      loc: `https://gotosamarkand.com/events/${slug}`,
      priority: "0.6",
    });
  });

  services.forEach((service) => {
    const slug = service.title.toLowerCase().replace(/\s+/g, "-");
    urls.push({
      loc: `https://gotosamarkand.com/service/${slug}`,
      priority: "0.6",
    });
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
    <url>
      <loc>${url.loc}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>${url.priority}</priority>
    </url>`
    )
    .join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
