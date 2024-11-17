import {
  CompanyName,
  CompanyPhoneNumber,
  FACEBOOK_BUSINESS_URL,
  FULL_BUSINESS_URL,
  INSTAGRAM_BUSINESS_URL,
  LINKEDIN_BUSINESS_URL,
} from '../Constants';

// Home page
export const homePageStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: CompanyName,
  url: FULL_BUSINESS_URL,
  description: `${CompanyName} provides advanced 3D simulation tools and automation solutions for gamers and developers.`,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${FULL_BUSINESS_URL}/?s={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
  sameAs: [
    FACEBOOK_BUSINESS_URL,
    INSTAGRAM_BUSINESS_URL,
    LINKEDIN_BUSINESS_URL,
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: CompanyPhoneNumber,
    contactType: 'Customer Support',
    areaServed: 'GB',
    availableLanguage: ['English'],
  },
};

export const homePageAdditionalMeta = [
  { property: 'og:title', content: `Welcome to ${CompanyName}` },
  {
    property: 'og:description',
    content: `Experience cutting-edge 3D simulations and automated routines for gaming with ${CompanyName}.`,
  },
  {
    property: 'og:image',
    content: `${FULL_BUSINESS_URL}/assets/images/homepage-preview.jpg`,
  },
  { property: 'og:url', content: FULL_BUSINESS_URL },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: `Welcome to ${CompanyName}` },
  {
    name: 'twitter:description',
    content: `Optimize your gaming experience with advanced 3D simulations and automation tools from ${CompanyName}.`,
  },
  {
    name: 'twitter:image',
    content: `${FULL_BUSINESS_URL}/assets/images/homepage-preview.jpg`,
  },
];

// Forgot password
export const forgottenPasswordPageStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Reset Password',
  description: `Reset your password for your ${CompanyName} account.`,
  url: `${FULL_BUSINESS_URL}/forgotten-password`,
};

export const forgottenPasswordPageAdditionalMeta = [
  { property: 'og:title', content: `Reset Your Password - ${CompanyName}` },
  {
    property: 'og:description',
    content: `Securely reset your ${CompanyName} account password.`,
  },
  {
    property: 'og:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/reset-password-preview.jpg`,
  },
  { property: 'og:url', content: `${FULL_BUSINESS_URL}/forgotten-password` },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: `Reset Your Password - ${CompanyName}` },
  {
    name: 'twitter:description',
    content: `Follow the steps to securely reset your ${CompanyName} account password.`,
  },
  {
    name: 'twitter:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/reset-password-preview.jpg`,
  },
];

// Login
export const loginPageStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Login',
  description: `Log in to your ${CompanyName} account to access exclusive features.`,
  url: `${FULL_BUSINESS_URL}/login`,
};

export const loginPageAdditionalMeta = [
  { property: 'og:title', content: `Login - ${CompanyName}` },
  {
    property: 'og:description',
    content: `Access your ${CompanyName} account to explore exclusive features and services.`,
  },
  {
    property: 'og:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/login-preview.jpg`,
  },
  { property: 'og:url', content: `${FULL_BUSINESS_URL}/login` },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: `Login - ${CompanyName}` },
  {
    name: 'twitter:description',
    content: `Sign in to your ${CompanyName} account and unlock access to premium features.`,
  },
  {
    name: 'twitter:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/login-preview.jpg`,
  },
];

// Register
export const registerPageStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Register',
  description: `Create an account with ${CompanyName} to access exclusive features and services.`,
  url: `${FULL_BUSINESS_URL}/register`,
};

export const registerPageAdditionalMeta = [
  { property: 'og:title', content: `Register - ${CompanyName}` },
  {
    property: 'og:description',
    content: `Sign up for a ${CompanyName} account to enjoy exclusive features and personalized services.`,
  },
  {
    property: 'og:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/register-preview.jpg`,
  },
  { property: 'og:url', content: `${FULL_BUSINESS_URL}/register` },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: `Register - ${CompanyName}` },
  {
    name: 'twitter:description',
    content: `Join ${CompanyName} today and unlock access to premium features.`,
  },
  {
    name: 'twitter:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/register-preview.jpg`,
  },
];

// Maintenance
export const maintenancePageStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Maintenance Page',
  description: `The ${CompanyName} website is currently undergoing maintenance. We’ll be back soon!`,
  url: `${FULL_BUSINESS_URL}/maintenance`,
};

export const maintenancePageAdditionalMeta = [
  { property: 'og:title', content: `We'll Be Back Soon - ${CompanyName}` },
  {
    property: 'og:description',
    content: `The ${CompanyName} website is currently undergoing maintenance. We’ll be back shortly with exciting updates.`,
  },
  {
    property: 'og:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/maintenance-preview.jpg`,
  },
  { property: 'og:url', content: `${FULL_BUSINESS_URL}/maintenance` },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: `We'll Be Back Soon - ${CompanyName}` },
  {
    name: 'twitter:description',
    content: `The ${CompanyName} website is currently undergoing maintenance. We’ll be back shortly with exciting updates.`,
  },
  {
    name: 'twitter:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/maintenance-preview.jpg`,
  },
];

// Policies page
export const termsAndPoliciesStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Terms and Policies',
  description: `Explore the terms of service and privacy policies of ${CompanyName}.`,
  url: `${FULL_BUSINESS_URL}/terms-and-policies`,
  mainEntity: {
    '@type': 'FAQPage',
    name: 'Terms and Policies FAQ',
    description: `Frequently asked questions about terms of service, privacy policies, and compliance at ${CompanyName}.`,
  },
};

export const termsAndPoliciesAdditionalMeta = [
  { property: 'og:title', content: `Terms and Policies - ${CompanyName}` },
  {
    property: 'og:description',
    content: `Understand the terms of service, privacy policies, and compliance guidelines of ${CompanyName}.`,
  },
  {
    property: 'og:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/terms-preview.jpg`,
  },
  { property: 'og:url', content: `${FULL_BUSINESS_URL}/terms-and-policies` },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: `Terms and Policies - ${CompanyName}` },
  {
    name: 'twitter:description',
    content: `Learn more about our terms of service, privacy policies, and compliance at ${CompanyName}.`,
  },
  {
    name: 'twitter:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/terms-preview.jpg`,
  },
];

// Error page
export const errorPageStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: '404 Error Page',
  description: `The requested page could not be found on ${CompanyName}.`,
  url: `${FULL_BUSINESS_URL}/404`,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${FULL_BUSINESS_URL}/?s={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export const errorPageAdditionalMeta = [
  { property: 'og:title', content: 'Page Not Found - 404' },
  {
    property: 'og:description',
    content: `Oops! The page you’re looking for isn’t here. Visit ${CompanyName} to find what you need.`,
  },
  {
    property: 'og:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/404-preview.jpg`,
  },
  { property: 'og:url', content: `${FULL_BUSINESS_URL}/404` },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: 'Page Not Found - 404' },
  {
    name: 'twitter:description',
    content: `Oops! The page you’re looking for isn’t here. Visit ${CompanyName} to find what you need.`,
  },
  {
    name: 'twitter:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/404-preview.jpg`,
  },
];

// Contact
export const contactPageStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  mainEntity: {
    '@type': 'Organization',
    name: CompanyName,
    url: FULL_BUSINESS_URL,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CompanyPhoneNumber,
      contactType: 'Technical Support',
      areaServed: 'GB',
      availableLanguage: ['English'],
    },
    sameAs: [
      FACEBOOK_BUSINESS_URL,
      INSTAGRAM_BUSINESS_URL,
      LINKEDIN_BUSINESS_URL,
    ],
    logo: {
      '@type': 'ImageObject',
      url: `${FULL_BUSINESS_URL}/assets/images/brand/logo.png`,
    },
  },
};

export const contactPageAdditionalMeta = [
  { property: 'og:title', content: `Contact ${CompanyName}` },
  {
    property: 'og:description',
    content: `Get in touch with ${CompanyName} for expert support on 3D simulation tools and automation solutions. We're here to assist you with any inquiries.`,
  },
  {
    property: 'og:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/contact-preview.jpg`,
  },
  { property: 'og:url', content: `${FULL_BUSINESS_URL}/contact` },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: `Contact ${CompanyName}` },
  {
    name: 'twitter:description',
    content: `Reach out to ${CompanyName} for professional assistance with 3D simulations and automated routines. We're here to help.`,
  },
  {
    name: 'twitter:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/contact-preview.jpg`,
  },
];

// Config
export const configurationPageStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Configuration',
  description: `Manage your preferences and account settings on the ${CompanyName} configuration page.`,
  url: `${FULL_BUSINESS_URL}/configuration`,
  isPartOf: {
    '@type': 'WebSite',
    name: CompanyName,
    url: FULL_BUSINESS_URL,
  },
};

export const configurationPageAdditionalMeta = [
  { property: 'og:title', content: `Configuration - ${CompanyName}` },
  {
    property: 'og:description',
    content: `Easily configure your ${CompanyName} account preferences and settings.`,
  },
  {
    property: 'og:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/configuration-preview.jpg`,
  },
  { property: 'og:url', content: `${FULL_BUSINESS_URL}/configuration` },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: `Configuration - ${CompanyName}` },
  {
    name: 'twitter:description',
    content: `Access and manage your ${CompanyName} account configurations and preferences.`,
  },
  {
    name: 'twitter:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/configuration-preview.jpg`,
  },
  { name: 'robots', content: 'noindex, nofollow' }, // Prevent search engines from indexing
];

// Library
export const libraryPageStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Library',
  description: `Explore the extensive library of simulations and tools offered by ${CompanyName}.`,
  url: `${FULL_BUSINESS_URL}/library`,
};

export const libraryPageAdditionalMeta = [
  { property: 'og:title', content: `Library - ${CompanyName}` },
  {
    property: 'og:description',
    content: `Browse the library of simulations and tools offered by ${CompanyName}.`,
  },
  {
    property: 'og:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/library-preview.jpg`,
  },
  { property: 'og:url', content: `${FULL_BUSINESS_URL}/library` },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: `Library - ${CompanyName}` },
  {
    name: 'twitter:description',
    content: `Explore a wide range of simulations and tools for gaming.`,
  },
  {
    name: 'twitter:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/library-preview.jpg`,
  },
];

// Simulation
export const simulationPageStructuredData = (simulation) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: `${simulation.name} - Simulation Path`,
  description: `${simulation.description}. Discover detailed robot path configurations and movement sequences provided by ${CompanyName}.`,
  url: `${FULL_BUSINESS_URL}/simulations/${simulation.slug}`,
  mainEntity: {
    '@type': 'Dataset',
    name: simulation.name,
    description: simulation.description,
    creator: {
      '@type': 'Organization',
      name: CompanyName,
      url: FULL_BUSINESS_URL,
    },
    distribution: {
      '@type': 'DataDownload',
      encodingFormat: 'application/json',
      contentUrl: `${FULL_BUSINESS_URL}/simulations/${simulation.slug}/download`,
    },
    license: 'https://creativecommons.org/licenses/by/4.0/', // Use an appropriate license if needed
    keywords: ['robot path', 'simulation', 'robotics', 'movement sequence'],
  },
});

export const simulationPageAdditionalMeta = (simulation) => [
  {
    property: 'og:title',
    content: `${simulation.name} - Simulation Path - ${CompanyName}`,
  },
  {
    property: 'og:description',
    content: `${simulation.description}. Discover this detailed simulation path for optimal robot movement.`,
  },
  {
    property: 'og:image',
    content:
      simulation.image ||
      `${FULL_BUSINESS_URL}/assets/images/default-simulation.jpg`,
  },
  {
    property: 'og:url',
    content: `${FULL_BUSINESS_URL}/simulations/${simulation.slug}`,
  },
  { name: 'twitter:card', content: 'summary_large_image' },
  {
    name: 'twitter:title',
    content: `${simulation.name} - Simulation Path - ${CompanyName}`,
  },
  {
    name: 'twitter:description',
    content: `${simulation.description}. Discover this robot path simulation for optimized movement.`,
  },
  {
    name: 'twitter:image',
    content:
      simulation.image ||
      `${FULL_BUSINESS_URL}/assets/images/default-simulation.jpg`,
  },
];
