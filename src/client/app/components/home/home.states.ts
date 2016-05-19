import {Ng2StateDeclaration} from "ui-router-ng2";
import {HomeComponent} from "./home.component";
/**
 * This file defines the states for the `foo` module.
 * The states are exported as an array.
 * The parent module imports this array and concats them into the master state list.
 */

/**
 * The 'foo' submodule's states.
 */
export let HOME_STATES: Ng2StateDeclaration = [
    // A state for the 'app.foo' submodule,
    // It fills the unnamed <ui-view> ($default) (in the AppComponent from the `app` state) with `FooComponent`
    {
        name: 'root.home',
        url: '/home',
        views: {
            $default: {component: HomeComponent}
        }
    }
];

