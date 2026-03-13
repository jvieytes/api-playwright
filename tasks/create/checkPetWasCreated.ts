import { expect } from "@playwright/test";
import { NewPetRequestModel } from "../../models/newPetRequestModel";
import { NewPetResponseModel } from "../../models/newPetResponseModel";
import { ApiTransactionModel } from "../../models/apiTransactionModel";

export class CheckPetWasCreated {
    constructor(private readonly expectedPet: NewPetRequestModel) { }

    public async withInfo(
        tx: ApiTransactionModel<NewPetRequestModel, NewPetResponseModel>
    ): Promise<void> {
        expect(tx.responseStatus).toBe(201);
        expect(tx.responseBody.status).toBe("success");
        expect(tx.responseBody.data.id).toBeTruthy();
        expect(tx.responseBody.data.name).toBe(this.expectedPet.name);
        expect(tx.responseBody.data.type).toBe(this.expectedPet.type);
        expect(tx.responseBody.data.age).toBe(this.expectedPet.age);
    }
}