import { Injectable } from "@angular/core"

declare var window: any

@Injectable({
    providedIn: "root",
})
export class NetworkHelper {
    static localIP: string
    constructor() {}

    getLocalIP() {
        try {
            // 调用插件方法
            window.networkinterface.getWiFiIPAddress(
                (address) => {
                    console.info(address)
                    NetworkHelper.localIP = address.ip
                },
                (error) => console.error(`Unable to get IP: ${error}`)
            )
        } catch (error) {
            console.log(error)
        }
    }
}
