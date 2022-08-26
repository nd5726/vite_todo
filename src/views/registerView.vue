<template>
  <main class="bg-[#FFD370]">
    <div class="flex items-center max-w-[1028px] mx-auto">
      <div class="login_left min-h-screen w-1/2"></div>
      <div class="w-1/2 p-8">
        <v-form class="max-w-[304px] text-center mx-auto">
          <h1 class="text-2xl font-bold text-left py-6 text-font-main">
            註冊帳號
          </h1>
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
              classValue="bg-white text-font-main rounded-[10px] px-4 py-3 w-full"
            ></InputText>
          </div>
          <div class="flex flex-col mb-4 items-start">
            <label class="text-base font-bold text-font-main pb-1" for=""
              >暱稱</label
            >
            <InputText
              v-model="user.nickname"
              name="nickname"
              inputType="text"
              placeHolder="請輸入您的暱稱"
              rules="required"
              labelValue="暱稱"
              classValue="bg-white text-font-main rounded-[10px] px-4 py-3 w-full"
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
              rules="required|min:6"
              labelValue="密碼"
              classValue="bg-white text-font-main rounded-[10px] px-4 py-3 w-full"
            ></InputText>
          </div>
          <div class="flex flex-col mb-6 items-start">
            <label class="text-base font-bold text-font-main pb-1" for=""
              >再次輸入密碼</label
            >
            <InputText
              name="confirmPWD"
              inputType="password"
              placeHolder="請再次輸入密碼"
              rules="required|confirmed:@password|min:6"
              labelValue="再次輸入密碼"
              classValue="bg-white text-font-main rounded-[10px] px-4 py-3 w-full"
            ></InputText>
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
            to="/login"
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
import { reactive, inject } from "vue";
import { registerUser } from "@/@types/registerUser";
import RegisterService from "@/services/registerService";
import router from "@/router";
import { InputText } from "@/components";
// import { useLoading } from "vue-loading-overlay";

const user: registerUser = reactive({
  email: "",
  nickname: "",
  password: "",
});

const $loading: any = inject("$loading");

const Submit = async () => {
  const loader = $loading.show();

  try {
    await RegisterService.register(user);
    router.push("/login");
    alert("註冊成功，請重新登入");
  } catch (e) {
    console.dir(e);
  } finally {
    loader.hide();
  }
};
</script>
