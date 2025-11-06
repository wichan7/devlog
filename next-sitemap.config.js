/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // sitemap.xml
  siteUrl: process.env.SITE_URL || 'https://blog.wichan.dev',
  exclude: ['/'],
  transform: async (_, path) => {
    let newPath = path.replace(/\/posts\/posts\//, '/posts/')
    newPath = newPath.replace(/\/pages\//, '/')
    return {
      loc: `${process.env.SITE_URL || 'https://blog.wichan.dev'}${newPath}`,
      changefreq: 'weekly',
      priority: 0.7,
    }
  },
  // robots.txt
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/'],
        allow: ['/ko/', '/en/', '/ja/'],
      },
    ],
  }
}

