export function shuffle(array) {
	let i = array.length, temp, index;
	while(i > 0) {
		index = Math.floor(Math.random() * i);
		i--;
		temp = array[i];
		array[i] = array[index];
		array[index] = temp;
	}
	return array;
}
