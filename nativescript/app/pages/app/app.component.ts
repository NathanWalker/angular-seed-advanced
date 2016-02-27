// angular
import {Inject} from 'angular2/core';

// nativescript
import {registerElement} from 'nativescript-angular/element-registry';
import {ActionItem} from 'ui/action-bar';
import {topmost} from 'ui/frame';

import {AppComponent} from '../../components/app/app.component';
import {LogService} from '../../frameworks/core.framework/index';
import {ActionBarUtil} from '../../shared/utils/actionbar.util';

registerElement('RadSideDrawer', () => require('nativescript-telerik-ui/sidedrawer').RadSideDrawer);

// directives
import {ElementRef, Directive, Input, TemplateRef, ViewContainerRef} from "angular2/core";
import {TabView, TabViewItem} from "ui/tab-view";
import {RadSideDrawer} from 'nativescript-telerik-ui/sidedrawer/sidedrawer';

@Directive({
    selector: 'RadSideDrawer'
})
export class RadSideDrawerDirective {
    public drawer: RadSideDrawer;

    constructor(private element: ElementRef) {
        this.drawer = element.nativeElement;
    }
}

@Directive({
    selector: '[mainContent]'
})
export class RadSideDrawerMainDirective {

    constructor(
        private owner: RadSideDrawerDirective,
        private templateRef: TemplateRef,
        private viewContainer: ViewContainerRef
    ) {
    }

    ngOnInit() {

        const viewRef = this.viewContainer.createEmbeddedView(this.templateRef);
        //Filter out text nodes, etc
        const realViews = viewRef.rootNodes.filter((node) =>
                            node.nodeName && node.nodeName !== '#text')

        if (realViews.length > 0) {
            this.owner.drawer.mainContent = realViews[0];
        }
    }
}

@Directive({
    selector: '[drawerContent]'
})
export class RadSideDrawerContentDirective {

    constructor(
        private owner: RadSideDrawerDirective,
        private templateRef: TemplateRef,
        private viewContainer: ViewContainerRef
    ) {
    }

    ngOnInit() {

        const viewRef = this.viewContainer.createEmbeddedView(this.templateRef);
        //Filter out text nodes, etc
        const realViews = viewRef.rootNodes.filter((node) =>
                            node.nodeName && node.nodeName !== '#text')

        if (realViews.length > 0) {
            this.owner.drawer.drawerContent = realViews[0];
        }
    }
}

// angular
import {ViewEncapsulation} from 'angular2/core';
import {RouteConfig} from 'angular2/router';

// app
import {RouteComponent} from '../../frameworks/core.framework/index';
import {LangSwitcherComponent} from '../../frameworks/i18n.framework/index';
import {NavbarComponent} from '../../components/app/navbar.component';
import {ToolbarComponent} from '../../components/app/toolbar.component';
import {HomeComponent} from '../../components/home/home.component';
import {AboutComponent} from '../../components/about/about.component';
import {NameListService} from '../../frameworks/app.framework/index';

@RouteComponent({
  selector: 'sd-app',
  viewProviders: [NameListService],
  templateUrl: './components/app/app.component.html',
  directives: [LangSwitcherComponent, NavbarComponent, ToolbarComponent, RadSideDrawerDirective, RadSideDrawerMainDirective, RadSideDrawerContentDirective],
  encapsulation: ViewEncapsulation.None
})
@RouteConfig([
  { path: '/', component: HomeComponent, as: 'Home' },
  { path: '/about', component: AboutComponent, as: 'About' }
])
export class NSAppComponent {
  
  constructor(private log: LogService) {
    log.o('NSAppCmp ----');
    
    let btn = new ActionItem();
    btn.icon = 'res://ic_menu';
    btn.ios.position = 'left';
    btn.on('tap', this.toggleDrawer.bind(this));
    ActionBarUtil.ADD_BUTTON(btn);
    
    // ActionBarUtil.SET_TITLE('Angular 2 Seed Advanced');
    ActionBarUtil.SET_TITLE('RadSideDrawer w/Angular2');
    ActionBarUtil.STATUSBAR_STYLE(1);
  }
  
  public toggleDrawer() {
    topmost().currentPage.getViewById("drawer").toggleDrawerState();
  }
}


// export class NSAppComponent extends AppComponent {
  
//   constructor(@Inject(LogService) private log: LogService) {
//     super();
//     log.o('NSAppCmp ----');
//     ActionBarUtil.SET_TITLE('Angular 2 Seed Advanced');
//   }
// }
