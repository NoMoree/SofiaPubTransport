window.httpRequest =
{
    getJSON: function(url)
    {
        var promise = new RSVP.Promise(function(resolve, reject)
        {
        //var deferred = Q.defer();
            $.ajax({
                url:url,
                type:"GET",
                dataType:"json",
                contentType:"application/json",
                timeout:10000,
                success:function(data)
                {
                    //deferred.
                    resolve(data);
                },
                error:function(err)
                {
                    //deferred.
                    reject(err);
                }
            });
        });
        return promise;
        //return deferred.promise;
    },
    
    postJSON: function(url, data)
    {
        var promise = new RSVP.Promise(function(resolve, reject)
        {
        //var deferred = Q.defer();
            $.ajax({
                url:url,
                type:"POST",
                dataType:"json",
                contentType:"application/json",
                timeout:10000,
                data: JSON.stringify(data),
                success:function(data)
                {
                    //deferred.
                    resolve(data);
                },
                error:function(err)
                {
                    //deferred.
                    reject(err);
                }
            });
        });
        return promise;
        //return deferred.promise;
    }
      
};