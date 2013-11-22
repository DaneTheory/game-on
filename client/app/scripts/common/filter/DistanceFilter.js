//
//
//

app.filter('distance', function () {
    return function (distance) {

        var rounded = Math.round(distance * 10) / 10,
            formatted;

        if (rounded < 1) {
            // Converte to metres.
            rounded = rounded * 100;
            formatted = rounded + ' metres';
        } else {
            formatted = rounded + ' km';
        }

        return formatted;
    };
});