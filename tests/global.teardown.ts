import {test as teardown} from '@playwright/test'
import Logger from '../utils/Logger'

teardown('Crear una nueva base de datos', async() => {
    Logger.info("After all tests -> Deleting Database")
})