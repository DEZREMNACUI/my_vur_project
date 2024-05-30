import { getCityAll } from "@/services";
import { defineStore } from "pinia";



export const useCityStore = defineStore("city", {
  state() {
    return {
      allCities: {} as any,

      currentCity: {
        cityName: "广州"
      }
    }
  },
  actions: {
    async fetchAllCitiesData() {
      const res = await getCityAll()
      this.allCities = res.data
    }
  }
})

