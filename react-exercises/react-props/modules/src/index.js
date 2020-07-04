import foods from "./foods";
import { choice, remove } from "./helpers";

const fruit = choice(foods);

console.log(`I'd like one ${fruit}, please`);
console.log(`Here you go: ${remove(foods, fruit)}`);
console.log(`Delicious! May I have another?`);
console.log(`Sorry, we're all out. We have ${foods.length} left`);
