import Config from '../../config';
import { clean } from '../../utils';

/**
 * Executes the build process, cleaning all files within the `/dist` directory.
 */
export = clean([Config.TNS_APP_DEST]);
