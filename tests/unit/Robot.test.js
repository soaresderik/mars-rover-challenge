import { expect } from "chai";
import Plateau from "../../src/entities/Plateau.mjs"
import Robot from "../../src/entities/Robot.mjs";
import sinon from 'sinon';

describe('Teste da Classe Robot', () => {
  afterEach(sinon.restore);

  it('Deve retornar sucesso ao passar valores x, y, direção e platô válidos', () => {
    const robot = new Robot(1, 2, 'N', new Plateau(5, 5));

    expect(robot).to.be.an.instanceOf(Robot);
    expect(robot.x).to.be.eq(1);
    expect(robot.y).to.be.eq(2);
  })

  it('Deve retornar erro ao passar valores x, y, direção inválidos', () => {
    const plateau = new Plateau(5, 5);

    expect(() => new Robot(-1, 2, 'N', plateau)).to.throw('[Robot] Valor de x deve ser maior que 0!');
    expect(() => new Robot(1, -2, 'N', plateau)).to.throw('[Robot] Valor de y deve ser maior que 0!');
    expect(() => new Robot(1, 2, 'X', plateau)).to.throw('[Robot] Direção inválida!');
  })

  it("Deve retornar os valores '1 5 N' após movimentar o robô 3 vezes com posição inicial '1 2 N'", () => {
    const plateau = new Plateau(5, 5);
    const robot = new Robot(1, 2, 'N', plateau)

    const stub = sinon.stub(console, 'log');

    robot.moveForward();
    robot.moveForward();
    robot.moveForward();

    robot.printCurrentPosition()

    expect(stub.calledWith('1 5 N')).to.be.true;
  })

  it("Deve retornar direções diferentes ao realizar rotações para direita e esqueda", () => {
    const plateau = new Plateau(5, 5);
    const robot = new Robot(1, 2, 'N', plateau)

    const stub = sinon.stub(console, 'log');

    robot.rotate(robot.spin.R);
    robot.printCurrentPosition();
    expect(stub.calledWith('1 2 E')).to.be.true;

    robot.rotate(robot.spin.R);
    robot.printCurrentPosition()
    expect(stub.calledWith('1 2 S')).to.be.true;

    robot.rotate(robot.spin.L);
    robot.printCurrentPosition()
    expect(stub.calledWith('1 2 E')).to.be.true;

    robot.rotate(robot.spin.L);
    robot.printCurrentPosition()
    expect(stub.calledWith('1 2 N')).to.be.true;

    robot.rotate(robot.spin.L);
    robot.printCurrentPosition()
    expect(stub.calledWith('1 2 W')).to.be.true;

  })
})