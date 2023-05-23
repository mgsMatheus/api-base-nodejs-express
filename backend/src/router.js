/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         finished:
 *           type: boolean
 *
 * @swagger
 * tags:
 *   name: Books
 *   description: API for managing books
 */

// ... suas rotas e controladores ...

/**
 * @swagger
 * /book:
 *   get:
 *     summary: List all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */


const express = require('express');
const router = express.Router();
const CriminalDataController = require('./controllers/criminalController');
const CriminalDataModel = require('./models/criminalModel');
const connection = require('./models/connection');
const redNoticesModel = require('./models/redNoticesModel');
const redNoticeController = require('./controllers/redNoticesController')

router.get('/fetch-and-save-notices', async( req, res) => {
  const model = new redNoticesModel(connection);
  const controller = new redNoticeController(model); 

  try {
    await controller.fetchInterpolData();
    res.send('Dados salvos com sucesso')
  }catch (error) {
    console.error('Erro ao salvar os dados:', error);
    res.status(500).send('Erro ao salvar os dados.');
  } 
});

router.get('/notices', async (req, res) => { 
  const model = new redNoticesModel(connection);
  const controller = new redNoticeController(model)

  try {
    await controller.getAllRedNotices(req, res); 
  } catch (error) { 
    console.log('Erro ao buscar noticias', error);
    res.status(500).json({error : 'Erro ao buscar criminosos'});
  }
});

  
router.get('/fetch-and-save', async (req, res) => {
  
  const model = new CriminalDataModel(connection);  
  const controller = new CriminalDataController(model);

  try {
    await controller.fetchDataAndSave();
    res.send('Dados salvos com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar os dados:', error);
    res.status(500).send('Erro ao salvar os dados.');
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
  }
});



module.exports = router;