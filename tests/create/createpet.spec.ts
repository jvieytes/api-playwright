import test, { expect } from "@playwright/test"
import Logger from "../../utils/Logger"
import { CreateNewPet } from "../../tasks/create/createNewPet"
import { CheckPetWasCreated } from "../../tasks/create/checkPetWasCreated"
import { NewPetRequestModel } from "../../models/newPetRequestModel"
import { faker } from "@faker-js/faker"
import * as allure from 'allure-js-commons';

// test.beforeEach(async() =>{
//     Logger.info('Running Before Tests')
// })

// test.beforeAll(async() =>{
//     Logger.info("Running Before All")
// })
// await allure.parentSuite('Mascotas');
// await allure.suite('Create Pet');
// await allure.subSuite('API Usuarios');

async function setCreatePetHierarchy(displayName: string) {
    await allure.displayName(displayName);
    await allure.parentSuite("Servicio Mascotas");
    await allure.suite("Crear Mascotas");
}

test('Crear una nueva mascota', async ({ request }) => {
    await setCreatePetHierarchy("Crear una nueva mascota");
    const newPetRequest: NewPetRequestModel = {
        name: faker.animal.cat(),
        type: "Perro",
        age: 1
    }

    Logger.info("Creando una nueva mascota")

    const createNewPet = new CreateNewPet(request)
    const newPetResponse = await createNewPet.withInfo(newPetRequest)
    const checkPetWasCreated = new CheckPetWasCreated(newPetRequest)
    await checkPetWasCreated.withInfo(newPetResponse)

})


test('Crear una nueva mascota2', async ({ request }) => {
    await setCreatePetHierarchy("Crear una nueva mascota2");
    const newPetRequest: NewPetRequestModel = {
        name: faker.animal.cat(),
        type: "Perro",
        age: 1
    }

    Logger.info("Creando una nueva mascota")

    const createNewPet = new CreateNewPet(request)
    const newPetResponse = await createNewPet.withInfo(newPetRequest)
    const checkPetWasCreated = new CheckPetWasCreated(newPetRequest)
    await checkPetWasCreated.withInfo(newPetResponse)

})

// test.afterAll(async() =>{
//     Logger.info('Running after all')
// })

// test.afterEach(async() =>{
//     Logger.info('Running After Tests')
// })

test('Crear una nueva mascota - Public', { tag: '@prod' }, async ({ request }) => {
    await setCreatePetHierarchy("Crear una nueva mascota - Publica");
    const createPetResponse = await request.post('https://petstore.swagger.io/v2/pet', {
        data: {
            "id": 0,
            "category": {
                "id": 0,
                "name": "string"
            },
            "name": "doggie",
            "photoUrls": [
                "string"
            ],
            "tags": [
                {
                    "id": 0,
                    "name": "string"
                }
            ],
            "status": "available"
        }
    })

    expect(createPetResponse.status()).toBe(200)
    const createPetResponseJson = await createPetResponse.json()

    expect(createPetResponseJson.id).toBeTruthy()
})
