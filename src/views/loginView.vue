<template>
  <main class="bg-[#FFD370]">
    <div class="flex items-center max-w-[1028px] mx-auto">
      <div class="login_left min-h-screen w-1/2"></div>
      <div class="w-1/2 p-8">
        <h1 class="text-2xl text-font-main font-bold text-center">
          最實用的線上代辦事項服務
        </h1>
        <v-form
          v-slot="{ errors }"
          @submit="submitHandler"
          class="max-w-[300px] text-center mx-auto py-6"
        >
          <div class="flex flex-col mb-4 items-start">
            <label class="text-base font-bold text-font-main pb-1" for=""
              >Email</label
            >
            <InputText
              v-model="user.email"
              name="email"
              inputType="email"
              placeHolder="請輸入Email"
              rules="required|email"
              labelValue="Email"
              :classValue="['bg-white text-font-main rounded-[10px] px-4 py-3 w-full' , { 'is-invalid': errors['email'] }]"
            ></InputText>

          </div>
          <div class="flex flex-col mb-6 items-start">
            <label class="text-base font-bold text-font-main pb-1" for=""
              >密碼</label
            >
            <InputText
              v-model="user.password"
              name="password"
              inputType="password"
              placeHolder="請輸入密碼"
              rules="required"
              labelValue="密碼"
              :classValue="['bg-white text-font-main rounded-[10px] px-4 py-3 w-full' , { 'is-invalid': errors['password'] }]"
            ></InputText>
          </div>
          <button
            type="submit"
            class="bg-font-main text-white text-base font-bold px-12 py-3 rounded-[10px]"
          >
            登入
          </button>
          <br />
          <router-link
            to="/register"
            class="text-font-main inline-block text-base font-bold my-6"
            >註冊帳號</router-link
          >
        </v-form>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
.login_left {
  background-image: url("../assets/left.png");
  background-repeat: no-repeat;
  background-position: center center;
}
</style>

<script setup lang="ts">
import { reactive } from "vue";
import { accountUser } from "@/@types/accountUser";
import LoginService from "@/services/loginService";
import router from "@/router";
import { InputText } from "@/components";

const user: accountUser = reactive({
  email: "",
  password: "",
});

const login = async () => {
  try {
    const res = await LoginService.login(user);
    console.log(res);
    const { authorization } = res.headers;
    const { nickname } = res.data;

    document.cookie = `token=${authorization};`;
    document.cookie = `nickname=${nickname};`;

    router.push("/main");
  } catch (e) {
    console.dir(e);
  }
};

const submitHandler = () => {
  login();
};
</script>
