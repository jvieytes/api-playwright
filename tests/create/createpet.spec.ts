import test, { expect } from "@playwright/test";
import Logger from "../../utils/Logger";
import { CreateNewPet } from "../../tasks/create/createNewPet";
import { CheckPetWasCreated } from "../../tasks/create/checkPetWasCreated";
import { NewPetRequestModel } from "../../models/newPetRequestModel";
import { faker } from "@faker-js/faker";
import * as allure from "allure-js-commons";

function pretty(data: unknown): string {
  return JSON.stringify(data, null, 2);
}

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

  await test.step("Crear una nueva mascota | Flujo API", async (step) => {
    await step.attach("PreRequest", {
      body: pretty({
        descripcion: "Crear mascota usando task CreateNewPet",
        caso: "Crear una nueva mascota"
      }),
      contentType: "application/json"
    });

    await step.attach("Request Body", {
      body: pretty(newPetRequest),
      contentType: "application/json"
    });

    const createNewPet = new CreateNewPet(request);

    // Idealmente esta clase debería devolverte más detalle.
    const newPetResponse = await createNewPet.withInfo(newPetRequest);

    await step.attach("Response Body", {
      body: pretty(newPetResponse),
      contentType: "application/json"
    });

    const checkPetWasCreated = new CheckPetWasCreated(newPetRequest);
    await checkPetWasCreated.withInfo(newPetResponse);
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

  await test.step("Crear una nueva mascota2 | Flujo API", async (step) => {
    await step.attach("PreRequest", {
      body: pretty({
        descripcion: "Crear mascota usando task CreateNewPet",
        caso: "Crear una nueva mascota2"
      }),
      contentType: "application/json"
    });

    await step.attach("Request Body", {
      body: pretty(newPetRequest),
      contentType: "application/json"
    });

    const createNewPet = new CreateNewPet(request);
    const newPetResponse = await createNewPet.withInfo(newPetRequest);

    await step.attach("Response Body", {
      body: pretty(newPetResponse),
      contentType: "application/json"
    });

    const checkPetWasCreated = new CheckPetWasCreated(newPetRequest);
    await checkPetWasCreated.withInfo(newPetResponse);
  });
});

test("Crear una nueva mascota - Public", { tag: "@prod" }, async ({ request }) => {
  await setCreatePetHierarchy("Crear una nueva mascota - Publica");

  const url = "https://petstore.swagger.io/v2/pet";
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  const payload = {
    id: 0,
    category: {
      id: 0,
      name: "string"
    },
    name: "doggie",
    photoUrls: ["string"],
    tags: [
      {
        id: 0,
        name: "string"
      }
    ],
    status: "available"
  };

  await test.step("Crear una nueva mascota - Publica | ID QMETRY: (pendiente)", async (step) => {
    await step.attach("PreRequest", {
      body: pretty({
        metodo: "POST",
        url,
        descripcion: "Alta pública de mascota en Swagger Petstore"
      }),
      contentType: "application/json"
    });

    await step.attach("Request Headers", {
      body: pretty(headers),
      contentType: "application/json"
    });

    await step.attach("Request Body", {
      body: pretty(payload),
      contentType: "application/json"
    });

    const createPetResponse = await request.post(url, {
      headers,
      data: payload
    });

    const responseText = await createPetResponse.text();

    await step.attach("Response Headers", {
      body: pretty(createPetResponse.headers()),
      contentType: "application/json"
    });

    await step.attach("Response Body", {
      body: responseText,
      contentType: "application/json"
    });

    expect(createPetResponse.status()).toBe(200);

    const createPetResponseJson = JSON.parse(responseText);
    expect(createPetResponseJson.id).toBeTruthy();
  });
});