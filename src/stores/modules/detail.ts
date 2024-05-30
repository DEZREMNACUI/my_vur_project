import { getDetailInfos } from "@/services/modules/detail";
import { defineStore } from "pinia";


export const useDetailStore = defineStore("detail", {
  state() {
    return {
      houseId: 0,
      detailInfos: null as any,
      swipeData: null as any,
      topInfos: null as any,
      houseFacility: null as any,
      landlord: null as any,
      comment: null as any,
      orderRules: null as any,
      priceIntro: null as any
    }
  },
  actions: {
    async fetchDetailData() {
      getDetailInfos(this.houseId).then(res => {
        this.detailInfos = res.data
        this.swipeData = res.data.mainPart.topModule.housePicture.housePics
        this.topInfos = res.data.mainPart.topModule
        this.houseFacility = res.data.mainPart.dynamicModule.facilityModule.houseFacility
        this.landlord = res.data.mainPart.dynamicModule.landlordModule
        this.comment = res.data.mainPart.dynamicModule.commentModule
        this.orderRules = res.data.mainPart.dynamicModule.rulesModule.orderRules
        this.priceIntro = res.data.mainPart.introductionModule
      })
    }
  }
})