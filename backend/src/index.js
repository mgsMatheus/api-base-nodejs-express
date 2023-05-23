const getAllCriminals = require('../src/controllers/criminalController')

const btn = document.querySelector('.btn')


btn.addEventListener('click', getAllCriminals => {
    console.log('chamou')
})