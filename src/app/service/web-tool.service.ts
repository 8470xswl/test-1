import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Storage } from "@ionic/storage-angular"
import { CustomizeTextResponse, LightRecordingResponse } from "../Util/response-model"
import { GlobalVariable } from "../Util/globalVariable"

@Injectable({
    providedIn: "root",
})
export class WebToolService {
    constructor(private httpClient: HttpClient, private storage: Storage) {}

    getRecordList(address) {
        return this.httpClient.get("http://" + address + "/api/getRecordList")
    }

    //根据 key 获取参数
    getParameterByKey(address, key: string) {
        let url: string = `http://${address}/api/GetParamBykey?key=${key}`
        return this.httpClient.get(url)
    }
    // 根据 type 获取参数
    getParameterByType(address, type: string) {
        let url: string = `http://${address}/api/GetParamByType?type=${type}`
        return this.httpClient.get<CustomizeTextResponse>(url)
    }

    // 设置参数
    setParameter(address, type: string, key: string, value: string) {
        let url: string = `http://${address}/api/SetParam?type=${type}&key=${key}&value=${value}`
        return this.httpClient.get<CustomizeTextResponse>(url)
    }

    // 根据id 获取录制列表
    getRecordingListById(address, port, id: string) {
        // let url = `http://${address}${
        //     GlobalVariable.getInstance().getPlatformVersion() === "Android" ? `:${port}` : ""
        // }/light/${id}`

        let url = `http://${address}:${port}/light/${id}`
        console.log(url)

        return this.httpClient.get<string[]>(url)
    }
}
