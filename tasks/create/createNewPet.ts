import { APIRequestContext } from "@playwright/test";
import { NewPetRequestModel } from "../../models/newPetRequestModel";
import { NewPetResponseModel } from "../../models/newPetResponseModel";
import { ApiTransactionModel } from "../../models/apiTransactionModel";

export class CreateNewPet {
  constructor(private readonly request: APIRequestContext) {}

  public async withInfo(
    newPetRequest: NewPetRequestModel
  ): Promise<ApiTransactionModel<NewPetRequestModel, NewPetResponseModel>> {
    const url = "/pets";
    const headers = {
      "Content-Type": "application/json",
      "User-Agent": "PostmanRuntime/7.52.0"
    };

    const response = await this.request.post(url, {
      data: newPetRequest,
      headers
    });

    const responseBody = (await response.json()) as NewPetResponseModel;

    return {
      method: "POST",
      url,
      requestHeaders: headers,
      requestBody: newPetRequest,
      responseStatus: response.status(),
      responseHeaders: response.headersArray(),
      responseBody
    };
  }
}