import { site, services, serviceArea, allCities, specs } from '../siteConfig';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    image: new URL(site.ogImage, site.url).toString(),
    logo: {
      '@type': 'ImageObject',
      url: new URL('/logo-mark.svg', site.url).toString(),
      caption: site.name,
    },
    founder: { '@type': 'Person', name: site.founder },
    foundingDate: site.creationDate,
    foundingLocation: {
      '@type': 'Place',
      name: 'Le Gosier, Guadeloupe',
    },
    taxID: site.siren,
    vatID: site.vat,
    naics: site.ape,
    identifier: [
      { '@type': 'PropertyValue', propertyID: 'SIREN', value: site.siren },
      { '@type': 'PropertyValue', propertyID: 'RCS', value: `${site.rcsNumber} R.C.S. ${site.rcs}` },
      { '@type': 'PropertyValue', propertyID: 'VAT', value: site.vat },
      { '@type': 'PropertyValue', propertyID: 'APE', value: site.ape },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 16.215,
      longitude: -61.493,
    },
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: serviceArea.region,
        identifier: serviceArea.departmentCode,
      },
      ...allCities.map((c) => ({ '@type': 'City', name: c })),
    ],
    // Rayon d'intervention explicite : signal fort pour le pack local Google.
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: { '@type': 'GeoCoordinates', latitude: 16.215, longitude: -61.493 },
      geoRadius: '90000',
    },
    priceRange: site.priceRange,
    currenciesAccepted: 'EUR',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [...site.openingHours.days],
        opens: site.openingHours.opens,
        closes: site.openingHours.closes,
      },
    ],
    serviceType: services.map((s) => s.name),
    knowsAbout: [
      'Scan 3D LiDAR',
      'Scan-to-BIM',
      'Nuage de points',
      'Relevé topographique',
      'Modélisation BIM Revit',
      'Modélisation ArchiCAD',
      'Jumeau numérique industriel',
      'Numérisation du patrimoine',
      'FJD Trion P2',
      'Relevé d\u2019existant',
      'Plans DWG',
      'Visite virtuelle WebGL',
      'Scan 3D Guadeloupe',
    ],
    sameAs: [],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services Metrie GP',
      itemListElement: services.map((s, i) => ({
        '@type': 'Offer',
        position: i + 1,
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          description: s.short,
          provider: { '@id': `${site.url}/#organization` },
        },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { '@id': `${site.url}/#organization` },
    inLanguage: 'fr-FR',
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: new URL(it.path, site.url).toString(),
    })),
  };
}

export function faqSchema(qa: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qa.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function blogPostingSchema(article: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
  path: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: { '@type': article.author && article.author !== site.name ? 'Person' : 'Organization', name: article.author || site.name },
    publisher: { '@id': `${site.url}/#organization` },
    image: new URL(article.image || site.ogImage, site.url).toString(),
    url: new URL(article.path, site.url).toString(),
    mainEntityOfPage: new URL(article.path, site.url).toString(),
    inLanguage: 'fr-FR',
  };
}

export function serviceSchema(s: {
  name: string;
  description: string;
  path: string;
  deliverables?: readonly string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': new URL(s.path, site.url).toString() + '#service',
    name: s.name,
    description: s.description,
    url: new URL(s.path, site.url).toString(),
    serviceType: s.name,
    provider: { '@id': `${site.url}/#organization` },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: serviceArea.region,
      identifier: serviceArea.departmentCode,
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: new URL('/contact', site.url).toString(),
      servicePhone: site.phone[0],
    },
    ...(s.deliverables
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: `Livrables — ${s.name}`,
            itemListElement: s.deliverables.map((d, i) => ({
              '@type': 'Offer',
              position: i + 1,
              itemOffered: { '@type': 'Service', name: d },
            })),
          },
        }
      : {}),
  };
}

/** ItemList pour une page hub (ex. /services) — aide Google à voir la structure. */
export function itemListSchema(items: { name: string; path: string; description?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      description: it.description,
      url: new URL(it.path, site.url).toString(),
    })),
  };
}

/** Fiche produit/équipement — utilisée sur /outils pour le scanner. */
export function equipmentSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: specs.scanner,
    category: 'Scanner laser 3D',
    description: `Scanner laser mobile ${specs.scanner} utilisé par ${site.name} : portée ${specs.range} (${specs.rangeDetail}), précision relative ${specs.precisionRelative}, précision absolue ${specs.precisionAbsolute}.`,
    brand: { '@type': 'Brand', name: 'FJDynamics' },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Portée', value: specs.range },
      { '@type': 'PropertyValue', name: 'Précision relative', value: specs.precisionRelative },
      { '@type': 'PropertyValue', name: 'Précision absolue', value: specs.precisionAbsolute },
    ],
  };
}
