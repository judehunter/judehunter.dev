const {readdirSync} = require('fs');
const path = require('path');

const withRemoteRefresh = require('next-remote-refresh')({
  paths: [require('path').resolve(__dirname, './content')],
});

module.exports = withRemoteRefresh({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
});
