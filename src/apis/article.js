import { request } from "@/utils";


export function getChannelsAPI(){
    return request({
        url:'v1_0/channels',
        method:"GET"
    })
}

export function getArticleListAPI(params){
    return request({
        url:'v1_0/mp/articles',
        method:"GET",
        params
    })
}

export function getArticleByIdAPI(id){
    return request({
        url:`v1_0/mp/articles/${id}`,
        method:"GET",
    })
}

export function delArticleListAPI(id){
    return request({
        url:`v1_0/mp/articles/${id}`,
        method:"DELETE",
    })
}

export function submitArticleAPI(formdata){
    return request({
        url:'v1_0/mp/articles?draft=false',
        method:"POST",
        data:formdata
    })
}

export function editArticleAPI(data){
     return request({
        url:`v1_0/mp/articles/${data.id}?draft=false`,
        method:"PUT",
        data
    })
}