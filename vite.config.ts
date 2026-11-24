import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

const getSiteUrl = () => {
  const configuredUrl = process.env.VITE_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL
  const parsedUrl = new URL(
    configuredUrl
      ? configuredUrl.startsWith('http') ? configuredUrl : `https://${configuredUrl}`
      : 'https://weddingpage-sandra-vyshnav.vercel.app',
  )

  if (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') {
    throw new Error('VITE_SITE_URL must use HTTPS or HTTP')
  }

  return parsedUrl.origin
}

const weddingSiteFiles = (): Plugin => ({
  name: 'wedding-site-files',
  transformIndexHtml(html) {
    const siteUrl = getSiteUrl()
    const canonicalUrl = `${siteUrl}/`
    const imageUrl = 'https://sandra-vyshak.vercel.app/img-8.png'
    const description = 'You are cordially invited to celebrate the wedding of Sandra and Vyshak. View ceremony details, venue, schedule, and share our special day.'
    const structuredData = [
      {
        '@context': 'https://schema.org',
        '@type': ['Event', 'WeddingEvent'],
        name: 'Sandra & Vyshak Wedding Ceremony',
        description,
        startDate: '2027-01-03T11:10:00+05:30',
        endDate: '2027-01-03T11:55:00+05:30',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        image: [imageUrl],
        location: {
          '@type': 'Place',
          name: 'TDM Hall',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Opp. Durbar Hall Ground, Ernakulam South',
            addressLocality: 'Kochi',
            addressRegion: 'Kerala',
            addressCountry: 'IN',
          },
        },
        organizer: { '@id': `${canonicalUrl}#couple` },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': `${canonicalUrl}#couple`,
        name: 'Sandra & Vyshak',
        image: imageUrl,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Sandra & Vyshak Wedding',
        url: canonicalUrl,
        image: imageUrl,
      },
    ]
    const schemaScript = `<script id="wedding-structured-data" type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, '\\u003c')}</script>`

    return html
      .replaceAll('__SITE_URL__', siteUrl)
      .replace('</head>', `${schemaScript}</head>`)
  },
  generateBundle() {
    const siteUrl = getSiteUrl()
    this.emitFile({
      type: 'asset',
      fileName: 'sitemap.xml',
      source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${siteUrl}/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url></urlset>`,
    })
    this.emitFile({
      type: 'asset',
      fileName: 'robots.txt',
      source: `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`,
    })
  },
})

export default defineConfig({
  plugins: [react(), weddingSiteFiles()],
})
