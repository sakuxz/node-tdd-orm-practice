import models from '../models'


async function initTestModel() {
  await models.sequelize.sync({force: true})
  return models;
}

async function initModel() {
  await models.sequelize.sync()
  return models;
}

export {initModel,initTestModel}
