(function(global) {  
    var HomeViewModel,
    app = global.app = global.app || {};

    HomeViewModel = kendo.data.ObservableObject.extend({
        history:  null,
        
        
        init: function (e) {
            var that = this;
            /*,
            bus;*/
            
            kendo.data.ObservableObject.fn.init.apply(that, []);
            
            sqlite.init();
            sqlite.getData(getResp);
            function getResp(tx, rs) {
                var resp = [];
                console.log("IN IF !!!");
                for (var i = rs.rows.length - 1; i > 0; i--) {
                    var item = rs.rows.item(i);
                    console.log(item);
                    resp.push(item);
                }
        
                console.log(resp);
                console.log(resp.length);
                if (resp != null && resp.length > 0) {
                    app.home.viewModel.set("history", resp);
                }
                else {
                    app.home.viewModel.set("history", []);
                }
                var x = 767;
            } 
        }
    });
    app.home = {
        viewModel: new HomeViewModel()
    };
})(window);