import config from "../assets/config.json"
import waterData from "../assets/data.json"
import { IRepository } from "../interfaces/_repository"
export class Repository implements IRepository {
    getData(): any {
        let data = JSON.stringify(waterData)
        return JSON.parse(data)
    }

    getConfig(): any {
        let formConfig = JSON.stringify(config)
        return JSON.parse(formConfig)
    }

    writeData(data: string) : void {

    }

}