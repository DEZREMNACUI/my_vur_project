import { cyRequest } from "../request";


export function getDetailInfos(houseId: number) {
  return cyRequest.get({
    url: "/detail/infos",
    params: {
      houseId
    }
  })
}