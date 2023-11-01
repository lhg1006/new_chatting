/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        HOST : process.env.NEXT_PUBLIC_ENV_HOST,
        SERVER_PORT : process.env.NEXT_PUBLIC_ENV_PORT,
        SOCKET_PORT : process.env.NEXT_PUBLIC_SOCKET_PORT,
        API_PORT : process.env.NEXT_PUBLIC_API_PORT
    },
}

module.exports = nextConfig
