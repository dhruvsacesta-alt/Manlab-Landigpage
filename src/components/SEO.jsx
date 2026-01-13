import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
    title,
    description,
    name = "Man Labs India",
    type = "website",
    image = "/og-image.png",
    url = "https://manlabs.com"
}) => {
    const fullTitle = `${title} | ${name}`;

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{fullTitle}</title>
            <meta name='description' content={description} />
            <link rel="canonical" href={url} />

            {/* Open Graph tags (Facebook, WhatsApp, Instagram) */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content={name} />

            {/* Twitter tags */}
            <meta name="twitter:creator" content="@manlabsindia" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* JSON-LD Structured Data for Organization */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Man Labs",
                    "url": "https://manlabs.com",
                    "logo": "https://manlabs.com/logo.png",
                    "sameAs": [
                        "https://twitter.com/manlabsindia",
                        "https://instagram.com/manlabsindia",
                        "https://linkedin.com/company/manlabs"
                    ],
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "telephone": "+91-8800-MANLAB",
                        "contactType": "customer service",
                        "areaServed": "IN",
                        "availableLanguage": "en"
                    }
                })}
            </script>
        </Helmet>
    );
};

export default SEO;
