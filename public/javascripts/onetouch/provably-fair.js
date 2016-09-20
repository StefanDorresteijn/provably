// Make available to browsers
var CryptoJS = CryptoJS || undefined;
var MersenneTwister = MersenneTwister || undefined;
var shuffleFisherYates = shuffleFisherYates || undefined;

/**
 * Our provably fair algorithms.
 */
var provablyFair = {
	/**
	 * Tells us whether the given values resulted in a fair game.
	 */
	verifyBlackjack: function(clientSeed, initialHash, serverSeed, initialShuffle, finalShuffle) {
		var result = {
			SHA: false,
			initData: false,
			dealerSeed: false,
			playerSeed: false,
			finalData: false
		};

		var seedSHA = CryptoJS.SHA256(initialShuffle + "|" + serverSeed).toString();
		if (seedSHA === initialHash) {
			result.SHA = true;
			result.initData = true;
			result.dealerSeed = true;
		}

		var clientSeedSHA = CryptoJS.SHA256(clientSeed).toString();

		var smallClientSeedSHA = clientSeedSHA.slice(-8);
		var seedInt = parseInt(smallClientSeedSHA, 16);
		var mt = new MersenneTwister(seedInt);

		var cards = initialShuffle.split(',');
		shuffleFisherYates(cards,mt);

		var myFinalShuffle = cards.join(',');

		if (myFinalShuffle === finalShuffle) {
			result.playerSeed = true;
			result.finalData = true;
		}
		return result;
	}
};

