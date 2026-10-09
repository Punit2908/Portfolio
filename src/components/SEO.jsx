import { useEffect } from "react";

const SITE_URL = "https://punitjangraportfolio.vercel.app";
const PROFILE_IMAGE = `${SITE_URL}/Profile-Pic.png`;

export const SOCIAL_LINKS = {
  github: "https://github.com/Punit2908",
  linkedin: "https://www.linkedin.com/in/iampunitjangra/",
  instagram: "https://www.instagram.com/punitjangra_/",
};

const DEFAULT_KEYWORDS = [
  "Punit Jangra",
  "Punit Jangra developer",
  "Punit Jangra web developer",
  "Punit Jangra MERN developer",
  "Punit Jangra portfolio",
  "MERN Stack Developer in Panipat",
  "MERN developer in Panipat",
  "hire MERN Stack Developer Panipat",
  "hire web developer Panipat",
  "MERN Stack Developer Panipat",
  "MERN Stack Developer Samalkha",
  "MERN Stack Developer Sonipat",
  "MERN Stack Developer Haryana",
  "Full Stack Developer Panipat",
  "Full Stack Developer Samalkha",
  "Full Stack Developer Sonipat",
  "Full Stack Web Developer Haryana",
  "Web Developer Panipat",
  "Web Developer Samalkha",
  "Web Developer Sonipat",
  "Web Developer Haryana",
  "React Developer Panipat",
  "React Developer Samalkha",
  "React Developer Sonipat",
  "React Developer Haryana",
  "Node.js Developer Panipat",
  "Node.js Developer Samalkha",
  "Node.js Developer Sonipat",
  "JavaScript Developer Haryana",
  "MongoDB Developer Haryana",
  "Express.js Developer Haryana",
  "MERN developer India",
  "Freelance Web Developer Panipat",
  "Freelance Web Developer Samalkha",
  "Freelance Web Developer Sonipat",
  "Website Developer Panipat",
  "Website Developer Sonipat",
  "Website Development Haryana",
  "React Node Express MongoDB",
  "MERN Stack Development",
  "Full Stack JavaScript Developer",
];

function setMeta(name, content) {
  if (!content) return;

  let element = document.head.querySelector(`meta[name="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.name = name;
    document.head.appendChild(element);
  }

  element.dataset.seoManaged = "true";
  element.content = content;
}

function setProperty(property, content) {
  if (!content) return;

  let element = document.head.querySelector(
    `meta[property="${property}"]`
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }

  element.dataset.seoManaged = "true";
  element.content = content;
}

function setLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.appendChild(element);
  }

  element.dataset.seoManaged = "true";
  element.href = href;
}

function setJsonLd(data) {
  const id = "punit-jangra-seo-jsonld";
  let script = document.getElementById(id);

  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
}

export default function SEO({
  title = "Punit Jangra | MERN Stack Developer in Panipat, Haryana",
  description = "Punit Jangra is a MERN Stack Developer in Panipat, Haryana, building modern web applications with React, Node.js, Express.js and MongoDB. Explore projects, skills and hire him for freelance web development.",
  keywords = DEFAULT_KEYWORDS.join(", "),
  image = PROFILE_IMAGE,
  url = SITE_URL,
  noindex = false,
}) {
  useEffect(() => {
    const canonicalUrl = url.replace(/\/$/, "") + "/";
    const robots = noindex
      ? "noindex, nofollow, noarchive"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

    document.title = title;

    setMeta("description", description);
    setMeta("keywords", keywords);
    setMeta("author", "Punit Jangra");
    setMeta("robots", robots);
    setMeta("googlebot", robots);
    setMeta("bingbot", noindex ? "noindex, nofollow" : "index, follow");
    setMeta("language", "English");
    setMeta("theme-color", "#09090b");
    setMeta("format-detection", "telephone=no");

    // Local / geographic signals
    setMeta("geo.region", "IN-HR");
    setMeta("geo.placename", "Panipat, Haryana, India");
    setMeta("geo.position", "29.3909;76.9635");
    setMeta("ICBM", "29.3909, 76.9635");

    setLink("canonical", canonicalUrl);

    // Open Graph
    setProperty("og:type", "profile");
    setProperty("og:site_name", "Punit Jangra Portfolio");
    setProperty("og:locale", "en_IN");
    setProperty("og:url", canonicalUrl);
    setProperty("og:title", title);
    setProperty("og:description", description);
    setProperty("og:image", image);
    setProperty("og:image:width", "500");
    setProperty("og:image:height", "500");
    setProperty(
      "og:image:alt",
      "Punit Jangra - MERN Stack Developer in Panipat, Haryana"
    );

    // X / Twitter
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);
    setMeta("twitter:image:alt", "Punit Jangra - Web Developer Portfolio");

    const personId = `${SITE_URL}/#person`;
    const websiteId = `${SITE_URL}/#website`;

    setJsonLd({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": websiteId,
          url: SITE_URL + "/",
          name: "Punit Jangra Portfolio",
          description:
            "Official portfolio of Punit Jangra, a MERN Stack Developer in Panipat, Haryana, India.",
          publisher: {
            "@id": personId,
          },
          inLanguage: "en-IN",
        },
        {
          "@type": "ProfilePage",
          "@id": `${SITE_URL}/#profile`,
          url: SITE_URL + "/",
          name: "Punit Jangra | MERN Stack Developer in Panipat, Haryana",
          isPartOf: {
            "@id": websiteId,
          },
          mainEntity: {
            "@id": personId,
          },
          inLanguage: "en-IN",
        },
        {
          "@type": "Person",
          "@id": personId,
          name: "Punit Jangra",
          givenName: "Punit",
          familyName: "Jangra",
          alternateName: [
            "Punit",
            "Punit Jangra Developer",
            "Punit Jangra Web Developer",
            "Punit Jangra MERN Developer",
            "punitjangra_",
          ],
          url: SITE_URL + "/",
          image: image,
          email: "mailto:punitjangra2742@gmail.com",
          jobTitle: "MERN Stack Developer & Full Stack Web Developer",
          description:
            "Punit Jangra is a MERN Stack and full stack web developer in Panipat, Haryana, India, specializing in React, JavaScript, Node.js, Express.js and MongoDB.",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Panipat",
            addressRegion: "Haryana",
            addressCountry: "IN",
          },
          areaServed: [
            {
              "@type": "City",
              name: "Panipat",
              containedInPlace: {
                "@type": "State",
                name: "Haryana",
              },
            },
            {
              "@type": "City",
              name: "Samalkha",
              containedInPlace: {
                "@type": "State",
                name: "Haryana",
              },
            },
            {
              "@type": "City",
              name: "Sonipat",
              containedInPlace: {
                "@type": "State",
                name: "Haryana",
              },
            },
            {
              "@type": "State",
              name: "Haryana",
            },
            {
              "@type": "Country",
              name: "India",
            },
          ],
          knowsAbout: [
            "MERN Stack",
            "Full Stack Web Development",
            "React.js",
            "JavaScript",
            "Node.js",
            "Express.js",
            "MongoDB",
            "REST API Development",
            "Frontend Development",
            "Backend Development",
            "Responsive Web Development",
            "HTML",
            "CSS",
            "Tailwind CSS",
            "Vite",
            "Git",
            "GitHub",
            "Data Structures and Algorithms",
          ],
          sameAs: [
            SOCIAL_LINKS.github,
            SOCIAL_LINKS.linkedin,
            SOCIAL_LINKS.instagram,
          ],
        },
        {
          "@type": "ProfessionalService",
          "@id": `${SITE_URL}/#service`,
          name: "Punit Jangra - MERN Stack Developer in Panipat",
          description:
            "Freelance MERN Stack and full stack web development services by Punit Jangra, serving Panipat, Samalkha, Sonipat, Kaithal and clients across Haryana and India.",
          url: SITE_URL + "/",
          image: image,
          email: "mailto:punitjangra2742@gmail.com",
          provider: {
            "@id": personId,
          },
          founder: {
            "@id": personId,
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Panipat",
            addressRegion: "Haryana",
            addressCountry: "IN",
          },
          areaServed: [
            {
              "@type": "City",
              name: "Panipat",
              containedInPlace: {
                "@type": "State",
                name: "Haryana",
              },
            },
            { "@type": "City", name: "Samalkha" },
            { "@type": "City", name: "Sonipat" },
            { "@type": "City", name: "Kaithal" },
            { "@type": "State", name: "Haryana" },
            { "@type": "Country", name: "India" },
          ],
          knowsLanguage: ["en", "hi"],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Web Development Services",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "MERN Stack Development",
                  description:
                    "Full stack web applications built with MongoDB, Express.js, React and Node.js.",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "React Frontend Development",
                  description:
                    "Fast, responsive and interactive user interfaces built with React.",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Node.js & Express API Development",
                  description:
                    "Backend services, REST APIs and server-side application logic.",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Website Development",
                  description:
                    "Modern, responsive business and portfolio websites.",
                },
              },
            ],
          },
        },
      ],
    });
  }, [title, description, keywords, image, url, noindex]);

  return null;
}
