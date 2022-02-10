import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import viteSvgIcons from "vite-plugin-svg-icons";
import monacoEditorPlugin from "vite-plugin-monaco-editor";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    viteSvgIcons({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
    }),monacoEditorPlugin()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/export.ts"),
      name: "dream-design",
      fileName: (format) => `dream-design.${format}.ts`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
