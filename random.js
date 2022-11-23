let btnRandom = document.querySelector('button');
let result = document.querySelector('h1');

let users = ['Messi', 'Ronaldo', 'Pogba', 'Benzema', 'Mbappe', 'De Bruyne', 'Haaland', 'Curtois'];


function getRandomNumber(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.random(step2) + min;

    return result;

}

btnRandom.addEventListener('click', () => {
    let index= getRandomNumber(0, users.lerght-1);
    result.innerText = users[index];


})
