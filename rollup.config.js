import path from 'path';
import alias from '@rollup/plugin-alias';
import ascii from "rollup-plugin-ascii";
import node from "rollup-plugin-node-resolve";
import {terser} from "rollup-plugin-terser";
import * as meta from "./package.json";

const copyright = `// ${meta.homepage} v${meta.version} Copyright ${(new Date).getFullYear()} ${meta.author.name}`;

function onwarn(message, warn) {
  if (message.code === "CIRCULAR_DEPENDENCY") return;
  warn(message);
}

const projectRootDir = path.resolve(__dirname);

const packages = [
  "d3-array",
  "d3-axis",
  "d3-brush",
  "d3-chord",
  "d3-collection",
  "d3-color",
  "d3-contour",
  "d3-dispatch",
  "d3-drag",
  "d3-dsv",
  "d3-ease",
  "d3-fetch",
  "d3-force",
  "d3-format",
  "d3-geo",
  "d3-hierarchy",
  "d3-interpolate",
  "d3-path",
  "d3-polygon",
  "d3-quadtree",
  "d3-random",
  "d3-scale",
  "d3-scale-chromatic",
  "d3-selection",
  "d3-shape",
  "d3-time",
  "d3-time-format",
  "d3-timer",
  "d3-transition",
  "d3-voronoi",
  "d3-zoom",
]

const plugins = [
  alias({
    entries: packages.map(name => ({
      find: name,
      replacement: path.resolve(projectRootDir, name, "src", "index")
    }))
  })
];

export default [
  {
    input: "index.js",
    output: {
      file: "dist/d3.node.js",
      format: "cjs",
    },
    plugins,
    onwarn
  },
  {
    input: "index.js",
    plugins: [
      node(),
      ascii()
    ],
    output: {
      extend: true,
      banner: copyright,
      file: "dist/d3.js",
      format: "umd",
      indent: false,
      name: "d3",
    },
    plugins,
    onwarn
  },
  {
    input: "index.js",
    plugins: [
      node(),
      ascii(),
      terser({output: {preamble: copyright}})
    ],
    output: {
      extend: true,
      file: "dist/d3.min.js",
      format: "umd",
      indent: false,
      name: "d3",
    },
    plugins,
    onwarn
  }
];
