// app/sitemap.xml/route.ts
import { NextResponse } from "next/server";
import { client, blogQueries } from "@/lib/sanity";

export async function GET() {
  try {
    // Fetch all blog posts from Sanity
    const posts = await client.fetch(blogQueries.allPosts);

    // Generate the sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>https://verocasaai.com/</loc>
          <changefreq>weekly</changefreq>
          <priority>1.0</priority>
        </url>
        <url>
          <loc>https://verocasaai.com/blog</loc>
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>
        ${posts
          .map((post: any) => `
            <url>
              <loc>https://verocasaai.com/blog/${post.slug.current}</loc>
              <lastmod>${post._updatedAt || post.publishedAt}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.7</priority>
            </url>
          `)
          .join("")}
      </urlset>`;

    // Return the sitemap with the correct content type
    return new NextResponse(sitemap, {
      headers: { "Content-Type": "application/xml" },
    });
  } catch (error) {
    // Log the error and return a 500 response
    console.error("Error generating sitemap:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}