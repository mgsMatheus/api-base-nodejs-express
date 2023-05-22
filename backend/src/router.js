const express = require('express');

const router = express.Router();
const CriminalDataController = require('./controllers/criminalController');
const CriminalDataModel = require('./models/criminalModel');
const connection = require('./models/connection');

router.get('/fetch-and-save', async (req, res) => {
  
  const model = new CriminalDataModel(connection);
  console.log(model)
  console.log(controller)
  const controller = new CriminalDataController(model);

  try {
    await controller.fetchDataAndSave();
    res.send('Dados salvos com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar os dados:', error);
    res.status(500).send('Erro ao salvar os dados.');
  } finally {
    await connection.close();
  }
});

router.get('/criminals', async (req, res) => {
  const model = new CriminalDataModel(connection);
  const controller = new CriminalDataController(model);

  try {
    await controller.getAllCriminals(req, res);
  } catch (error) {
    console.error('Erro ao buscar criminosos:', error);
    res.status(500).json({ error: 'Erro ao buscar criminosos' });
  } finally {
    await connection.end();
  }
});



module.exports = router;