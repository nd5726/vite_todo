<template>
  <nav class="flex justify-between items-center py-4 bg-main-bg px-8">
    <img alt="Vue logo" src="../assets/logo_lg.png" />
    <div>
      <router-link to="/" class="text-black text-base font-bold px-3"
        >{{ nickname }}的代辦</router-link
      >
      <button
        type="button"
        @click="logOutHandler"
        class="text-black text-base font-normal px-3"
      >
        登出
      </button>
    </div>
  </nav>
  <div class="home h-screen pt-10">
    <form
      @submit="addData"
      class="bg-white rounded-[10px] max-w-[500px] mx-auto p-3 flex shadow-custom mb-4"
    >
      <input
        type="text"
        v-model="data"
        class="focus:outline-none text-base flex-grow bg-white text-black px-3"
        placeholder="新增待辦事項"
      />
      <button
        type="submit"
        class="rounded-[10px] h-[40px] w-[40px] btn-plus"
      ></button>
    </form>
    <div class="bg-white rounded-[10px] max-w-[500px] mx-auto shadow-custom">
      <div class="flex">
        <div
          class="border-b border-[#EFEFEF] w-1/3 p-4 text-center text-[#9F9A91] cursor-pointer"
        >
          全部
        </div>
        <div
          class="border-b border-[#EFEFEF] w-1/3 p-4 text-center text-[#9F9A91] cursor-pointer"
        >
          待完成
        </div>
        <div
          class="border-b border-[#EFEFEF] w-1/3 p-4 text-center text-[#9F9A91] cursor-pointer"
        >
          已完成
        </div>
      </div>
      <ul class="bg-white">
        <li
          class="flex items-center justify-between px-6"
          v-for="item in dataList"
          :key="item.id"
        >
          <div class="flex-grow border-b border-[#E5E5E5] py-4 mr-4">
            <input
              type="checkbox"
              :checked="item.completed_at !== null"
              :id="item.id"
              @change="updateHandler(item.id)"
            />
            <label class="text-sm text-font-main" :for="item.id">{{
              item.content
            }}</label>
          </div>
          <button type="button" class="btn-del"></button>
        </li>
      </ul>
      <div class="flex justify-between py-6 pl-6 pr-12 text-sm">
        <p class="text-font-main">{{ dataLength }}個待完成項目</p>
        <button @click="deleteHandler" type="button" class="text-[#9F9A91]">
          清除已完成項目
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.home {
  background: linear-gradient(
    172.7deg,
    #ffd370 5.12%,
    #ffd370 53.33%,
    #ffd370 53.44%,
    #ffffff 53.45%,
    #ffffff 94.32%
  );
}
.active {
  border-bottom: 2px solid #333333;
}
</style>

<script setup lang="ts">
import router from "@/router";
import LoginService from "@/services/loginService";
import TodoDataService from "@/services/todoDataService";
import { onMounted, computed, ref } from "vue";
import { todoData } from "@/@types/todoData";

const data = ref("");
const input = ref();

const dataList = ref<todoData[]>([]);

/** 取得nickname */
const nickname: string = document.cookie.replace(
  /(?:(?:^|.*;\s*)nickname\s*=\s*([^;]*).*$)|^.*$/,
  "$1"
);

const dataLength = computed(() => {
  return dataList.value.length;
});

onMounted(() => {});

/** 登出 */
const logOutHandler = async () => {
  try {
    const res = await LoginService.logout();
    document.cookie = "token=; nickname=;";
    alert(res.data.message);
    router.push("/login");
  } catch (e) {
    console.dir(e);
  }
};

/** 取得資料列表 */
const fetchData = async () => {
  try {
    const {
      data: { todos },
    } = await TodoDataService.getAll();
    dataList.value = todos;
  } catch (e) {}
};

const addData = async () => {
  try {
    await TodoDataService.create(data.value);
    data.value = "";
    fetchData();
  } catch (e) {
    console.dir(e);
  }
};

const deleteData = async (data: string) => {
  try {
    await TodoDataService.delete(data);
  } catch (e) {
    console.dir(e);
  }
};

const deleteHandler = async () => {
  await Promise.all(
    dataList.value.map((item) => {
      if (item.completed_at !== null) {
        return deleteData(item.id); // 要return，會return Promise
      }
    })
  );
  fetchData();
};

const updateHandler = async (data: string) => {
  try {
    const res = await TodoDataService.update(data);
    console.log(res);
    fetchData();
  } catch (e) {
    console.dir(e);
  }
};
</script>
