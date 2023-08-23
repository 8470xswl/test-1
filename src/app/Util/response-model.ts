export interface CustomizeTextData {
    id: number
    type: number
    key: string
    value: string
    sort: number
}


export interface CustomizeTextResponse {
    code: number
    data: CustomizeTextData[]
}

export interface LightRecordingResponse {
    folderName: string

}

export interface ConfigJson {
    environment: string
    screensaverTime: number
    vConsole: boolean
    initStorage: boolean
    customizedFeatures: CustomizedFeature
    parameterSettings: ParameterSettings
}

/**
 * 自定义功能
 */
export class CustomizedFeature {
    bluetooth: boolean
    constructor() {
        this.bluetooth = false
    }
}

/**
 * 参数设置选项
 */
export class ParameterSettings {
    lightRecording: boolean
    constructor() {
        this.lightRecording = false
    }
}
