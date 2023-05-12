import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import json from "rollup-plugin-json";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.mjs",
      format: "es",
    },
    {
      file: "dist/index.js",
      format: "umd",
      name: "CMonitor",
    },
  ],
  plugins: [
    json(),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          declarationMap: false,
          declarationDir: `./dist/`, // 类型声明文件的输出目录
          module: 'ES2015'
        }
      },
    }),
    commonjs({ extensions: [".js", ".ts"] }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    babel({
      exclude: "node_modules/**",
    }),
    terser(),
  ],
};
