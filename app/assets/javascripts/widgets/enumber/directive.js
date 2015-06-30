app.directive("enumber", ["ENumberModel", "SuffixFormatter", function (ENumberModel, SuffixFormatter) {

    var linkFn = function (scope, element, attrs) {
        // console.log(element.html(), attrs)

        function calculatePercentage(value, previousValue) {
            console.log("previous", previousValue, "value", value);
            if (previousValue == 0) {
                return 0;
            }
            return ((value - previousValue) / previousValue) * 100;
        }

        function onSuccess(data) {
            scope.data = data;
            scope.data.label = scope.data.label || scope.widget.label;
            if (scope.data.value > 10) {
                scope.data.value = Math.round(scope.data.value);
            } // We want to see fractions for small numbers
            scope.data.stringValue = scope.widget.use_metric_suffix ? SuffixFormatter.format(scope.data.value, 1) : scope.data.value.toString();

            scope.data.secondaryValue = calculatePercentage(scope.data.value, scope.data.prev_value);
            if (scope.widget.reversed_metric ){
                scope.data.arrow = scope.data.secondaryValue > 0 ? "green-arrow-down" : "red-arrow-up";

            } else {
                scope.data.arrow = scope.data.secondaryValue > 0 ? "green-arrow-up" : "red-arrow-down";
            }
            scope.data.color = scope.data.secondaryValue > 0 ? "color-up" : "color-down";

        }

        function update() {
            return ENumberModel.getData(scope.widget).success(onSuccess);
        }

        scope.init(update);
        console.log("FUUU;");
    };

    return {
        templateUrl: "templates/widgets/enumber/show.html",
        link: linkFn
    };
}]);
