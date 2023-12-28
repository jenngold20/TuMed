/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["tumedimgs3.s3.amazonaws.com", "lh3.googleusercontent.com"], // Agrega tu dominio de imágenes aquí
  },
  env: {
    NEXTAUTH_SECRET: "mQ46qpFwfE1BHuqMC+qlm19qBAD9fVPgh28werwe3ASFlAfnKjM=",
    GOOGLE_CLIENT_ID:
      "608931999126-pteh88sckk8ooc82n9cgd2lno5vfh4o7.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",
  },
}

module.exports = nextConfig
