/**
 * @swagger
 * components:
 *   schemas:
 *     RedNotice:
 *       type: object
 *       properties:
 *         id:
 *           type: int
 *         forename:
 *           type: string
 *         date_of_birth:
 *           type: string
 *         entity_id:
 *           type: string
 *         nationalities:
 *           type: string
 *         name:
 *           type: string
 *         _links:
 *           type: string
 *
 * 
 * @swagger
 * components:
 *   schemas:
 *     Criminal:
 *       type: object
 *       properties:
 *         id:
 *           type: int
 *         formattedDatesOfBirthUsed:
 *           type: string
 *         race_raw:
 *           type: string
 *         formattedOccupations:
 *           type: string
 *         place_of_birth:
 *           type: string
 *         title:
 *           type: string
 *         hair:
 *           type: string
 *         sex:
 *           type: string
 *         nationality:
 *           type: string
 *         reward:
 *           type: string
 *         caution:
 *           type: string
 *         path:
 *           type: string
 *         post_classification: 
 *           type: string
 */

/**!SECTION
 * @swagger
 * tags:
 *   name: FBI & Interpool
 *   description: API para realizar busca em sistemas de informações de criminosos, utilizando FBI API & Interpool Notices API
 */

// ... suas rotas e controladores ...

/**
 * @swagger
 * /fetch-and-save:
 *   get:
 *     summary: Pesquisa na API do FBI e salva no banco de dados.
 *     tags: [FBI]
 *     responses:
 *       200:
 *         description: utiliza a a API do FBI com um get puxando os dados dos criminosos relacionados a AML como, terroristas, colarinho branco, cyber criminosos, cei, criminosos contra a inteligencia dos EUA &  e salva no banco de dados.
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/models/criminalModel'
 */

/**
 * @swagger
 * /criminals:
 *   get:
 *     summary: Pesquisa os criminosos procurados do FBI.
 *     tags: [FBI]
 *     responses:
 *       200:
 *         description: utiliza a a API do FBI com um get puxando os dados dos criminosos relacionados a AML como, terroristas, colarinho branco, cyber criminosos, cei, criminosos contra a inteligencia dos EUA e os mostra para o usuário.
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/models/criminalModel'
 */

/**
 * @swagger
 * /fetch-and-save-notices:
 *   get:
 *     summary: Utiliza um get dos dados na API da Interpool e salva no banco de dados.
 *     tags: [Interpol]
 *     responses:
 *       200:
 *         description: utiliza a a API do FBI com um get puxando os dados dos criminosos relacionados a AML como, terroristas, colarinho branco, cyber criminosos, cei, criminosos contra a inteligencia dos EUA &  e salva no banco de dados.
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/models/criminalModel'
 */

/**
 * @swagger
 * /notices:
 *   get:
 *     summary: Pesquisa as noticias com maior gravidade da Interpol.
 *     tags: [Interpol]
 *     responses:
 *       200:
 *         description: Utiliza a a API de noticias da Interpool com um get puxando os dados dos crimes e criminosos mais procurados. 
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/models/criminalModel'
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
  console.log('opa')
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