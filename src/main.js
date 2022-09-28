import fs from 'fs/promises';
import path from 'path';
import { chunk, logger } from './utils/index.mjs';
import Plateau from './entities/Plateau.mjs';
import Robot from './entities/Robot.mjs';
import CustomError from './utils/error-handler.mjs';

/**
 * Função que executa ação de acordo com comando enviado
 * @param {Robot} robot - instância da classe Robot
 * @param {("M"|"L"|"R")} command - Comandos válidos
 */
 function execCommand(robot, command) {
  const commands = {
    'M': ['moveForward', []],
    'L': ['rotate', [robot.spin.L]],
    'R': ['rotate', [robot.spin.R]],
    'default': [(command) => { throw new CustomError(`Commando '${command}' Inválido! Envie somente L, R ou M`) }]
  }

  const [func, params] = (commands[command] || commands['default']);

  if(typeof func === 'function') func(command);

  robot[func](...params);
}

export async function main(){
  try {
    const inputs = await fs.readFile(path.resolve() + '/src/inputs.txt', 'utf-8');
    const [plateauPosition, ...robots] = inputs.split('\n');

    const [plateauX, plateauY] = plateauPosition.split(' ');

    const plateau = new Plateau(+plateauX, +plateauY);
    const chunkedRobots = chunk(robots, 2);

    return chunkedRobots.map((robotSettings) => {
      try {
        const [x, y, facing] = robotSettings[0].split(' ');
        const robot = new Robot(+x, +y, facing, plateau);

        robotSettings[1].split('').forEach((command) => execCommand(robot, command));

        return robot.printCurrentPosition();
      } catch(err) {
        if(err instanceof CustomError) {
          return console.error(err.message);
        }
        throw err;
      }
    });
  } catch(err) {
    if(err instanceof CustomError) {
      return console.error(err.message);
    }

    logger('Error', err);

    console.error(`Ops! Erro no código :(`);
  }
}

main();