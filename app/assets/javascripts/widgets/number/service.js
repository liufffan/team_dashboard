app.factory("NumberModel", ["$http", "TimeSelector", function($http, TimeSelector) {

  function getParams(config) {
    var result = {
      source: config.source,
      widget_id: config.id
    };

    if (config.range) {
        var to = TimeSelector.getCurrent(config.range);
        var from;

        if (config.range === 'yesterday') {
            to = new Date();
            to.setDate(to.getDate() -1 );
            to = to.getTime() / 1000;
        }

        if (config.range === '7-days') {
            to = new Date();
            from = new Date();
            to.setDate(to.getDate() - 7 );
            from.setDate(from.getDate() -7);
            from = from.setHours(0, 0, 0, 0);
            from = from/1000;
            to = to.getTime() / 1000;
        }
        from = (typeof(from) !== 'undefined') ? from : TimeSelector.getFrom(config.range);

      _.extend(result, { from: from , to: to})
    }

    return result;
  }

  function getData(config) {
    return $http.get("/api/data_sources/number", { params: getParams(config) });
  }

  return {
    getData: getData
  };
}]);