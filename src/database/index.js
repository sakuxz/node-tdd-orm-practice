import models from '../models'


export async function initTestModel() {
  await models.sequelize.sync({force: true})
  return models;
}

export async function initModel() {
  if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production')
    await models.sequelize.sync();
  else
    await models.sequelize.sync({force: true});
  return models;
}