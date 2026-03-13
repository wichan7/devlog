/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://blog.wichan.dev',
  generateRobotsTxt: true,
  transform: async (_, path) => {
    // `/posts/posts/` to `/posts`
    let newPath = path.replace(/\/posts\/posts\//, '/posts/')
    // `/pages/` to `/`
    newPath = newPath.replace(/\/pages\//, '/')
    // `/ko/...` to `/...` (default locale served without prefix)
    newPath = newPath.replace(/^\/ko(?=\/|$)/, '') || '/'

    return {
      loc: `${process.env.SITE_URL || 'https://blog.wichan.dev'}${newPath}`,
      changefreq: 'weekly',
      priority: 0.7,
    }
  }
}

