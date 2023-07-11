import axios from "axios";

const getParam = (params: { searchText?: string, itemType?: string, pageNo?: number }) => {
    let urlParam = ""
    if (params?.searchText) {
        urlParam = `&s=${params?.searchText}${urlParam}`
    }
    if (params?.itemType?.toLocaleLowerCase() !== "all") {
        urlParam = `&type=${params?.itemType?.toLocaleLowerCase()}${urlParam}`
    }
    if (params?.pageNo) {
        urlParam = `&page=${params?.pageNo}${urlParam}`
    }
    return urlParam
}

export const getitemList = (params: {}) => {
    return axios.get(`http://www.omdbapi.com/?apikey=eb4e0fa4${getParam(params)}`)
}

export const getitemDetails = (id: string = "") => {
    return axios.get(`http://www.omdbapi.com/?apikey=eb4e0fa4&i=${id}`)
}