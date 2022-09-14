const {rmSync} = require('fs');

if (process.env.VERCEL_ENV === 'preview') {
  rmSync('public/robots.txt');
  rmSync('public/sitemap.xml');
}
