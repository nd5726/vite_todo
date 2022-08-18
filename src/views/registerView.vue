<template>
  <main class="bg-[#FFD370]">
    <div class="flex items-center max-w-[1028px] mx-auto">
      <div class="login_left min-h-screen w-1/2"></div>
      <div class="w-1/2 p-8">
        <v-form class="max-w-[304px] text-center mx-auto">
          <h1 class="text-2xl font-bold text-left py-6">註冊帳號</h1>
          <div class="flex flex-col mb-4 items-start">
            <label class="text-base font-bold text-font-main pb-1" for=""
              >Email</label
            >
            <v-field
              v-model="account.email"
              type="email"
              name="email"
              label="Email"
              class="bg-white text-font-main rounded-[10px] px-4 py-3 w-full"
              placeholder="請輸入Email"
              rules="required|email"
            ></v-field>
            <error-message
              name="email"
              class="text-red-700 pl-2"
            ></error-message>
          </div>
          <div class="flex flex-col mb-4 items-start">
            <label class="text-base font-bold text-font-main pb-1" for=""
              >暱稱</label
            >
            <v-field
              v-model="account.nickname"
              type="text"
              name="nickname"
              label="暱稱"
              class="bg-white text-font-main rounded-[10px] px-4 py-3 w-full"
              placeholder="請輸入您的暱稱"
              rules="required"
            ></v-field>
            <error-message
              name="nickname"
              class="text-red-700 pl-2"
            ></error-message>
          </div>
          <div class="flex flex-col mb-6 items-start">
            <label class="text-base font-bold text-font-main pb-1" for=""
              >密碼</label
            >
            <v-field
              v-model="account.password"
              type="password"
              label="密碼"
              name="password"
              class="bg-white text-font-main rounded-[10px] px-4 py-3 w-full"
              placeholder="請輸入密碼"
              rules="required|min:6"
            ></v-field>
            <error-message
              name="password"
              class="text-red-700 pl-2"
            ></error-message>
          </div>
          <div class="flex flex-col mb-6 items-start">
            <label class="text-base font-bold text-font-main pb-1" for=""
              >再次輸入密碼</label
            >
            <v-field
              type="password"
              name="confirmPWD"
              label="再次輸入密碼"
              class="bg-white text-font-main rounded-[10px] px-4 py-3 w-full"
              placeholder="請再次輸入密碼"
              rules="required|confirmed:@password|min:6"
            ></v-field>
            <error-message
              name="confirmPWD"
              class="text-red-700 pl-2"
            ></error-message>
          </div>
          <button
            type="button"
            @click="Submit"
            class="bg-font-main text-white text-base font-bold px-12 py-3 rounded-[10px]"
          >
            註冊帳號
          </button>
          <br />
          <router-link
            to="/"
            class="text-font-main inline-block text-base font-bold my-6"
            >登入</router-link
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
import { onMounted, reactive } from "vue";
import RegisterUser from "@/@types/RegisterUser";
import RegisterService from "@/services/RegisterService";

const account: RegisterUser = reactive({
  email: "",
  nickname: "",
  password: "",
});

const Submit = async () => {
  try {
    const res = await RegisterService.register(account);
    console.log(res);
  } catch (e) {
    console.dir(e);
  }
};
</script>
