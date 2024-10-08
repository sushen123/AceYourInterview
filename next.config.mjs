/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
    images: {
      domains: [
        "api.microlink.io", // Microlink Image Preview
      ],
    },
    experimental: {
      serverComponentsExternalPackages: ['pdf2json'],
    },
   eslint: {
    ignoreDuringBuilds: true,
   },
   typescript: {
  
    ignoreBuildErrors: true,
  },
  
  };

  export default nextConfig
  