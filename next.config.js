/** @type {import('next').NextConfig} */
module.exports = {
  async redirects() {
    return [
      {
        source: '/films',
        destination: '/film',
        permanent: false,
      },
    ];
  },
};
