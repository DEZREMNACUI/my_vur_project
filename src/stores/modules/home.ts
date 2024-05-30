import { getHomeCategories, getHomeHotSuggests, getHomeHouselist } from "@/services";
import { defineStore } from "pinia";


export const useHomeStore = defineStore("home", {
  state() {
    return {
      hotSuggests: [] as any,
      categories: [] as any,

      currentPage: 1,
      houselist: [] as any
    }
  },
  actions: {
    async fetchHotSuggestData() {
      const res = await getHomeHotSuggests()
      this.hotSuggests = res.data
    },
    async fetchCategoriesData() {
      const res = await getHomeCategories()
      this.categories = res.data
    },
    async fetchHouselistData() {
      const res = await getHomeHouselist(this.currentPage)
      this.houselist.push(...res.data)
      this.currentPage++
    }
  }
})