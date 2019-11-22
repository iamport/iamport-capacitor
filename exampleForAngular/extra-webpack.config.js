module.exports = {
  module: {
    rules: [
      {
        test   : /\.less$/,
        loader: 'less-loader',
        options: {
          modifyVars: { // modify theme variable
            'primary-color': '#344e81',
          },
          javascriptEnabled: true
        }
      }
    ]
  }
};