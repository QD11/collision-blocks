import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [tsconfigPaths()],
});
// https://vitejs.dev/config/
// export default defineConfig({
//     build: {
//         lib: {
//             entry: "src/my-element.ts",
//             formats: ["es"],
//         },
//         rollupOptions: {
//             external: /^lit/,
//         },
//     },
// });
