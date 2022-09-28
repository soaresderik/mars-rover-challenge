
import Vector2D from "./Vector2D.mjs";

/**
 * Class que representa o Platô
 * @extends Vector2D
 */
export default class Plateau extends Vector2D {

  /**
   * @param {number} x - Posição do Platô em x.
   * @param {number} y - Posição do Platô em y.
   */
  constructor(x, y){
    super(x, y);
  }
}
