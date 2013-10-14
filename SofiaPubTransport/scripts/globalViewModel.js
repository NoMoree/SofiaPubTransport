(function (global) {
    var GlobalViewModel,
        app = global.app = global.app || {};

    GlobalViewModel = kendo.data.ObservableObject.extend({
        isOffline: false
    });

    app.globalViewModel = {
        viewModel: new GlobalViewModel()
    };
})(window);