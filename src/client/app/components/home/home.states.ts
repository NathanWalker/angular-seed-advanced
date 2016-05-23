import {Ng2StateDeclaration} from 'ui-router-ng2';
import {HomeComponent} from './home.component';
/**
 * This file defines the states for the `home` module.
 * The states are exported as an array.
 * The parent module imports this array and concats them into the master state list.
 */

/**
 * The 'home' submodule's states.
 */
export let HOME_STATES: Ng2StateDeclaration = [
    // A state for the 'root.home' submodule,
    // It fills the unnamed <ui-view> ($default) (in the AppComponent from the `root` state) with `FooComponent`
    {
        name: 'root.home',
        url: '/home',
        views: {
            $default: {component: HomeComponent}
        }
    }
];

