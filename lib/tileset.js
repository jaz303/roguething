var TILE_SIZE = require('./config').TILE_SIZE;
var TILE_DRAW_SIZE = require('./config').TILE_DRAW_SIZE;

function Tile(ts, sx, sy) {
	this._tileset = ts;
	this._sx = sx;
	this._sy = sy;
}

Tile.prototype.draw = function(ctx, x, y) {
	ctx.drawImage(
		this._tileset.images[0],
		this._sx, this._sy,
		TILE_SIZE, TILE_SIZE,
		x, y,
		TILE_DRAW_SIZE, TILE_DRAW_SIZE);
}

module.exports = function(id, images) {
	var tiles = [];
	var width = images[0].width;
	var height = images[0].height;

	var tileset = {
		id: id,
		images: images,
		tiles: []
	};

	for (var i = 0; i < width; i += TILE_SIZE) {
		for (var j = 0; j < height; j += TILE_SIZE) {
			tileset.tiles.push(new Tile(tileset, i, j));
		}
	}

	return tileset;
}