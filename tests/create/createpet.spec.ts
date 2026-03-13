import test from "@playwright/test";
import Logger from "../../utils/Logger";
import { CreateNewPet } from "../../tasks/create/createNewPet";
import { CheckPetWasCreated } from "../../tasks/create/checkPetWasCreated";
import { NewPetRequestModel } from "../../models/newPetRequestModel";
import { faker } from "@faker-js/faker";
import * as allure from "allure-js-commons";
import { ApiReportHelper } from "../../utils/ApiReportHelper";

async function setCreatePetHierarchy(displayName: string) {
    await allure.displayName(displayName);
    await allure.parentSuite("Servicio Mascotas");
    await allure.suite("Crear Mascotas");
}

test("Crear una nueva mascota", async ({ request }) => {
    await setCreatePetHierarchy("Crear una nueva mascota");

    const newPetRequest: NewPetRequestModel = {
        name: faker.animal.cat(),
        type: "Perro",
        age: 1
    };

    Logger.info("Creando una nueva mascota");

    const createNewPet = new CreateNewPet(request);
    const validator = new CheckPetWasCreated(newPetRequest);

    const tx = await test.step("POST /pets - Crear mascota", async (step) => {
        const result = await createNewPet.withInfo(newPetRequest);
        await ApiReportHelper.attachTransaction(step, result);
        return result;
    });

    await test.step("Validar mascota creada", async () => {
        await validator.withInfo(tx);
    });
});

test("Crear una nueva mascota2", async ({ request }) => {
    await setCreatePetHierarchy("Crear una nueva mascota2");

    const newPetRequest: NewPetRequestModel = {
        name: faker.animal.cat(),
        type: "Perro",
        age: 1
    };

    Logger.info("Creando una nueva mascota");

    const createNewPet = new CreateNewPet(request);
    const validator = new CheckPetWasCreated(newPetRequest);

    const tx = await test.step("POST /pets - Crear mascota 2", async (step) => {
        const result = await createNewPet.withInfo(newPetRequest);
        await ApiReportHelper.attachTransaction(step, result);
        return result;
    });

    await test.step("Validar mascota creada", async () => {
        await validator.withInfo(tx);
    });
});