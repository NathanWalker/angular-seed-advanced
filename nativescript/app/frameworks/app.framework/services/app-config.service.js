"use strict";
var AppConfigService = (function () {
    function AppConfigService() {
    }
    AppConfigService.SUPPORTED_LANGUAGES = [
        { code: 'en', title: 'English' },
        { code: 'es', title: 'Spanish' },
        { code: 'fr', title: 'French' },
        { code: 'ru', title: 'Russian' },
        { code: 'bg', title: 'Bulgarian' }
    ];
    return AppConfigService;
}());
exports.AppConfigService = AppConfigService;
//# sourceMappingURL=app-config.service.js.map