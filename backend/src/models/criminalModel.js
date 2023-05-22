class CriminalDataModel {
  constructor(connection) {
    this.connection = connection;
  }

  async saveData(data) {
    const query = 'INSERT INTO criminal_data (uid, dates_of_birth_used, publication, race_raw, occupations, place_of_birth, title, hair, sex, nationality, reward, caution, path, poster_classification) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

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
    } = data;

    const formattedDatesOfBirthUsed = dates_of_birth_used ? JSON.stringify(dates_of_birth_used) : null;
    const formattedOccupations = occupations ? JSON.stringify(occupations) : null;

    const params = [
      uid,
      formattedDatesOfBirthUsed,
      publication,
      race_raw,
      formattedOccupations,
      place_of_birth,
      title,
      hair,
      sex,
      nationality,
      reward || null,
      caution,
      path,
      poster_classification
    ];

    await this.connection.execute(query, params);
  }

  async getAllCriminals() {
    try {
      const [criminals] = await this.connection.execute('SELECT * FROM criminal_data');
      return criminals;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CriminalDataModel;
