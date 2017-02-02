"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var platform_browser_1 = require("@angular/platform-browser");
var angularfire2_1 = require("angularfire2");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var toolbar_1 = require("@angular2-material/toolbar");
var button_1 = require("@angular2-material/button");
var card_1 = require("@angular2-material/card");
exports.MD_MODULES = [
    toolbar_1.MdToolbarModule,
    button_1.MdButtonModule,
    card_1.MdCardModule
];
var app_component_1 = require("./app.component");
var home_component_1 = require("./home/home.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            home_component_1.HomeComponent
        ],
        imports: [
            angularfire2_1.AngularFireModule.initializeApp({
                apiKey: "AIzaSyCvHzf-lIrUzM1KjgH_jwDZGHH38ItULWA",
                authDomain: "ibeaconapp-62c4a.firebaseapp.com",
                databaseURL: "https://ibeaconapp-62c4a.firebaseio.com",
                storageBucket: "ibeaconapp-62c4a.appspot.com"
            }, {
                method: angularfire2_1.AuthMethods.Popup
            }),
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule
        ],
        providers: [],
        bootstrap: [app_component_1.AppComponent]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
