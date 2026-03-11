import {test as setup} from '@playwright/test'
import Logger from '../utils/Logger'

setup('Crear una nueva base de datos', async() => {
    Logger.info("Before all tests -> Creating Database")
})