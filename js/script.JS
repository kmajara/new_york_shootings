document.addEventListener('DOMContentLoaded', function() {
    const picture1 = document.getElementById('picture1');
    const picture2 = document.getElementById('picture2');
    const picture3 = document.getElementById('picture3');
    const picture4 = document.getElementById('picture4');

    picture1.addEventListener('click', function() {
        picture1.src = '../images/chart2d_incidents.png'; // Updates were made, still needs fixing?

    picture2.addEventListener('click', function() {
        picture2.src = '../images/chart2d_incidents.png'; // Updates were made, still needs fixing?
    });

    picture3.addEventListener('click', function() {
        picture3.src = 'path/to/your/another-image2.jpg'; //No updates were made here s
    });

    picture4.addEventListener('click', function() {
        picture4.src = 'path/to/your/another-image2.jpg'; // No updates were made here
    });


});