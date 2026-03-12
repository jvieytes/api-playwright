import test from "@playwright/test"
import * as allure from "allure-js-commons";

async function setDeletePetHierarchy(displayName: string) {
    await allure.displayName(displayName);
    await allure.parentSuite("Servicio Mascotas");
    await allure.suite("Eliminar Mascota");
}


test('Eliminar una mascota', async ({ request }) => {

  await setDeletePetHierarchy("Eliminar una mascota")

  const newPetRequest = {
    name: "Bingo3",
    type: "Perro",
    age: 1
  }

  const newPetResponse = await request.post('/pets', {
    data: newPetRequest
  })

  const newPetResponseJson = await newPetResponse.json()
  const petId = newPetResponseJson.data.id

  const deletePetResponse = await request.delete('/pets/' + petId, {
  })

  console.log("status: ", deletePetResponse.status)

})