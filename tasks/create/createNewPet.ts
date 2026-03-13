import { APIRequestContext } from "@playwright/test";
import { NewPetRequestModel } from "../../models/newPetRequestModel";
import { ApiTransactionModel } from "../../models/apiTransactionModel";

export class CreateNewPet {
    constructor(private readonly request: APIRequestContext) { }

    public async withInfo(
        endpoint: string,
        newPetRequest: NewPetRequestModel
    ): Promise<ApiTransactionModel<NewPetRequestModel, unknown>> {
        const headers = {
            "Content-Type": "application/json",
            "User-Agent": "PostmanRuntime/7.52.0"
        };

        const response = await this.request.post(endpoint, {
            data: newPetRequest,
            headers
        });

        let responseBody: unknown;

        try {
            responseBody = await response.json();
        } catch {
            responseBody = await response.text();
        }

        return {
            method: "POST",
            url: endpoint,
            requestHeaders: headers,
            requestBody: newPetRequest,
            responseStatus: response.status(),
            responseHeaders: response.headersArray(),
            responseBody
        };
    }
}