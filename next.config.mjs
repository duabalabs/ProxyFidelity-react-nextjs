/** @type {import('next').NextConfig} */
const nextConfig = {

  typescript: {
    // Skip type checking during the build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Skip ESLint checks during the build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
