<template>
  <h1>
    {{ callTotal }}
  </h1>
</template>

<script setup lang="ts">
import axios from "axios";
import { onMounted, ref, computed } from "vue";

const dataList = ref<Array<any>>([]);

// interface company{
//     area: string
//     industry: string
//     industry_message: ""
//     job_tenure: "1 年以下"
//     people: "2 人"
//     salary: "36~50 萬"
//     salary_score: "6"
//     scale: "6~10 人"
//     score: "5"
//     work: "實體辦公室"
// }

// interface account {
//     age:string
//     company:
// }

const salaryDate = {
  "36 萬以下": 336000,
  "36~50 萬": 430000,
  "51~60 萬": 555000,
  "61~70 萬": 655000,
  "71~80 萬": 755000,
  "81~90 萬": 855000,
  "91~100 萬": 955000,
  "101~110 萬": 1055000,
  "111~120 萬": 1155000,
  "121~130 萬": 1255000,
  "131~140 萬": 1355000,
  "141~150 萬": 1455000,
  "151~160 萬": 1555000,
  "161~170 萬": 1655000,
  "171~180 萬": 1755000,
  "181~190 萬": 1855000,
  "191~200 萬": 1955000,
  "201~300 萬": 2555000,
  "301~400 萬": 3500000,
  "400 萬以上": 4000000,
};

const callTotal = computed(() => {
  return dataList.value.length;
});

onMounted(async () => {
  await test();
  console.log(getSexTotal());
  console.log(getAverageAnnualSalary());
  console.log(getRenderTotal());
});

const test = async () => {
  const { data } = await axios.get(
    "https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json"
  );
  dataList.value = data;
  console.log(dataList.value);
};

const getSexTotal = () => {
  return {
    man: dataList.value.filter(
      ({ age, gender }) => age === "31~35 歲" && gender === "男性"
    ).length,
    woman: dataList.value.filter(
      ({ age, gender }) => age === "31~35 歲" && gender === "女性"
    ).length,
  };
};

const getAverageAnnualSalary = () => {
  const num = dataList.value.reduce((prev, { company: { salary } }) => {
    return (prev += salaryDate[salary as keyof typeof salaryDate]);
  }, 0);
  return {
    總人數: callTotal.value,
    年薪平均值: num / callTotal.value,
  };
};

const getRenderTotal = () => {
  const RenderTotal = {
    不確定這是什麼: 0,
    CSR: 0,
    SSR: 0,
  };
  dataList.value.forEach(({ first_job: { render } }) => {
    if (render.includes("不確定這是什麼")) RenderTotal["不確定這是什麼"]++;
    if (render.includes("CSR")) RenderTotal["CSR"]++;
    if (render.includes("SSR")) RenderTotal["SSR"]++;
  });
  return RenderTotal;
};
</script>
