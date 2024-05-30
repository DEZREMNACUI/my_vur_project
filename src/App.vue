<script setup lang="ts">
import { useRoute } from 'vue-router';
import TabBar from './components/tab-bar/tab-bar.vue';
import Loading from './components/loading/loading.vue';

const route = useRoute()
</script>

<template>
  <div class="app">
    <router-view #default="props">
      <keep-alive include="home">
        <component :is="props.Component"></component>
      </keep-alive>
    </router-view>
    <tab-bar v-if="!route.meta.hideTabBar"></tab-bar>
    <Loading />
  </div>
</template>

<style scoped></style>
