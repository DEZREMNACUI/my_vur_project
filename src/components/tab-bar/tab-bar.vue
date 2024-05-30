<script setup lang="ts">
import { ref, watch } from 'vue';
import tabbarData from "@/assets/data/tab-bar"
import { getAssetUrl } from "@/utils/load_assest"
import { useRoute } from 'vue-router';

const currIndex = ref(0)
const route = useRoute()
watch(route, (newRoute) => {
  const index = tabbarData.findIndex(item => item.path === newRoute.path)
  if (index === -1) return
  currIndex.value = index
})
</script>

<template>
  <div class="tab-bar">
    <van-tabbar v-model="currIndex" active-color="#ff9854" route>
      <template v-for="(item, index) in tabbarData">
        <van-tabbar-item :to="item.path">
          <template #default>
            <span>{{ item.text }}</span>
          </template>
          <template #icon>
            <img v-if="currIndex !== index" :src="getAssetUrl(item.image)" alt="">
            <img v-else :src="getAssetUrl(item.imageActive)" alt="">
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<style scoped></style>
