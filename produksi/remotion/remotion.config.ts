// Konfigurasi bundler Remotion. Komponen adegan per siklus (hasil/tracks/**/04-shots.tsx, produksi/contoh-r3/**/04-shots.tsx)
// tinggal di luar folder ini: mereka mengimpor "@r3" dan "react" yang di-resolve dari sini.
import path from "node:path";
import { Config } from "@remotion/cli/config";

const here = process.cwd();
Config.overrideWebpackConfig((c) => ({
  ...c,
  resolve: {
    ...c.resolve,
    alias: { ...(c.resolve?.alias as Record<string, string> | undefined), "@r3": path.join(here, "src/r3") },
    modules: [...(c.resolve?.modules ?? ["node_modules"]), path.join(here, "node_modules")],
  },
}));
