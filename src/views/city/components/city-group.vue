<script setup lang="ts">
import { useCityStore } from '@/stores/modules/city';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

interface city {
  "cityId": number,
  "cityName": string,
  "pinYin": string,
  "gangAoTai": boolean,
  "hot": boolean,
  "longitude": string,
  "latitude": string
}
interface group {
  group: string
  cities: Array<city>
}
interface prop {
  groupData: {
    hotCities: Array<city>
  }
  cities: Array<group>
}
let props = defineProps<prop>(
)
let indexList = computed(() => {
  let list = (props.cities.map(item => item.group))
  list.unshift("#")
  return list
})

//监听城市点击
const router = useRouter()
const cityStore = useCityStore()
function cityClick(city: city) {
  cityStore.currentCity = city
  router.push("/home")
}

</script>

<template>
  <div>
    <van-index-bar :index-list="indexList">
      <van-index-anchor index="热门" />
      <div class="list">
        <template v-for="(city, index) in groupData.hotCities">
          <div class="city" @click="cityClick(city)">{{ city.cityName }}</div>
        </template>
      </div>
      <template v-for="(value) in cities">
        <van-index-anchor :index="value.group"></van-index-anchor>
        <template v-for="val in value.cities">
          <van-cell :title="val.cityName" @click="cityClick(val)" />
        </template>
      </template>
    </van-index-bar>
  </div>
</template>

<style scoped lang="less">
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;
  padding-right: 25px;

  .city {
    width: 70px;
    height: 28px;
    border-radius: 14px;
    font-size: 12px;
    color: #000;
    text-align: center;
    line-height: 28px;
    background-color: #fff4ec;
    margin: 6px 0;
  }
}
</style>
