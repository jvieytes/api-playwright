import test from "@playwright/test"

test('Eliminar una mascota', async ({ request }) => {

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