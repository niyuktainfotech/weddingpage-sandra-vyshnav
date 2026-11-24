import { useEffect } from "react";

const description =
  "You are cordially invited to celebrate the wedding of Sandra and Vyshak. View ceremony details, venue, schedule, and share our special day.";
const title = "Sandra & Vyshak Wedding Invitation | Join Us In Celebrating Love";

export function Seo() {
  useEffect(() => {
    const origin = window.location.origin;
    const canonicalUrl = `${origin}/`;
    const imageUrl = "https://sandra-vyshak.vercel.app/img-8.png";

    document.title = title;

    const metadata: Record<string, string> = {
      description,
      keywords:
        "Sandra and Vyshak wedding, wedding invitation, Ernakulam wedding, TDM Hall, Kerala wedding",
      robots: "index, follow, max-image-preview:large",
      "theme-color": "#f7f6f1",
      "og:title": title,
      "og:description": description,
      "og:image": imageUrl,
      "og:url": canonicalUrl,
      "og:type": "website",
      "og:locale": "en_IN",
      "twitter:card": "summary_large_image",
      "twitter:title": title,
      "twitter:description": description,
      "twitter:image": imageUrl,
    };

    for (const [name, content] of Object.entries(metadata)) {
      let tag = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"], meta[property="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(name.startsWith("og:") ? "property" : "name", name);
        document.head.appendChild(tag);
      }
      tag.content = content;
    }

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const weddingStructuredData = [
      {
        "@context": "https://schema.org",
        "@type": ["Event", "WeddingEvent"],
        name: "Sandra & Vyshak Wedding Ceremony",
        description,
        startDate: "2027-01-03T11:10:00+05:30",
        endDate: "2027-01-03T11:55:00+05:30",
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        image: [imageUrl],
        location: {
          "@type": "Place",
          name: "TDM Hall",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Opp. Durbar Hall Ground, Ernakulam South",
            addressLocality: "Kochi",
            addressRegion: "Kerala",
            addressCountry: "IN",
          },
        },
        organizer: { "@id": `${canonicalUrl}#couple` },
      },
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${canonicalUrl}#couple`,
        name: "Sandra & Vyshak",
        image: imageUrl,
      },
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Sandra & Vyshak Wedding",
        url: canonicalUrl,
        image: imageUrl,
      },
    ];

    let structuredData = document.getElementById("wedding-structured-data");
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.id = "wedding-structured-data";
      structuredData.setAttribute("type", "application/ld+json");
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify(weddingStructuredData).replace(/</g, "\\u003c");
  }, []);

  return null;
}
