<script setup lang="ts">
import { useCityStore } from '@/stores/modules/city';
import { ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import CityGroup from './components/city-group.vue';



const router = useRouter()

const searchValue = ref("")
function cancelClick() {
  router.push("/home")
}

const tabActive = ref()
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = toRefs(cityStore)


</script>

<template>
  <div class="city top-page">
    <div class="top">
      <van-search v-model="searchValue" placeholder="城市/区域/位置" shape="round" show-action @cancel="cancelClick" />
      <van-tabs v-model:active="tabActive" color="#ff9854" line-height="3">
        <template v-for="(value, key, index) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
      <div class="content">
        <city-group v-show="tabActive === key" :cities="value.cities" :group-data="value"  v-for="(value, key, index) in allCities"
          :key="key"></city-group>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.content {
  height: calc(100vh - 98px);
  overflow-y: auto;
}
</style>
