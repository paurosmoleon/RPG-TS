import {combate } from '../model/Luchar.js'



const $ = el => document.querySelector(el)

const $luchar = $('#luchar')
const $enemigoSalud = $('#salud_enemigo')



$luchar.addEventListener('click', combate)



