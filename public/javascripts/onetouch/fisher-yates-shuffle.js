var module = module || undefined;

/**
 * Randomize array element order in-place.
 * Using Fisher-Yates shuffle algorithm.
 *
 * Taken from http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */
function shuffleFisherYates(elements, mt) {
	if (!elements || !elements instanceof Array) {
		throw new Error("'elements' object must be a valid Array.");
	}

	for (var i = elements.length - 1; i > 0; i--) {
		var j = mt.nextInt(i+1);//WORKS!
		//var j = mt.genrand_int32() % (i + 1);

		var temp = elements[i];
		elements[i] = elements[j];
		elements[j] = temp;
	}
}

// Add CommonJS Module
if (module) {
	module.exports = shuffleFisherYates;
}