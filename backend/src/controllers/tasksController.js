const tasksModel = require('../models/tasksModel');

const getAll = async (_request, response) => {
  const tasks = await tasksModel.getAll();
  return response.status(200).json(tasks);
};

const insertCriminalData = async (request, response) => {
  const postCriminal = await tasksModel.insertCriminalData();

  const newObj = {
    uid: '...',
    dates_of_birth_used: ['...', '...'],
    publication: '...',
    race_raw: '...',
    occupations: ['...', '...'],
    place_of_birth: '...',
    title: '...',
    hair: '...',
    sex: '...',
    nationality: '...',
    reward: '...',
    caution: '...',
    path: '...',
    poster_classification: '...'
  };

  insertCriminalData(newObj);

  return response.status(200).json(postCriminal);
};

module.exports = {
  getAll,
  insertCriminalData
};