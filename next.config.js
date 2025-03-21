/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Specifieke configuratie voor problematische ESM modules
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        assert: require.resolve("assert"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        os: require.resolve("os-browserify"),
        path: require.resolve("path-browserify"),
        zlib: require.resolve("browserify-zlib"),
      };
      
      // Fix voor bn.js probleem
      config.module.rules.push({
        test: /\.m?js$/,
        include: /node_modules/,
        resolve: {
          fullySpecified: false,
        },
      });
      
      // Extra aliasing voor modules met ESM/CJS conflicten
      config.resolve.alias = {
        ...config.resolve.alias,
        'bn.js': require.resolve('bn.js'),
      };
    }
    
    return config;
  },
};

module.exports = nextConfig;
