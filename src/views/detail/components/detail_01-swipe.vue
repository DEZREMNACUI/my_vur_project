<script setup lang="ts">
import { useDetailStore } from '@/stores/modules/detail';
import { storeToRefs } from 'pinia';
import { computed, onMounted, onUnmounted, onUpdated, toRefs } from 'vue';

const detailStore = useDetailStore()
const { swipeData } = storeToRefs(detailStore)
let swipeGroup = computed(() => swipeData.value.reduce((acc: any, curr: any) => {
  if (!acc[(curr.enumPictureCategory)]) {
    acc[(curr.enumPictureCategory)] = []
  }
  acc[(curr.enumPictureCategory)].push(curr)
  return acc
}, {}))

const nameReg = /【(.*?)】/i
const getName = (name: string): string => {
  return nameReg.exec(name)![1]
}

function getCategoryIndex(item: any): number {
  return swipeGroup.value[item.enumPictureCategory].findIndex((data: any) => {
    return data === item
  }) + 1
}



</script>

<template>
  <div class="swipe">
    <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
      <template v-for="(item, index) in swipeData">
        <van-swipe-item class="item">
          <img :src="item.url" alt="">
        </van-swipe-item>
      </template>

      <template #indicator="{ active, total }">
        <!-- <div class="indicator">{{ active }}/{{ swipeData.length }}-{{ total }}</div> -->
        <div class="indicator">
          <template v-for="(value, key, index) in swipeGroup" :key="key">
            <span class="item" :class="{ active: swipeData[active]?.enumPictureCategory == key }">
              <span class="text">{{ getName(value[0].title) }}</span>
              <span class="count" v-if="swipeData[active]?.enumPictureCategory == key">
                {{ getCategoryIndex(swipeData[active]) }}/{{ value.length }}
              </span>
            </span>
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<style scoped>
.swipe {
  .swipe-list {
    .item {
      img {
        width: 100%;
      }
    }

    .indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      display: flex;
      padding: 2px 5px;
      font-size: 12px;
      color: #fff;
      background: rgba(0, 0, 0, 0.8);

      .item {
        margin: 0 3px;

        &.active {
          padding: 0 3px;
          border-radius: 5px;
          background-color: #fff;
          color: #333;
        }
      }
    }
  }
}
</style>
