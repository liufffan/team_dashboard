app.factory("ExtendedNumberModel", ["$http", "TimeSelector", function($http, TimeSelector) {

  function getParams(config) {
    var result = {
      source: config.source,
      widget_id: config.id
    };

    if (config.range) {
        var to = TimeSelector.getCurrent(config.range)

        if (config.range === 'yesterday') {
            to = new Date();
            to.setDate(to.getDate() -1 );
            to = to.getTime() / 1000;
        }

      _.extend(result, { from: TimeSelector.getFrom(config.range), to: to})
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