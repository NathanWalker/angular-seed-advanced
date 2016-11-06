import Config from '../../config';
import { clean } from '../../utils';
import { join } from 'path';

/**
 * Executes the build process, cleaning all files within the `/dist/dev` directory.
 */
export = clean([
    join(Config.APP_MVC_DEST, 'Views/Shared/_Layout.cshtml'),
    join(Config.APP_MVC_DEST, 'wwwroot')
    ]);
