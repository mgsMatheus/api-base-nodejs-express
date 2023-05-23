class redNoticeController {
  constructor(model) {
    this.model = model; 
  }

  async fetchInterpolData() {
    const response = await fetch('https://ws-public.interpol.int/notices/v1/red?resultPerPage=20');
    const json = await response.json();
  
    if (json && json._embedded && json._embedded.notices) {
      for (const notice of json._embedded.notices.slice(0, 10)) {
        const {
          forename,
          date_of_birth,
          entity_id,
          nationalities,
          name,
          _links
        } = notice;
  
        const newData = {
          forename,
          date_of_birth,
          entity_id,
          nationalities,
          name,
          _links
        };
  
        await this.model.saveNotices(newData);
      }
    }
  }

  async getAllRedNotices(req, res) {
    try{ 
      const notice = await this.model.getAllRedNotices();
      res.json(notice)
    } catch (error) {
      console.error('Erro ao buscar criminosos', error);
      res.status(500).json({ error: 'Erro ao buscar criminoso'})
  }
}
}

module.exports = redNoticeController;