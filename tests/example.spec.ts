import { test, expect, request } from '@playwright/test';

import * as allure from "allure-js-commons";

async function setGetUpdatePetHierarchy(displayName: string) {
    await allure.displayName(displayName);
    await allure.parentSuite("Servicio Mascotas");
    await allure.suite("Actualizar y Obtener Mascotas");
}

test('Actualizar una nueva mascota', async ({ request }) => {

  await setGetUpdatePetHierarchy("Actualizar mascota")

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

  const updatePetRequest = {
    name: "Bingo3 Update",
    type: "Loro",
    age: 5
  }

  const updatePetResponse = await request.put('/pets/' + petId, {
    data: updatePetRequest
  })

  console.log(JSON.stringify(await updatePetResponse.json()))

})

test('Actualizar una nueva mascota parcialmente', async ({ request }) => {

  await setGetUpdatePetHierarchy("Actualizar mascota Parcialmente")

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

  const updatePartiallyPetRequest = {
    age: 5
  }

  const updatePartiallyPetResponse = await request.patch('/pets/' + petId, {
    data: updatePartiallyPetRequest
  })

  console.log(JSON.stringify(await updatePartiallyPetResponse.json()))

})

test('Obtener una mascota', async ({ request }) => {

  await setGetUpdatePetHierarchy("Obteniendo una mascota")

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

  const getPetByIdResponse = await request.get('/pets/' + petId, {
  })

  console.log("Response: ", await getPetByIdResponse.json())

})

test('Obtener todas las mascota', async ({ request }) => {

  await setGetUpdatePetHierarchy("Obtener todas las mascotas")

  const getAllPetResponse = await request.get('/pets')

  console.log("Response: ", await getAllPetResponse.json())

})

test('Autenticacion Basci', async ({ request }) => {

  await setGetUpdatePetHierarchy("Autenticacion basica")

  const credentialsBase64 = btoa('admin:password123')

  const basicAuthenticationResponse = await request.get('/protected-basic', {
    headers:{
      'Authorization': `Basic ${credentialsBase64}`
    }
  })

  console.log("Response status: ", basicAuthenticationResponse.status())
  console.log("Response status: ", await basicAuthenticationResponse.text())

})

test('Autenticacion Bearer', async ({ request }) => {

  await setGetUpdatePetHierarchy("Autenticacion bearer")

  const authenticationTokenResponse = await request.post('/login',{
    data:{
      "username": "automation"
    }
  })

  const jsonResponse = await authenticationTokenResponse.json()
  const token = jsonResponse.data.accessToken

  console.log(`Token: ${token}`)

  const bearerResponse = await request.get('/protected-bearer',{
    headers:{
      'authorization': `Bearer ${token}`
    }
  })

  expect(bearerResponse.status()).toBe(200)
  expect(await bearerResponse.text()).toBe('Hello automation, you have accessed a protected endpoint!')

})