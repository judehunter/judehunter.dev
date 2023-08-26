const {readdirSync} = require('fs');
const path = require('path');

const withRemoteRefresh = require('next-remote-refresh')({
  paths: [require('path').resolve(__dirname, './content')],
});

const { MOTIONED_URL } = process.env
module.exports = withRemoteRefresh({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    legacyBrowsers: false,
    browsersListForSwc: true,
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `/:path*`,
      },
      {
        source: '/motioned',
        destination: `${MOTIONED_URL}/motioned`,
      },
      {
        source: '/motioned/:path*',
        destination: `${MOTIONED_URL}/motioned/:path*`,
      },
    ]
  },
});
