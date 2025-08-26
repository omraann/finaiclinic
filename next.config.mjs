/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'customer-assets.emergentagent.com' },
      { protocol: 'https', hostname: 'dummyimage.com' },
      { protocol: 'https', hostname: 'lottie.host' },
      { protocol: 'https', hostname: 'assets1.lottiefiles.com' },
      { protocol: 'https', hostname: 'assets3.lottiefiles.com' },
      { protocol: 'https', hostname: 'assets5.lottiefiles.com' },
      { protocol: 'https', hostname: 'assets9.lottiefiles.com' }
    ]
  },
  // Remove output: 'export' and trailingSlash for Vercel compatibility
  // Remove experimental optimizeCss to prevent build issues
};
export default nextConfig;