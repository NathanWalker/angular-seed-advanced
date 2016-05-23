/**
 * Created by Jimmy on 16/5/19.
 */
import {AppComponent} from './app.component';
import {Ng2StateDeclaration} from 'ui-router-ng2/ng2/interface';
import {ABOUT_STATES} from '../about/about.states';
import {HOME_STATES} from '../home/home.states';

// The top level states
let MAIN_STATES: Ng2StateDeclaration[] = [
    // The top-level app state. This state fills the root
    // <ui-view></ui-view> (defined in index.html) with the AppComponent
    { name: 'root', component: AppComponent }
];

// Combine ABOUT_STATES, HOME_STATES and export them.
// This array is imported in app/router.config.ts, then each state is registered
export let INITIAL_STATES: Ng2StateDeclaration[]
    = MAIN_STATES.concat(ABOUT_STATES).concat(HOME_STATES);
