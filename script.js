var canvas = document.getElementById('app');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var particles = [];

var createCirclesDynamically = function(change) {
    change = change || { //check if is anything added/changed in function. If not - object is not changed.
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height
    }
    if (particles.length > 1000) {
        particles.shift();
    }
    var red = Math.floor(Math.random() * 255);
    var green = Math.floor(Math.random() * 255);
    var blue = Math.floor(Math.random() * 255);
    var alpha = Math.random();
    var object = {
        x: change.x,
        y: change.y,
        xVelocity: Math.random() - 0.5,
        yVelocity: Math.random() - 0.5,
        radius: 20,
        color: `rgba(${red}, ${green}, ${blue}, ${alpha})`
    }
    particles.push(object);
}
var moveCircles = function() {
    particles.forEach(function(particle) {
        particle.x += particle.xVelocity;
        particle.y += particle.yVelocity;
    })
}

var fadeCircles = function() {
    particles.forEach(function(particle) {
        particle.radius *= 0.99;
    });
}

canvas.addEventListener('click', function(e) {
    for (var i = 0; i < 10; i++) {
        createCirclesDynamically({
            x: e.clientX,
            y: e.clientY,
        });
    }
});

canvas.addEventListener('mousemove', function(e) {
    for (var i = 0; i < 10; i++) {
        createCirclesDynamically({
            xVelocity: e.clientX,
            yVelocity: e.clientY,
        });
    }
});

var draw = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //draw each circle in new line
    particles.forEach(function(particle) {
        ctx.beginPath();
        ctx.fillStyle = particle.color;
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
    });

}

var app = function() {
    createCirclesDynamically();
    draw();
    moveCircles();
    fadeCircles();
    window.requestAnimationFrame(app);
}
app();
