import type { NextConfig } from "next";

const config: NextConfig = {
  // Pin the trace root to this project; a stray lockfile further up the tree
  // otherwise makes Next infer the wrong workspace root.
  outputFileTracingRoot: __dirname,
};

export default config;
