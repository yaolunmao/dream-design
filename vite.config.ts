import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import viteSvgIcons from "vite-plugin-svg-icons";
import path from "path";
import monacoEditorPlugin from "vite-plugin-monaco-editor"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteSvgIcons({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
    }),monacoEditorPlugin()
  ],
});
