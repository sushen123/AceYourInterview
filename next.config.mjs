/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        "api.microlink.io", // Microlink Image Preview
      ],
    },
    experimental: {
      serverComponentsExternalPackages: ['pdf2json'],
    },
  };

  export default nextConfig
  