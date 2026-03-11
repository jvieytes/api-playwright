import test, { APIRequestContext, APIResponse } from "@playwright/test";
import { NewPetRequestModel } from "../../models/newPetRequestModel";

export class CreateNewPet {
    private request: APIRequestContext

    constructor(request: APIRequestContext) {
        this.request = request
    }

    public async withInfo(newPetRequest:NewPetRequestModel): Promise<APIResponse> {

        return await test.step(`Creando una nueva mascota ${JSON.stringify(newPetRequest)}`, async() => {
            return await this.request.post('/pets', {
                data: newPetRequest,
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'PostmanRuntime/7.52.0'
                }
            })
        })
    }
}