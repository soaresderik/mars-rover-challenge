import CustomError from "../utils/error-handler.mjs";
import Control from "./Control.mjs";

/**
 * Class que representa Robô
 * @extends Control
 */
export default class Robot extends Control {
  /**
   * Direções de rotação possíveis
   */
  _spin = { L: -1, R: 1 };

  /**
   * @param {number} x - Posição do Robô em x.
   * @param {number} y - Posição do Robô em y.
   * @param {('N'|'E'|'S'|'W')} facing - Direção para onde o robô irá apontar inicialmente.
   * @param {Plateau} plateau - Platô que o robô se deslocará
   */
  constructor(x, y, facing, plateau){
    super(x, y, facing);
    this.plateau = plateau;
    this._validatePlateauLimits();
  }

  get spin() {
    return this._spin;
  }

  /**
   * Move o robô para a frente, validando se ainda está no platô
   */
  moveForward() {
    super.moveForward();
    this._validatePlateauLimits();
  }

  printCurrentPosition() {
    const message = `${this.x} ${this.y} ${this.facing}`
    console.log(message);
    
    return message;
  }

  /**
   * Função que valida posição do robô no platô
   */
  _validatePlateauLimits() {
    if(this.x > this.plateau.x || this.y > this.plateau.y ||
      this.y < 0 || this.x < 0) {
     throw new CustomError(`Ops! robô fora de alcance. Limite (${this.plateau.x}, ${this.plateau.y})`)
   }
  }
}