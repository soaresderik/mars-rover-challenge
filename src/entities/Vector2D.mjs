import CustomError from "../utils/error-handler.mjs";

/**
 * Class abstrata para objetos que possam se deslocar em um plano cartesiano 
 * @extends Control
 */
export default class Vector2D {
  _points = ['N', 'E', 'S', 'W'];
  _x;
  _y;

  /**
   * @param {number} x - Posição do Vetor em x.
   * @param {number} y - Posição do Vetor em y.
   */
  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  set x(value) {
    if(isNaN(value)) {
      throw new CustomError(`[${this.constructor.name}] Valor de x deve ser um número!`);
    }

    if(value <= 0) {
      throw new CustomError(`[${this.constructor.name}] Valor de x deve ser maior que 0!`);
    }

    this._x = value;
  }

  get x() {
    return this._x;
  }

  set y(value) {
    if(isNaN(value)) {
      throw new CustomError(`[${this.constructor.name}] Valor de y deve ser um número!`);
    }

    if(value <= 0) {
      throw new CustomError(`[${this.constructor.name}] Valor de y deve ser maior que 0!`);
    }

    this._y = value;
  }

  get y() {
    return this._y;
  }

  get points() {
    return this._points;
  }
}