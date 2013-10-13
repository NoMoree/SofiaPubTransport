var sqlite = (function() {
    var app = app || {};
    app.db = null;

    function init() {
        app.openDb();
        app.createTable();
    }
    
    app.openDb = function() {
        if (window.sqlitePlugin !== undefined) {
            app.db = window.sqlitePlugin.openDatabase("TransportDbProba3228r");
            
            console.log("gorno");
        }
        else {
            app.db = window.openDatabase("TransportDbProba3228r", "1.0", "TransportDbProba3228rDemo", 200000);
            
            console.log("dolno");
        }
    }
    
    app.createTable = function() {
        console.log("Creating DB");
        
        app.db.transaction(function(tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS Response" +
                          "(id INTEGER PRIMARY KEY ASC, " +
                          "takedAt TEXT, " +
                          "typeName TEXT, " +
                          "mainNumber TEXT, " +
                          "mainTime TEXT, " +
                          "more TEXT, " +
                          "stopName TEXT, "+
                          "resent TEXT);", [],
                          
                          console.log("Creating DB DONE2"));
        });
    }
    
    app.insertResponse = function(response) {
        /*app.openDb();
        app.createTable();*/
        app.db.transaction(function(tx) {
            tx.executeSql("INSERT INTO Response(takedAt, typeName, mainNumber, mainTime, more, stopName, resent) VALUES (?, ?, ?, ?, ?, ?, ?);",
                          [response.takedAt, response.typeName, response.mainNumber, response.mainTime, response.more, response.stopName, response.resent],
                          app.onSuccess,
                          app.onError);
        });
    }
    
    app.deleteResponse = function(id) {
        app.db.transaction(function(tx) {
            tx.executeSql("DELETE FROM Response WHERE id = ?;",
                          [id],
                          app.onSuccess,
                          app.onError);
        });
    }

    app.selectAllResponse = function(fn) {
        /*app.openDb();
        app.createTable();*/
        app.db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM Response;", [],
                          fn,
                          app.onError);
        });
    }

    function getAllTheData(handleReceivedData) {
        app.selectAllResponse(handleReceivedData);
    }
    
    /*function getAllTheData() {
    var resp = [];
        
    app.selectAllResponse(getResp);
        
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
            
    app.home.set("history", resp);
    return resp;
           
    }
    }*/
    
    app.onSuccess = function(tx, r) {
        console.log("Your SQLite query was successful!");
        //navigator.notification.alert("Your SQLite query was successful!");
    }

    app.onError = function(tx, e) {
        console.log("SQLite Error: " + e.message);
        navigator.notification.alert(JSON.stringify(e.message));
    }

    init();
    /*document.addEventListener("deviceready", init, false);*/
    /*init();*/
    return {
        init:init,
        getData:getAllTheData,
        addResponse:app.insertResponse,
        deleteResponse:app.deleteResponse
    }
}());