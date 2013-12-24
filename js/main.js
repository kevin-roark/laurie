$(function() {

    // RequestAnimFrame: a browser API for getting smooth animations
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     ||  
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

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

    var xmas_colors = [
        'rgb(255, 0, 0)',
        'rgb(225, 25, 25)',
        'rgb(205, 40, 40)',
        'rgb(200, 50, 50)',
        'rgb(175, 60, 60)',
        'rgb(25, 225, 25)',
        'rgb(40, 205, 40)',
        'rgb(50, 200, 50)',
        'rgb(60, 175, 60)',
        'rgb(0, 255, 0)',
    ];
    xmas_colors.sort(function() {return 0.5 - Math.random()});

    var canvas = document.getElementById('full-screen-canvas');
    var ctx = canvas.getContext('2d');
    ctx.width = window.innerWidth;
    ctx.height = window.innerHeight;

    var globes = [];
    for (var i=0; i<15; i++)
        globes.push(new Globe(-10, -10));
    var nextGlobeColorIdx = -1;

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
            var next_top = Math.max(0, cur_top + bounce_y);
            var next_left = Math.max(0, cur_left + bounce_x);

            bouncer.css('top', next_top);
            bouncer.css('left', next_left);
        }
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, ctx.width, ctx.height);
    }

    function draw() {
        clearCanvas();
        for (var i=0; i<globes.length; i++) {
            var globe = globes[i];
            globe.draw();
        }
    }

    function Globe(x, y, color) {
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.color = color;

        this.draw = function() {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.radius, Math.PI*2, false);
            ctx.fill();
            ctx.closePath();
        }
    }

    function getNextGlobeColor() {
        nextGlobeColorIdx++;
        if (nextGlobeColorIdx >= xmas_colors.length)
            nextGlobeColorIdx = 0;
        return xmas_colors[nextGlobeColorIdx];
    }

    function mouse_moved(e) {
        globes.shift();
        var x = e.pageX;
        var y = e.pageY;
        globes.push(new Globe(x, y, getNextGlobeColor()));
    }

    function trailLoop() {
        draw();
        requestAnimFrame(trailLoop);
    }

    setInterval(change_xmas_color, 400);
    setInterval(bounce_images, 100);
    $(document).mousemove(mouse_moved);
    trailLoop();
});