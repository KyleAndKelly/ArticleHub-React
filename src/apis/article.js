import { request } from "@/utils";


export function getChannelsAPI(){
    return request({
        url:'v1_0/channels',
        method:"GET"
    })
}

export function submitArticleAPI(formdata){
    return request({
        url:'v1_0/mp/articles?draft=false',
        method:"POST",
        data:formdata
    })
}