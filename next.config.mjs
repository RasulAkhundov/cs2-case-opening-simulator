/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: false,
   images: {
      domains: ['raw.githubusercontent.com'],
   },
   // Enable static page generation
   output: 'standalone',
   // Optimize page loading
   swcMinify: true,
   // Enable page compression
   compress: true,
   // Configure trailing slashes
   trailingSlash: false,
   // Enable automatic static optimization
   experimental: {
      optimizeCss: true
   }
};

export default nextConfig;