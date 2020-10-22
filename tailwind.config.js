module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  purge: [],
  theme: {
    extend: {
      colors: {
        purple: {
          100: '#c5b1e1',
          300: '#563b7c',
          500: '#2b1b4d',
        },
        'card-gray': '#6d7b83',
        'greyish-blue': '#202a47',
        'universe-blue': '#1f3a89',
      },
    },
  },
  variants: {},
  plugins: [],
};
