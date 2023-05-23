class redNoticesModel {
    constructor(connection) {
        this.connection = connection;
    }

    async saveNotices(notices) {
        const query = 'INSERT INTO red_notices (forename, date_of_birth, entity_id, nationalities, name, _links) VALUES (?, ?, ?, ?, ?, ?)';

        const {
            forename,
            date_of_birth,
            entity_id,
            nationalities,
            name,
            _links
          } = notices;

          const params = [
            forename,
            date_of_birth,
            entity_id,
            nationalities,
            name,
            _links
          ];

          await this.connection.execute(query, params);
        }
         
        async getAllRedNotices() {
            try {
                const [data] = await this.connection.execute('SELECT * FROM red_notices');
                return data; 
                
            } catch (error) {
                throw error;
            }
        }
    }


    module.exports = redNoticesModel;