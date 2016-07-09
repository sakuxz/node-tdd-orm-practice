import models from '../models'


export async function initTestModel() {
  await models.sequelize.sync({force: true})
  return models;
}

export async function initModel() {
  await models.sequelize.sync({force: true})
  return models;
}