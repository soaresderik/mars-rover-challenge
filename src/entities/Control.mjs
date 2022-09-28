import CustomError from "../utils/error-handler.mjs";
import Vector2D from "./Vector2D.mjs";

/**
 * Class abstrata para controlar objetos do tipo Vector2D
 * @extends Vector2D
 */
export default class Control extends Vector2D {
  _movements = {
    'N': {x: 0, y: 1},
    'E': {x: 1, y: 0},
    'S': {x: 0, y: -1},
    'W': {x: -1, y: 0},
  }

  constructor(x, y, facing){
    super(x, y);
    this.facing = facing;
  }

  /**
   * Função para rotacionar objetos
   * @param {Number} turn - Direção da rotação
   */
  rotate(turn) {
    const current = this.points.indexOf(this.facing);
    const pointLength = this.points.length; 

    const newIndex = (pointLength + (current + turn)) % pointLength;

    this.facing = this.points[newIndex];
  }

  moveForward(){
    const moveTo = this.movements[this.facing];

    this._x += moveTo.x;
    this._y += moveTo.y;
  }

  get movements() {
    return this._movements;
  }

  /**
   * @param {Vector2D.points} faceTo - Configurar direção principal
   */
  set facing(faceTo) {
    if(!this.points.includes(faceTo)){
      throw new CustomError(`[${this.constructor.name}] Direção inválida!`);
    }

    this._facing = faceTo;
  }

  get facing() {
    return this._facing;
  }
}