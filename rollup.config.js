import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import vue from "rollup-plugin-vue";
import css from "rollup-plugin-import-css";

import packageJson from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      format: "cjs",
      file: packageJson.main,
      sourcemap: true,
      globals: {'vue': 'Vue'}
    },
    {
      format: "esm",
      file: packageJson.module,
      sourcemap: true,
      globals: {'vue': 'Vue'}
    },
  ],
  external: ['vue'],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript(),
    vue(),
    css(),
  ],
};
