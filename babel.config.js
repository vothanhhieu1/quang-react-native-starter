module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@@': './',
          '@types': './types',
          '@actions': './actions',
          '@reducers': './reducers',
          '@libs': './libs',
          '@components': './components',
        },
      },
    ],
  ],
}
