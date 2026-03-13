import { NewPetRequestModel } from "./newPetRequestModel";

export interface CreatePetCaseModel {
    testName: string;
    typeCase: "positivo" | "negativo";
    expectedStatus: number;
    request: NewPetRequestModel;
}

export interface CreatePetDataFileModel {
    service: string;
    endpoint: string;
    method: string;
    cases: CreatePetCaseModel[];
}