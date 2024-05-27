const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    headers: {
      "Permissions-Policy": "",
    },
  },
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "/TagesJumpTask/" : "/",
});
