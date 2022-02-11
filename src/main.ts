import { createApp } from "vue";
import App from "./App.vue";
// import * as Icons from "@element-plus/icons-vue";
// import { store, key } from "./store";
// import { store } from "./store";
// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
const app = createApp(App);
// 注册全局组件
// Object.keys(Icons).forEach((key) => {
//   app.component(key, (Icons as any)[key]);
// });
// app.use(ElementPlus);
// app.use(Antd);
// app.use(store, key);
// app.use(store);
app.mount("#app");
