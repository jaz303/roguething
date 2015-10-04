var canvas, ctx;

window.init = function() {
	require('./preload')(function(err, res) {
		if (err) {
			console.error(err);
			return;
		}
		canvas = document.getElementById('c');
		ctx = canvas.getContext('2d');
		ctx.imageSmoothingEnabled = false;

		res.tilesets.objects_floor.tiles[3].draw(ctx, 32, 32);
	});
}