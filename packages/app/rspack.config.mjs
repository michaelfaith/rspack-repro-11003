import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { TsCheckerRspackPlugin } from "ts-checker-rspack-plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * @type {import('webpack').Configuration | import('@rspack/cli').Configuration}
 */
const config = {
  mode: "development",
  devtool: false,
  entry: {
    main: "./src/index.ts",
  },
  plugins: [new HtmlWebpackPlugin(), new TsCheckerRspackPlugin()],
  output: {
    clean: true,
    path: path.resolve(__dirname, "../../dist"),
    filename: "[name].js",
  },
  experiments: {
    css: true,
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      resources: path.resolve(__dirname, "../../resources"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(j|t)s$/,
        exclude: [/[\\/]node_modules[\\/]/],
        loader: "builtin:swc-loader",
        options: {
          jsc: {
            parser: {
              syntax: "typescript",
            },
            externalHelpers: true,
            transform: {
              react: {
                runtime: "automatic",
                development: true,
                refresh: true,
              },
            },
          },
          env: {
            targets: [
              "Safari >= 16",
              "last 2 Edge version",
              "last 2 Firefox version",
              "last 2 Chrome version",
              "last 2 iOS version",
              "last 2 Android version",
              "last 2 ChromeAndroid version",
            ],
          },
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        include: path.resolve(__dirname, "../../resources"),
        type: "asset/resource",
      },
      ,
    ],
  },
};

export default config;
