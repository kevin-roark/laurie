$(function() {

    var xmas = $('#chrimbas-text');
    var cur_color = 'red';
    var border_color = 'green';

    var bouncers = [
        $('#whatever-bro'),
        $('#dear-deer'),
        $('#super-kawaii'),
        $('#easter'),
        $('#nyc')
    ];

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function change_xmas_color() {
        border_color = cur_color;
        if (cur_color == 'red') {
            cur_color = 'green';
        }
        else {
            cur_color = 'red';
        }
        xmas.css('color', cur_color);
        xmas.css('border-top', 'solid 3px ' + border_color);
        xmas.css('border-bottom', 'solid 3px ' + border_color);
    }

    function bounce_images() {
        for (var i=0; i<bouncers.length; i++) {
            var bouncer = bouncers[i];
            var bounce_x = getRandomInt(-7, 7);
            var bounce_y = getRandomInt(-7, 7);

            var cur_top = parseInt(bouncer.css('top'));
            var cur_left = parseInt(bouncer.css('left'));

            bouncer.css('top', cur_top + bounce_y);
            bouncer.css('left', cur_left + bounce_x);
        }
    }

    setInterval(change_xmas_color, 400);
    setInterval(bounce_images, 100);
});