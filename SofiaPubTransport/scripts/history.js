(function (global) {
    var HomeViewModel,
    app = global.app = global.app || {};

    HomeViewModel = kendo.data.ObservableObject.extend({
        history: null,
        refreshData: refreshData,


        init: function (e) {
            var that = this;

            kendo.data.ObservableObject.fn.init.apply(that, []);

            sqlite.init();
            sqlite.getData(getResp);
            function getResp(tx, rs) {
                var resp = [];
                console.log("IN IF !!!");
                for (var i = rs.rows.length - 1; i > 0; i--) {
                    var item = rs.rows.item(i);
                    //console.log(item);
                    resp.push(item);
                }

                if (resp != null && resp.length > 0) {
                    app.home.viewModel.set("history", resp);
                }
                else {
                    app.home.viewModel.set("history", []);
                }
            }
        }
    });

    function refreshData(e) {
        if (app.globalViewModel.viewModel.isOffline) {
            navigator.notification.alert("Нужна е интернет връзка!");
            
            return;
        }
        
        var resend ;
        if (e == null || resend = e.dataItem.resent.split == null) {
            resend = app.home.viewModel.history[0].resent.split("-");
        }
        else {
            resend = e.dataItem.resent.split("-");

            var sendData = {
                "selectedTypeId": parseInt(resend[0]),
                "selectedNumber": resend[1],
                "selectedDirectionId": parseInt(resend[2]),
                "stopId": parseInt(resend[3])
            }
        
            /*http://localhost:58649    http://transport-1.apphb.com*/
            httpRequest.postJSON("http://localhost:58649/Api/Transport/GetSchedules", sendData)
            .then(function (result) {
                ////local testing
                //result = {"t":"22:38,23:01,23:29","a":"12.10.2013 22:26","more":[{"a":"22:51,23:16,23:43","n":"83","t":1},{"a":"22:38,23:04,23:27","n":"102","t":1},{"a":"22:39,23:14","n":"73","t":1}]};
                console.log(result);
            
                var more = "";

                var typeName = "Тролейбус";
                if (sendData.selectedTypeId == 0) {
                    typeName = "Автобус";
                }
                else if (sendData.selectedTypeId == 1) {
                    typeName = "Травмай";
                }
                else if (sendData.selectedTypeId == 2) {
                    typeName = "Тролейбус";
                }

                if (result.more.length > 0) {
                    more += typeName;
                    for (var i = 0; i < result.more.length; i++) {
                        more += "s" + result.more[i].n + "-" + result.more[i].a;
                    }
                }
                var data = resend;

                var number = sendData.selectedNumber;
                var toAdd = {
                    "takedAt": result.a,
                    "typeName": typeName,
                    "mainNumber": number,
                    "mainTime": result.t,
                    "more": more,
                    "stopName": e.dataItem.stopName,
                    "resent": data
                };
                sqlite.addResponse(toAdd);

                var resp = [];
                sqlite.getData(getResp);
                function getResp(tx, rs) {
                    if (rs != null && rs.rows.length > 0) {
                        console.log("IN IF !!!");
                        for (var i = rs.rows.length - 1; i > 0; i--) {
                            console.log("IN FOR !!!");
                            resp.push(rs.rows.item(i));
                        }
                    }

                    console.log(resp);
                    console.log(resp.length);
                    if (resp != null && resp.length > 0) {
                        app.home.viewModel.set("history", resp);
                    }
                    else {
                        app.home.viewModel.set("history", []);
                    }
                };
                navigator.notification.vibrate(100);
            },
                  function (err) {
                      navigator.notification.alert(JSON.stringify(err));
                      console.log(JSON.stringify(err));
                      console.log(err);
                  });
        }
    }
    app.home = {
        viewModel: new HomeViewModel()
    };
})(window);