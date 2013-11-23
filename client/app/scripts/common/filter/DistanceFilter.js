//
//
//

app.filter('distance', function ($filter) {
    return function (distance) {

        var formatted,
            unit;

        if (distance < 1) {
            // Converte to metres.
            distance = distance * 100;
            unit = 'm';
        } else {
            unit = 'km';
        }

        formatted = $filter('number')(distance, 1) + ' ' + unit;

        return formatted;
    };
});