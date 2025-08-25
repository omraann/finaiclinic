/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'customer-assets.emergentagent.com' },
      { protocol: 'https', hostname: 'dummyimage.com' },
      { protocol: 'https', hostname: 'assets1.lottiefiles.com' },
      { protocol: 'https', hostname: 'assets3.lottiefiles.com' },
      { protocol: 'https', hostname: 'assets5.lottiefiles.com' }
    ]
  },
  experimental: {
    optimizeCss: true
  },
  output: 'export',
  trailingSlash: true,
};
export default nextConfig;