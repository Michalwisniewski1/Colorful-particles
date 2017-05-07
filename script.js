var canvas = document.getElementById('app');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var particles = [];
var maxNumberOfCircles = 3000;

var createCirclesDynamically = function(change) {
    change = change || { //check if is anything added/changed in function. If not - object is not changed.
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 20,
        xVelocity: Math.random() - 0.5,
        yVelocity: Math.random() - 0.5
    }
    if (particles.length > maxNumberOfCircles) {
        particles.shift();
    }
    var red = Math.floor(Math.random() * 255);
    var green = Math.floor(Math.random() * 255);
    var blue = Math.floor(Math.random() * 255);
    var alpha = Math.random();
    var object = {
        x: change.x,
        y: change.y,
        xVelocity: change.xVelocity,
        yVelocity: change.yVelocity,
        radius: change.radius,
        color: `rgba(${red}, ${green}, ${blue}, ${alpha})`
    }
    particles.push(object);
}
var moveCircles = function(particle) {
    particle.x += particle.xVelocity;
    particle.y += particle.yVelocity;
}

var fadeCircles = function(particle) {
    particle.radius *= 0.99;
}

canvas.addEventListener('mousemove', function(e) {
    console.log(e);
    for (var i = 0; i < 1; i++) {
        createCirclesDynamically({
            x: e.clientX,
            y: e.clientY,
            radius: 5,
            xVelocity: (Math.random() - 0.5) * 10,
            yVelocity: (Math.random() - 0.5) * 10
        });
    }
});


var draw = function(particle) {
    ctx.beginPath();
    ctx.fillStyle = particle.color;
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fill();

}

var app = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //draw each circle in new line
    createCirclesDynamically();
    particles.forEach(function(particle) {
        draw(particle);
        moveCircles(particle);
        fadeCircles(particle);
    });


    window.requestAnimationFrame(app);
}
app();
