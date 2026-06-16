type StructuredDataProps = {
    type: "organization" | "website" | "service";
    serviceName?: string;
    serviceDescription?: string;
    serviceUrl?: string;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shamiso.com";

export function StructuredData({
    type,
    serviceName,
    serviceDescription,
    serviceUrl,
}: StructuredDataProps) {
    const payload =
        type === "organization"
            ? {
                  "@context": "https://schema.org",
                  "@type": "Organization",
                  name: "Shamiso Music Distribution",
                  url: siteUrl,
                  logo: `${siteUrl}/SiteLogo.svg`,
                  sameAs: [
                      "https://www.linkedin.com/company/shamiso-music-distribution/",
                      "https://twitter.com/MusicShamiso",
                      "https://www.instagram.com/shamiso_music_distribution",
                  ],
              }
            : type === "website"
              ? {
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    name: "Shamiso Music Distribution",
                    url: siteUrl,
                    potentialAction: {
                        "@type": "SearchAction",
                        target: `${siteUrl}/search?q={search_term_string}`,
                        "query-input": "required name=search_term_string",
                    },
                }
              : {
                    "@context": "https://schema.org",
                    "@type": "Service",
                    name: serviceName,
                    description: serviceDescription,
                    provider: {
                        "@type": "Organization",
                        name: "Shamiso Music Distribution",
                        url: siteUrl,
                    },
                    url: serviceUrl,
                };

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }} />;
}
