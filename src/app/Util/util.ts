import { ConfigService } from "./configService"
import { Storage } from "@ionic/storage-angular"
import { TranslateService } from "@ngx-translate/core"

export class Timer {
    private static countdown: number
    private static id: any
    private static callback: () => void
    private static cycleId: any

    static startAndGetTaskId(callback: () => void): void {
        this.countdown = ConfigService.getScreensaverTime()
        this.callback = callback
        console.log("startTimer()")
        this.id = setTimeout(() => {
            console.log("未操作")
            callback()
        }, this.countdown * 1000)
    }

    static endTimeTask(): void {
        console.log("endTimer()")
        clearTimeout(this.id)
    }

    static resetTimeTask(): void {
        console.log("resetTimer()")
        this.endTimeTask()
        this.startAndGetTaskId(this.callback)
    }

    static startCycleTimer(callback: () => void): void {
        console.log("startCycleTimer()")
        this.cycleId = setInterval(() => {
            callback()
        }, 1000)
    }

    static endCycleTimer(callback: () => void): void {
        clearInterval(Number(this.cycleId))
        callback()
    }
}

export class ColorUtil {
    static color: string
    static map = new Map([
        ["blue", "000000255"],
        ["white", "255255255"],
        ["green", "000255000"],
        ["yellow", "255255000"],
        ["red", "255000000"],
    ])

    static getColorRGB(color: string): string {
        this.color = color
        return this.map.get(color)
    }

    static getColor(RGB: string): string {
        let color: string
        for (let [key, value] of this.map) {
            if (value == RGB) {
                color = key
                this.color = value
            }
        }
        return color
    }

    static getOtherColorRGB(color: string): Array<string> {
        this.color = color
        var list: Array<string> = new Array<string>()
        this.map.forEach((v, k) => {
            if (k !== color) {
                list.push(v)
            }
        })
        return list
    }
}

export class StorageTool {
    /**
     * 根据key获取storage中的值若值为null或undefined或""则为默认值value 可选 其他操作
     * @param storage "@ionic/storage-angular" 内存
     * @param key   键值对 key
     * @param value 默认值
     * @param operation 可选 其他操作 void()
     * @returns
     */
    static async getStringFromStorage(
        storage: Storage,
        key: string,
        value,
        operation?: () => void
    ) {
        let storageValue = await storage.get(key)

        if (storageValue == null || storageValue == "") {
            return value
        }
        if (operation != undefined) {
            let result = await operation()
            if (result != null) {
                storageValue = result
            }
        }
        return storageValue
    }

    /**
     * 获取Number类型值
     * 根据key获取storage中的值若值为null或undefined或isNaN或小于0 则为默认值value 可选 其他操作
     * @param storage "@ionic/storage-angular" 内存
     * @param key   键值对 key
     * @param value 默认值 number
     * @param operation 可选 其他操作 void()
     * @returns
     */
    static async getNumberFromStorage(
        storage: Storage,
        key: string,
        value: number,
        operation?: () => void
    ) {
        let storageValue = await storage.get(key)
        if (storageValue == null || isNaN(storageValue)) {
            return value
        } else if (storageValue < 0) {
            return value
        }
        if (operation != undefined) {
            let result = await operation()
            if (result != null) {
                storageValue = result
            }
        }
        return storageValue
    }
    /**
     * 根据获取的Number来获取boolean 1 -- true  0 -- false
     * 根据key获取storage中的值若值为null或undefined或isNaN 则为默认值value 可选 其他操作
     * @param storage "@ionic/storage-angular" 内存
     * @param key   键值对 key
     * @param value 默认值 boolean
     * @param operation 可选 其他操作 void()
     * @returns
     */
    static async getNumberFromStorageToBoolean(
        storage: Storage,
        key: string,
        value: boolean,
        operation?: () => void
    ) {
        let storageValue = await storage.get(key)
        if (storageValue == null || isNaN(storageValue)) {
            return value
        } else if (storageValue == 0) {
            return false
        } else if (storageValue == 1) {
            return true
        }
        if (operation != undefined) {
            let result = await operation()
            if (result != null) {
                storageValue = result
            }
        }
        return storageValue
    }

    /**
     * 获取Boolean类型值
     * 根据key获取storage中的值若值为null或undefined 则为默认值value 可选 其他操作
     * @param storage "@ionic/storage-angular" 内存
     * @param key   键值对 key
     * @param value 默认值 number
     * @param operation 可选 其他操作 void()
     * @returns
     */
    static async getBooleanFromStorage(
        storage: Storage,
        key: string,
        value: boolean,
        operation?: () => void
    ) {
        let storageValue = await storage.get(key)
        if (storageValue == null) {
            return value
        }
        if (operation != undefined) {
            let result = await operation()
            if (result != null) {
                storageValue = result
            }
        }
        return storageValue
    }
}
