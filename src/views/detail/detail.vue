<script setup lang="ts">
import router from '@/router';
import { useDetailStore } from '@/stores/modules/detail';
import { computed, onMounted, ref, toRaw, toRefs, watch, type ComponentPublicInstance, type VNode, type VNodeRef } from 'vue';
import { useRoute } from 'vue-router';
import Detail_01Swipe from './components/detail_01-swipe.vue';
import Detail_02Infos from './components/detail_02-infos.vue';
import Detail_03Facility from './components/detail_03-facility.vue';
import Detail_04Landlord from './components/detail_04-landlord.vue';
import Detail_05Comment from './components/detail_05-comment.vue';
import Detail_06Notice from './components/detail_06-notice.vue';
import Detail_08Intro from './components/detail_08-intro.vue';
import TabControl from '@/components/tab-control/tab-control.vue';
import useScroll from '@/hooks/useScroll';

const detailStore = useDetailStore()
const route = useRoute()
detailStore.houseId = route.params.id as any as number
detailStore.fetchDetailData()
const { detailInfos: mainPart } = toRefs(detailStore)
function onClickLeft() {
  router.back()
}

window.scrollTo(0, 0)

//tabControl相关操作
const { scrollTop } = useScroll()
const showTabControl = computed(() => scrollTop.value >= 300)
const sectionEls = ref()
sectionEls.value = {}
const names = computed(() => Object.keys(sectionEls.value))
const isComponentPublicInstance = (value: any): value is ComponentPublicInstance => {
  return true
}
const getSectionRef: VNodeRef = (value: Element | ComponentPublicInstance | null) => {
  if (isComponentPublicInstance(value)) {
    const name = value?.$el.getAttribute("name")
    sectionEls.value[name] = value?.$el
  }
}
let isClick = false
let currentDistance = -1
function tabClick(index: number) {
  const key = Object.keys(sectionEls.value)[index]
  const el = sectionEls.value[key]
  let instance = el.offsetTop
  if (index !== 0) {
    instance = instance - 44
  }
  isClick = true
  currentDistance = instance
  window.scrollTo({
    top: instance,
    behavior: 'smooth'
  })
}

//页面滚动,滚动时匹配对应的tabControll的index
const tabControlRef = ref()
watch(scrollTop, (newValue) => {
  if (newValue === currentDistance) {
    isClick = false
  }
  if (isClick) return
  //获取所有区域的offsetTops
  const els = Object.values<HTMLDivElement>(sectionEls.value)
  const values = els.map((el: HTMLDivElement) => el.offsetTop)
  //根据newValue去匹配索引
  let index = values.length - 1
  for (let i = 0; i < values.length; i++) {
    if (values[i] > newValue + 44) {
      index = i - 1
      break
    }
  }
  if (tabControlRef.value?.currentIndex !== undefined) {
    tabControlRef.value.currentIndex = index
  }
})
</script>

<template>
  <tab-control v-if="showTabControl" class="tabs" :titles="names" @tabItemClick="tabClick" ref="tabControlRef" />
  <van-nav-bar title="房屋详情" left-text="旅途" left-arrow @click-left="onClickLeft" />
  <div class="main" v-if="mainPart">
    <detail_01-swipe />
    <detail_02-infos name="描述" :ref="getSectionRef" />
    <detail_03-facility name="设施" :ref="getSectionRef" />
    <detail_04-landlord name="房东" :ref="getSectionRef" />
    <detail_05-comment name="评论" :ref="getSectionRef" />
    <detail_06-notice name="须知" :ref="getSectionRef" />
    <detail_08-intro />
  </div>
  <div class="footer">
    <img src="@/assets/img/detail/icon_ensure.png" alt="">
    <div class="text">弘源旅途, 永无止境!</div>
  </div>
</template>

<style scoped>
.tabs {
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;
  margin-top: 60px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>
