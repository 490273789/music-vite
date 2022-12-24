module.exports = {
  compilerOptions: {
    target: 'ES6',
    module: 'commonjs',
    allowSyntheticDefaultImports: true,
    baseUrl: './',
    paths: {
      '@/*': ['src/*']
    }
  },
  exclude: ['node_modules']
}
