import test from "@playwright/test"
import Logger from "../../utils/Logger"
import { CreateNewPet } from "../../tasks/create/createNewPet"
import { CheckPetWasCreated } from "../../tasks/create/checkPetWasCreated"
import { NewPetRequestModel } from "../../models/newPetRequestModel"
import { faker } from "@faker-js/faker"

// test.beforeEach(async() =>{
//     Logger.info('Running Before Tests')
// })

// test.beforeAll(async() =>{
//     Logger.info("Running Before All")
// })

test('Crear una nueva mascota', async ({ request }) => {

  const newPetRequest:NewPetRequestModel = {
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

  const newPetRequest:NewPetRequestModel = {
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