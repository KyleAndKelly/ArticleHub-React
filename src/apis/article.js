import { request } from "@/utils";


export function getChannelsAPI(){
    return request({
        url:'v1_0/channels',
        method:"GET"
    })
}