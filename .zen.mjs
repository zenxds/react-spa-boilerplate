export default {
  features: {
    mobile: true,
  },

  lint: config => {
    config.rules = {
      ...config.rules,

      // '@typescript-eslint/no-unused-vars': 'off'
    }

    return config
  },

  webpack: (env, config) => {
    return config
  },

  devServer: config => {
    return config
  },
}
