import fs from 'fs/promises';

/**
 * Função para dividir arrays em pedaços
 * @param {Array} arr - Array a ser dividido
 * @param {number} size - Número de divisões
 * @returns Array
 */
export const chunk = (arr, size) => [...Array(Math.ceil(arr.length / size))].map(_ => arr.splice(0,size))

/**
 * Função para salvar logs
 * @param {('Error'|'Warning')} type - tipo de log.
 * @param {Error} err - erro disparado.
 */
export const logger = (type, err) => fs.appendFile('./logs.txt', `[${type}][${new Date()}]: ${JSON.stringify(err)}\n`)