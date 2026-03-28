import { useEffect } from 'react'

const SITE_NAME = "Gourmet Grazin'"
const SITE_URL = 'https://www.gourmetgrazinky.com'
const DEFAULT_DESCRIPTION =
  "Kentucky's premier charcuterie catering — mobile carts, grazing tables, boards & classes for weddings, corporate events and parties. Book today!"
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`

function setMeta(attr, attrValue, content) {
  let el = document.querySelector(`meta[${attr}="${attrValue}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, attrValue)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function injectJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

function removeJsonLd(id) {
  const el = document.getElementById(id)
  if (el) el.remove()
}

export default function useSEO({
  title,
  description,
  path = '',
  ogImage,
  ogType = 'website',
  jsonLd,
  noindex = false,
}) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | ${SITE_NAME}`
      : `${SITE_NAME} — Kentucky Charcuterie & Mobile Carts`
    const desc = description || DEFAULT_DESCRIPTION
    const pageUrl = path ? `${SITE_URL}${path}` : SITE_URL
    const image = ogImage || DEFAULT_OG_IMAGE

    // Title
    document.title = fullTitle

    // Core meta
    setMeta('name', 'description', desc)

    // Robots
    if (noindex) {
      setMeta('name', 'robots', 'noindex, nofollow')
    } else {
      setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
    }

    // Open Graph
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:url', pageUrl)
    setMeta('property', 'og:image', image)
    setMeta('property', 'og:type', ogType)
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('property', 'og:locale', 'en_US')

    // Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', desc)
    setMeta('name', 'twitter:image', image)
    setMeta('name', 'twitter:url', pageUrl)

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = pageUrl

    // Breadcrumb JSON-LD (auto-generated from path)
    if (path && path !== '/') {
      const breadcrumbData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: title || 'Page',
            item: pageUrl,
          },
        ],
      }
      injectJsonLd('breadcrumb-schema', breadcrumbData)
    }

    // Page-specific JSON-LD
    if (jsonLd) {
      if (Array.isArray(jsonLd)) {
        jsonLd.forEach((schema, i) => {
          injectJsonLd(`page-schema-${i}`, schema)
        })
      } else {
        injectJsonLd('page-schema-0', jsonLd)
      }
    }

    return () => {
      removeJsonLd('breadcrumb-schema')
      // Clean up page schemas
      for (let i = 0; i < 10; i++) {
        removeJsonLd(`page-schema-${i}`)
      }
    }
  }, [title, description, path, ogImage, ogType, jsonLd, noindex])
}

export { SITE_NAME, SITE_URL, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE }
