const connection = require('./connection');

const getAllCriminals = async ()=> {
    const query = 'SELECT * FROM criminal_data';
    const [rows] = await this.connection.execute(query);
    return rows;
  }
  
module.exports = {
    getAllCriminals
};


