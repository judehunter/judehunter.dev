const {readdirSync} = require('fs');
const path = require('path');

// const filesString = readdirSync(path.join('content', 'posts/')).map((x) =>
//   path.resolve(__dirname, path.join('content', 'posts/', x)),
// );

// console.log(filesString);

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
