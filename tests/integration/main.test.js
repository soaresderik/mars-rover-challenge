import sinon from 'sinon';
import fs from 'fs/promises';
import { main } from '../../src/main.js';

describe('Teste de Integração da função main', () => {
  afterEach(sinon.restore);

  it('Deve retornar caso de sucesso ao enviar parâmetros válidos', async () => {
    sinon.stub(fs, 'readFile').resolves(`
      5 5
      1 2 N
      LMLMLMLMM
      3 3 E
      MMRMMRMRRM
    `.trim());

    await main();
  })

  it('Deve retornar caso de erro ao lançar uma exceção', async () => {
    sinon.stub(fs, 'readFile').throws();
    const stub = sinon.stub(console, 'error');

    await main();

    sinon.assert.calledWith(stub, 'Ops! Erro no código :(')
  })

  it('Deve retornar caso de erro ao enviar parametros errados', async () => {
    sinon.stub(fs, 'readFile').resolves(`
      -5 5
      1 2 N
      LMLMLMLMM
      3 3 E
      MMRMMRMRRM
    `.trim());
    const stub = sinon.stub(console, 'error');

    await main();

    sinon.assert.calledWith(stub, "[Plateau] Valor de x deve ser maior que 0!")
  })
})