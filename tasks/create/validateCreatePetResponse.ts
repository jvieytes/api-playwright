import { expect } from "@playwright/test";
import { ApiTransactionModel } from "../../models/apiTransactionModel";
import { CreatePetCaseModel } from "../../models/createPetDataFileModel";
import { NewPetRequestModel } from "../../models/newPetRequestModel";
import { NewPetResponseModel } from "../../models/newPetResponseModel";

export class ValidateCreatePetResponse {
    constructor(private readonly testCase: CreatePetCaseModel) { }

    public async withInfo(
        tx: ApiTransactionModel<NewPetRequestModel, unknown>
    ): Promise<void> {
        expect(tx.responseStatus).toBe(this.testCase.expectedStatus);

        if (this.testCase.typeCase === "positivo") {
            const body = tx.responseBody as NewPetResponseModel;

            expect(body.status).toBe("success");
            expect(body.data.id).toBeTruthy();
            expect(body.data.name).toBe(this.testCase.request.name);
            expect(body.data.type).toBe(this.testCase.request.type);
            expect(body.data.age).toBe(this.testCase.request.age);
        }
    }
}