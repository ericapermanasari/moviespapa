// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'image.tmdb.org',
      'placehold.co'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // ✅ PERBAIKAN: Ganti experimental.turbo dengan turbopack
  turbopack: {
    // Konfigurasi turbopack (jika ada)
  },
  // Opsional: untuk optimisasi deployment
  output: 'standalone', 
}

module.exports = nextConfig;