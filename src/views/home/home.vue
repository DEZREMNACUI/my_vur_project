<template>
  <div class="home" ref="homeRef">
    <home-nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <home-search-box />
    <home-categories />
    <div class="search-bar" v-if="isShowSearchBar">
      <search-bar :start-date="'09.19'" :end-date="'09.20'" />
    </div>
    <home-content />
  </div>
</template>

<script setup lang="ts">

import { useHomeStore } from "@/stores/modules/home";
import HomeNavBar from "./components/home-nav-bar.vue"
import HomeSearchBox from "./components/home-search-box.vue";
import HomeCategories from "./components/home-categories.vue";
import HomeContent from "./components/home-content.vue";
import useScroll from "@/hooks/useScroll";
import { computed, onActivated, ref, watch } from "vue";
import SearchBar from "@/components/search-bar/search-bar.vue";

//发送网络请求
const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchCategoriesData()
homeStore.fetchHouselistData()

const homeRef = ref()
const { isReachBottom, scrollTop } = useScroll(homeRef)
watch(isReachBottom, (newVal) => {
  if (newVal) {
    homeStore.fetchHouselistData().then(() => isReachBottom.value = false)
  }
})

const isShowSearchBar = computed(() => {
  return scrollTop.value >= 400
})

onActivated(() => {
  homeRef.value.scrollTo({
    top: scrollTop.value
  })
})
</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 60px;
}

.banner {
  img {
    width: 100%;
  }
}

.search-bar {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  padding: 16px 16px 10px;
  background-color: #fff;
}
</style>
