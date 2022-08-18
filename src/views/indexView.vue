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
          class="max-w-[300px] text-center mx-auto py-6"
        >
          <div class="flex flex-col mb-4 items-start">
            <label class="text-base font-bold text-font-main pb-1" for=""
              >Email</label
            >
            <v-field
              type="email"
              name="email"
              label="Email"
              class="bg-white text-font-main rounded-[10px] px-4 py-3 w-full"
              placeholder="請輸入Email"
              rules="required|email"
              :class="{ 'is-invalid': errors['email'] }"
            ></v-field>
            <error-message
              name="email"
              class="text-red-700 pl-2"
            ></error-message>
          </div>
          <div class="flex flex-col mb-6 items-start">
            <label class="text-base font-bold text-font-main pb-1" for=""
              >密碼</label
            >
            <v-field
              type="password"
              name="password"
              label="密碼"
              class="bg-white text-font-main rounded-[10px] px-4 py-3 w-full"
              placeholder="請輸入密碼"
              rules="required"
              :class="{ 'is-invalid': errors['password'] }"
            ></v-field>
            <error-message
              name="password"
              class="text-red-700 pl-2"
            ></error-message>
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

<script setup lang="ts"></script>
