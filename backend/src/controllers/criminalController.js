const fs = require('fs').promises;
const fetch = require('node-fetch');
const { getAll } = require('./tasksController');
const CriminalDataModel = require('../models/criminalModel');


class CriminalDataController {
  constructor(model) {
    this.model = model;
  }

  async fetchDataAndSave() {
    const allowedPaths = ['/wcc', '/cyber', '/counterintelligence', '/terrorism', '/cei'];

    for (let i = 1; i <= 20; i++) {
      const resp = await fetch(`https://api.fbi.gov/@wanted?pageSize=1&page=${i}&sort_on=modifier&sort_order=desc&person_classification=main&poster_classification=default&status=na`, { method: 'GET' });
      const json = await resp.json();

      for (const item of json.items) {
        if (!allowedPaths.some(path => item.path.includes(path))) {
          continue;
        }

        const {
          uid,
          dates_of_birth_used,
          publication,
          race_raw,
          occupations,
          place_of_birth,
          title,
          hair,
          sex,
          nationality,
          reward,
          caution,
          path,
          poster_classification
        } = item;

        const newData = {
          uid,
          dates_of_birth_used: JSON.stringify(dates_of_birth_used),
          publication,
          race_raw,
          occupations: JSON.stringify(occupations),
          place_of_birth,
          title,
          hair,
          sex,
          nationality,
          reward,
          caution,
          path,
          poster_classification
        };

        await this.model.saveData(newData);
      }
    }
  }

  async getAllCriminals(req, res) {
    try {
      const criminals = await this.model.getAllCriminals();
      res.json(criminals);
    } catch (error) {
      console.error('Erro ao buscar criminosos:', error);
      res.status(500).json({ error: 'Erro ao buscar criminosos' });
    }
  }
  
}

module.exports = CriminalDataController;



// import * as fs from 'node:fs/promises';
// import taskModel from './taskModel';

// const allowedPaths = ['/wcc', '/cyber', '/counterintelligence', '/terrorism', '/cei'];

// let fileCount = 1;

// for (let i = 1; i <= 20; i++) {
//   const resp = await fetch(`https://api.fbi.gov/@wanted?pageSize=1&page=${i}&sort_on=modifier&sort_order=desc&person_classification=main&poster_classification=default&status=na`, { method: 'GET' });
//   const json = await resp.json();

//   // Iterar sobre os criminosos
//   for (const item of json.items) {
//     if (!allowedPaths.some(path => item.path.includes(path))) {
//       // Pular para o próximo criminoso se nenhum dos caminhos permitidos estiver presente
//       continue;
//     }

//     // Acessando os parâmetros desejados e criando um novo objeto
//     const {
//       uid,
//       dates_of_birth_used,
//       publication,
//       race_raw,
//       occupations,
//       place_of_birth,
//       title,
//       hair,
//       sex,
//       nationality,
//       reward_text,
//       caution,
//       path,
//       poster_classification
//     } = item;

//     const newObj = {
//       uid,
//       dates_of_birth_used,
//       publication,
//       race_raw,
//       occupations,
//       place_of_birth,
//       title,
//       hair,
//       sex,
//       nationality,
//       reward: reward_text,
//       caution,
//       path,
//       poster_classification
//     };

//     // Fazendo algo com o novo objeto
//     console.log(newObj);

//     // Salvar o JSON completo em um arquivo
//     await fs.writeFile(`resposta_${fileCount}.json`, JSON.stringify(newObj), { flag: 'w' });

//     // Salvar os dados no banco de dados
//     await taskModel.insertTask(newObj);

//     fileCount++;
//   }
// }
