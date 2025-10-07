/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://blog.wichan.dev',
  generateRobotsTxt: true,
  transform: async (_, path) => {
    const newPath = path.replace(/\/posts\/posts\//, '/posts/');
    return {
      loc: `${process.env.SITE_URL || 'https://blog.wichan.dev'}${newPath}`,
      changefreq: 'weekly',
      priority: 0.7,
    }
  }
}

