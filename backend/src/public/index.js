const btn = document.getElementById('btn-1')
const btn2 = document.getElementById('btn-2')
const btn3 = document.getElementById('btn-3')
const btn4 = document.getElementById('btn-4')
const campo1 = document.getElementById('campo-1')
const campo3 = document.getElementById('campo-3')

btn.addEventListener('click', () => {
    fetch('/fetch-and-save-notices', { method: 'get'})
    .then(res =>{
        res.text()
        .then(json =>{
            alert(json)
        })
    })    
})

btn2.addEventListener('click', () => {
    fetch('/notices', { method: 'get'})
    .then(response => response.json()) // Parse do JSON
    .then(data => {
      // Exibir os valores do JSON na div
      const dataDiv = document.getElementById('campo-2');
      dataDiv.innerText = JSON.stringify(data, null, 2);
    })
    .catch(error => {
      console.error('Erro ao obter informações da API:', error);
    });
});

btn3.addEventListener('click', () => {
    fetch('/fetch-and-save', { method: 'get'})
    .then(res =>{
        res.text()
        .then(json =>{
            alert(json)
        })
    })    
})

btn4.addEventListener('click', () => {
    fetch('/criminals', { method: 'get'})
    .then(response => response.json()) // Parse do JSON
    .then(data => {
      // Exibir os valores do JSON na div
      const dataDiv = document.getElementById('campo-4');
      dataDiv.innerText = JSON.stringify(data, null, 2);
    })
    .catch(error => {
      console.error('Erro ao obter informações da API:', error);
    });
})