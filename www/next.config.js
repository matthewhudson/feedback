const remarkParse = require('remark-parse')
const remarkRehype = require('remark-rehype')
const rehypePrism = require('@mapbox/rehype-prism')
const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/,
  hastPlugins: [remarkParse, remarkRehype, rehypePrism]
})

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx']
})
