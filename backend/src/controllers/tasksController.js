const getAll = (request, response) => {
    return response.status().json({ 'message': 'controller esta ok'});
};

module.exports = {
    getAll
}