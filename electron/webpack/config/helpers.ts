import * as path from 'path';
import Config from '../../../tools/config';

const EVENT = process.env.npm_lifecycle_event || '';
var ROOT = path.resolve(Config.ELECTRON_BASE_DIR);

export function hasProcessFlag(flag) {
    return process.argv.join('').indexOf(flag) > -1;
}

export function hasNpmFlag(flag) {
    return EVENT.includes(flag);
}

export function isWebpackDevServer() {
    return process.argv[1] && !! (/webpack-dev-server/.exec(process.argv[1]));
}

export var root = path.join.bind(path, ROOT);

