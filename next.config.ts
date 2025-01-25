import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/a/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
      }
    ],
    domains: [
      "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      "s3-alpha-sig.figma.com",
      "d8it4huxumps7.cloudfront.net"
    ],
  }
};

export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//     "type": "setting",
//     "settings": {
//       "images.domains": ["hebbkx1anhila5yf.public.blob.vercel-storage.com",'s3-alpha-sig.figma.com',"d8it4huxumps7.cloudfront.net","hebbkx1anhila5yf.public.blob.vercel-storage.com"]
//     }
//   };

// export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: [
//       "hebbkx1anhila5yf.public.blob.vercel-storage.com",
//       "s3-alpha-sig.figma.com",
//       "d8it4huxumps7.cloudfront.net"
//     ],
//   },
// };

// export default nextConfig;
