<template>
  <div>
    <el-row :gutter="20">
      <template v-if="panels.length == 0">
        <el-col :span="6" v-for="i in 4" :key="i">
          <el-skeleton style="width: 100%" animated loading>
            <template #template>
              <el-card shadow="hover" class="border-0">
                <template #header>
                  <div class="flex justify-between">
                    <el-skeleton-item variant="text" style="width: 50%"/>
                    <el-skeleton-item variant="text" style="width: 10%"/>
                  </div>
                </template>
                <el-skeleton-item variant="h3" style="width: 80%"/>
                <el-divider/>
                <div class="flex justify-between text-sm text-gray-500">
                  <el-skeleton-item variant="text" style="width: 50%"/>
                  <el-skeleton-item variant="text" style="width: 10%"/>
                </div>
              </el-card>
            </template>
          </el-skeleton>
        </el-col>
      </template>
      <el-col :span="6" :offset="0" v-for="(item, index) in panels" :key="index">
        <el-card shadow="hover" class="border-0">
          <template #header>
            <div class="flex justify-between">
              <span class="text-sm">{{ item.title }}</span>
              <el-tag :type="item.unitColor" effect="plain">
                {{ item.unit }}
              </el-tag>
            </div>
          </template>
          <span class="text-3xl font-bold text-gray-500">
            <CountTo :value="item.value"/>
          </span>
          <el-divider/>
          <div class="flex justify-between text-sm text-gray-500">
            <span>{{ item.subTitle }}</span>
            <span>{{ item.subValue }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <Index-navs/>

    <el-row :gutter="20" class="mt-5">
      <el-col :span="12" :offset="0">
        <IndexChart/>
      </el-col>
      <el-col :span="12" :offset="0">
        <IndexCard class="mb-4" :title="'店铺及商品提示'" :tip="'店铺及商品提示'" :column-data="goods"/>
        <IndexCard :title="'交易提示'" :tip="'需要立即处理的交易订单'" :column-data="orders"/>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import CountTo from "@/components/CountTo.vue";
import {useAuthStore} from '@/store/auth'
import {ref} from "vue";
import IndexNavs from "@/components/IndexNavs.vue";
import IndexChart from "@/components/IndexChart.vue";
import IndexCard from "@/components/IndexCard.vue";

const authStore = useAuthStore()

const data = [
  {
    title: "支付订单",
    unit: " 年",
    value: 55,
    subTitle: "总支付订单",
    subValue: "55"
  },
  {
    title: "订单量",
    unit: " 周",
    value: 666,
    subTitle: "转化率",
    subValue: "66%"
  },
  {
    title: "销售额",
    unit: " 年",
    value: 3.54,
    subTitle: "总销售额",
    subValue: "8.66"
  },
  {
    title: "新增用户",
    unit: " 年",
    value: 17,
    subTitle: "总用户",
    subValue: 17
  },
]

const panels = ref(data)
const getStatistics = async () => {

}

const goodsData = [
  {
    "label": "审核中",
    "value": 3,
  },
  {
    "label": "销售中",
    "value": 11,
  },
  {
    "label": "已下架",
    "value": 0,
  },
  {
    "label": "库存调整",
    "value": 0,
  }
]

const goods = ref(goodsData)

const orderData = [
  {
    "label": "待付款",
    "value": 3,
  },
  {
    "label": "待发货",
    "value": 14,
  },
  {
    "label": "已发货",
    "value": 0,
  },
  {
    "label": "退款中",
    "value": 18,
  }
]
const orders = ref(orderData)
</script>
<style>

</style>