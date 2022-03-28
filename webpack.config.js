var path = require('path');
module.exports = {
  entry: './src/TableLazy.tsx',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    // LA LINEA DE AQUI ABAJO ES LA MAS IMPORTANTE!
    // :mindblow: Perdí mas de 2 dias hasta darme cuenta que esta es la linea mas importante de toda esta guia.
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  externals: {
    // La linea de aqui abajo es solo para indicar que vamos a utilizar la dependencia "React" de parent-testing-project.
    'react': 'commonjs react'
  }
};
