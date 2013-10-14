var app = app || {};

(function() {
    document.addEventListener("deviceready", function () {
        app.application = new kendo.mobile.Application(document.body, { layout: "tabstrip-layout" });
        
        var refresh1st = function() 
        {
            navigator.notification.vibrate(300);
            app.home.refreshData();
        }
        shake.startWatch(refresh1st);
        
    }, false);
    
    document.addEventListener("offline", function () {
        app.globalViewModel.viewModel.isOffline = true;
    }, false);
    
    document.addEventListener("online", function () {
        app.globalViewModel.viewModel.isOffline = false;
    }, false);
    
   
}());