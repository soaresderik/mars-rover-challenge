import { expect } from "chai";
import Plateau from "../../src/entities/Plateau.mjs"

describe('Teste da Classe Plateau', () => {
  it('Deve retornar sucesso ao passar valores x e y válidos', () => {
    const plateau = new Plateau(5, 6);

    expect(plateau).to.be.an.instanceOf(Plateau);
    expect(plateau.x).to.be.eq(5);
    expect(plateau.y).to.be.eq(6);
  })

  it('Deve retornar erro ao passar valores x e y inválidos', () => {
    expect(() => new Plateau(-5, 6)).to.throw('[Plateau] Valor de x deve ser maior que 0!');
    expect(() => new Plateau(5, -6)).to.throw('[Plateau] Valor de y deve ser maior que 0!');
    expect(() => new Plateau(undefined, -6)).to.throw('[Plateau] Valor de x deve ser um número!');
    expect(() => new Plateau(5, undefined)).to.throw('[Plateau] Valor de y deve ser um número!');
    expect(() => new Plateau('maçã', 5)).to.throw('[Plateau] Valor de x deve ser um número!');
    expect(() => new Plateau(5, 'maçã')).to.throw('[Plateau] Valor de y deve ser um número!');
  })
})