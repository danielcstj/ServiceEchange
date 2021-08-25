const theName='Daniel';
let age=33;

console.log(theName);
age++;
console.log(age);

const test = 1 + true;
console.log(test);



function displayUser(name,age){
    console.log(`Bonjour mon nom est ${name},j'ai ${age} ans`);

}
displayUser('Rosalie',12);

const fruits = ['Kiwi', 'Banane', 'Fraise' , 'Pamplemousse', 'Mangue'];

console.log(fruits);

for(let fruit of fruits){
    console.log(fruit);
}
fruits.forEach(f =>console.log (f));
const sum= (a,b) => a + b ;
const result = sum(2,5);
console.log(result);

const someFruits = fruits.filter(fruit => f.length > 5)
console.log(someFruits);

const numbers = [10,20,30,40];
const MULTIPLIER =3;
const products = numbers.map(n => n * MULTIPLIER).filter(n=> n > 75).map(n=> n + 9);
console.log(products);
console.log(numbers);
console.log(products);
numbers.push(50);

const avenger = {
    alterEgo:'Peter Parker',
    hero:'Spiderman',
    movies:[{title:''},{title:''},{title:''}]
    
}

console.log(avenger.alterEgo)
avenger.movies.forEach(m => console.log(m.title));
