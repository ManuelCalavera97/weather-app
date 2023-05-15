module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      [
        "module-resolver",
        {
          root: ["."],
          extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
            ".android.js",
            ".android.tsx",
            ".ios.js",
            ".ios.tsx",
          ],
          alias: {
            "@app/*": ["app/*"],
            "@assets/*": ["app/assets/*"],
            "@components/*": ["app/components/*"],
            "@helpers/*": ["app/helpers/*"],
            "@screens/*": ["app/screens/*"],
            "@services/*": ["app/services/*"],
            "@customTypes/*": ["app/customTypes/*"],
          },
        },
      ],
    ],
  };
};
