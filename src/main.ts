import { createApp } from "vue";

import { Field, Form, ErrorMessage, defineRule, configure } from "vee-validate";
import { localize, setLocale } from "@vee-validate/i18n";
import zh_TW from "@vee-validate/i18n/dist/locale/zh_TW.json";
import AllRules from "@vee-validate/rules";

import App from "./App.vue";
import router from "./router";

import "./css/style.css";
import "./css/index.css";

const app = createApp(App);

configure({
  generateMessage: localize({ zh_TW }),
  validateOnInput: false, // 當輸入任何內容直接進行驗證
});

setLocale("zh_TW");

/** 加入vee-validate全部rule */
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

app.component("VForm", Form);
app.component("VField", Field);
app.component("ErrorMessage", ErrorMessage);

app.use(router);
app.mount("#app");
