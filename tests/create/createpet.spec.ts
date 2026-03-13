import test from "@playwright/test";
import { faker } from "@faker-js/faker";
import * as allure from "allure-js-commons";

import { JsonDataReader } from "../../utils/JsonDataReader";
import { ApiReportHelper } from "../../utils/ApiReportHelper";
import { CreateNewPet } from "../../tasks/create/createNewPet";
import { ValidateCreatePetResponse } from "../../tasks/create/validateCreatePetResponse";

import {
    CreatePetDataFileModel,
    CreatePetCaseModel
} from "../../models/createPetDataFileModel";
import { NewPetRequestModel } from "../../models/newPetRequestModel";

function buildRequest(request: NewPetRequestModel): NewPetRequestModel {
    return {
        ...request,
        name: request.name === "__AUTO__" ? faker.animal.cat() : request.name
    };
}

async function setCreatePetHierarchy(displayName: string) {
    await allure.displayName(displayName);
    await allure.parentSuite("Servicio Mascotas");
    await allure.suite("Crear Mascotas");
}

const createPetData = JsonDataReader.read<CreatePetDataFileModel>(
    "data/pets/createPet.json"
);

for (const testCase of createPetData.cases) {
    test(testCase.testName, async ({ request }) => {
        await setCreatePetHierarchy(testCase.testName);

        const finalRequest = buildRequest(testCase.request);

        const runtimeCase: CreatePetCaseModel = {
            ...testCase,
            request: finalRequest
        };

        const createNewPet = new CreateNewPet(request);
        const validator = new ValidateCreatePetResponse(runtimeCase);

        const tx = await test.step(
            `${createPetData.method} ${createPetData.endpoint} | ${runtimeCase.testName}`,
            async (step) => {
                const result = await createNewPet.withInfo(
                    createPetData.endpoint,
                    finalRequest
                );

                await ApiReportHelper.attachTransaction(step, result);
                return result;
            }
        );

        await test.step("Validar respuesta", async () => {
            await validator.withInfo(tx);
        });
    });
}