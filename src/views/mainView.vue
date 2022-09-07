<template>
  <nav class="flex justify-between items-center py-4 bg-main-bg px-8">
    <img alt="Vue logo" src="../assets/logo_lg.png" />
    <div>
      <router-link to="/main" class="text-black text-base font-bold px-3"
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
  <div class="home h-[calc(100vh-80px)] overflow-y-auto pt-10">
    <form
      @submit="addData"
      class="bg-white rounded-[10px] max-w-[500px] mx-auto p-3 flex shadow-custom mb-4"
    >
      <input
        type="text"
        v-model="data.content"
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
          @click="showData('all')"
          :class="{
            current: current == 'all',
          }"
          class="border-b border-[#EFEFEF] w-1/3 p-4 text-center text-[#9F9A91] cursor-pointer"
        >
          全部
        </div>
        <div
          @click="showData('not_finish')"
          class="border-b border-[#EFEFEF] w-1/3 p-4 text-center text-[#9F9A91] cursor-pointer"
          :class="{
            current: current === 'not_finish',
          }"
        >
          待完成
        </div>
        <div
          @click="showData('finish')"
          :class="{
            current: current == 'finish',
          }"
          class="border-b border-[#EFEFEF] w-1/3 p-4 text-center text-[#9F9A91] cursor-pointer"
        >
          已完成
        </div>
      </div>
      <ul class="bg-white">
        <li
          class="flex items-center justify-between px-6"
          v-for="item in showList"
          :key="item.id"
        >
          <div class="flex-grow border-b border-[#E5E5E5] py-4 mr-4">
            <input
              type="checkbox"
              :checked="item.completed_at !== null"
              :id="item.id"
              @change="updateHandler(item.id!)"
            />
            <label class="text-sm text-font-main" :for="item.id">{{
              item.content
            }}</label>
          </div>
          <button
            type="button"
            @click="deleteHandler(item.id!)"
            class="btn-del"
          ></button>
        </li>
      </ul>
      <div class="flex justify-between py-6 pl-6 pr-12 text-sm">
        <p class="text-font-main">{{ dataLength }} 個待完成項目</p>
        <button
          @click="deleteFinishHandler"
          type="button"
          class="text-[#9F9A91]"
        >
          清除已完成項目
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import LoginService from "@/services/loginService";
import todoDataService from "@/services/todoDataService";
import { onMounted, computed, ref, inject } from "vue";
import { todoData } from "@/@types/todoData";

const data = ref<todoData>({} as todoData);

const current = ref<string>("all");

const dataList = ref<todoData[]>([]);

const showList = ref<todoData[]>([]);

/** 取得nickname */
const nickname: string = document.cookie.replace(
  /(?:(?:^|.*;\s*)nickname\s*=\s*([^;]*).*$)|^.*$/,
  "$1"
);

/** loading */
const $loading: any = inject("$loading");

const dataLength = computed(() => {
  return dataList.value.filter(({ completed_at }) => completed_at === null)
    .length;
});

onMounted(() => {
  fetchData();
});

/** 取得資料列表 */
const fetchData = async () => {
  const loader = $loading.show();
  try {
    const {
      data: { todos },
    } = await todoDataService.getAll();
    dataList.value = todos;
    showList.value = { ...dataList.value };
    current.value = "all";
  } catch (e) {
  } finally {
    loader.hide();
  }
};

const showData = (option: string) => {
  current.value = option;
  if (dataList.value) {
    showList.value = dataList.value.filter(({ completed_at }) => {
      switch (option) {
        case "all":
          return true;
        case "not_finish":
          return completed_at === null;
        case "finish":
          return completed_at !== null;
      }
    });
  }
};

const addData = async () => {
  try {
    await todoDataService.create(data.value);
    data.value.content = "";
    fetchData();
  } catch (e) {
    console.dir(e);
  }
};

const deleteData = async (data: string) => {
  try {
    await todoDataService.delete(data);
  } catch (e) {
    console.dir(e);
  }
};

/** 刪除項目 */
const deleteHandler = async (data: string) => {
  await deleteData(data);
  fetchData();
};

/** 清除已完成項目 */
const deleteFinishHandler = async () => {
  await Promise.all(
    dataList.value.map((item) => {
      if (item.completed_at !== null) {
        return deleteData(item.id!); // 會return Promise
      }
    })
  );
  fetchData();
};

const updateHandler = async (data: string) => {
  try {
    const res = await todoDataService.update(data);
    fetchData();
  } catch (e) {
    console.dir(e);
  }
};

/** 登出 */
const logOutHandler = async () => {
  try {
    const res = await LoginService.logout();
    document.cookie = "token=; nickname=;";
    router.push("/login");
    alert(res.data.message);
  } catch (e) {
    console.dir(e);
  }
};
</script>

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
