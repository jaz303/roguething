(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.TILE_SIZE			= 16;
exports.TILE_DRAW_SIZE		= 32;
},{}],2:[function(require,module,exports){
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
},{"./preload":3}],3:[function(require,module,exports){
var tileset = require('./tileset');

const TILESETS = [
	'Characters/Aquatic0.png',
	'Characters/Aquatic1.png',
	'Characters/Avian0.png',
	'Characters/Avian1.png',
	'Characters/Cat0.png',
	'Characters/Cat1.png',
	'Characters/Demon0.png',
	'Characters/Demon1.png',
	'Characters/Dog0.png',
	'Characters/Dog1.png',
	'Characters/Elemental0.png',
	'Characters/Elemental1.png',
	'Characters/Humanoid0.png',
	'Characters/Humanoid1.png',
	'Characters/Misc0.png',
	'Characters/Misc1.png',
	'Characters/Pest0.png',
	'Characters/Pest1.png',
	'Characters/Plant0.png',
	'Characters/Plant1.png',
	'Characters/Player0.png',
	'Characters/Player1.png',
	'Characters/Quadraped0.png',
	'Characters/Quadraped1.png',
	'Characters/Reptile0.png',
	'Characters/Reptile1.png',
	'Characters/Rodent0.png',
	'Characters/Rodent1.png',
	'Characters/Slime0.png',
	'Characters/Slime1.png',
	'Characters/Undead0.png',
	'Characters/Undead1.png',
	'Commissions/Engineer.png',
	'Commissions/Mage.png',
	'Commissions/Paladin.png',
	'Commissions/Rogue.png',
	'Commissions/Warrior.png',
	'Examples/Logo.png',
	'GUI/GUI0.png',
	'GUI/GUI1.png',
	'Items/Ammo.png',
	'Items/Amulet.png',
	'Items/Armor.png',
	'Items/Book.png',
	'Items/Boot.png',
	'Items/Chest0.png',
	'Items/Chest1.png',
	'Items/Flesh.png',
	'Items/Food.png',
	'Items/Glove.png',
	'Items/Hat.png',
	'Items/Key.png',
	'Items/Light.png',
	'Items/LongWep.png',
	'Items/MedWep.png',
	'Items/Money.png',
	'Items/Music.png',
	'Items/Potion.png',
	'Items/Ring.png',
	'Items/Rock.png',
	'Items/Scroll.png',
	'Items/Shield.png',
	'Items/ShortWep.png',
	'Items/Tool.png',
	'Items/Wand.png',
	'Objects/Decor0.png',
	'Objects/Decor1.png',
	'Objects/Door0.png',
	'Objects/Door1.png',
	'Objects/Effect0.png',
	'Objects/Effect1.png',
	'Objects/Fence.png',
	'Objects/Floor.png',
	'Objects/Ground0.png',
	'Objects/Ground1.png',
	'Objects/Hill0.png',
	'Objects/Hill1.png',
	'Objects/Map0.png',
	'Objects/Map1.png',
	'Objects/Ore0.png',
	'Objects/Ore1.png',
	'Objects/Pit0.png',
	'Objects/Pit1.png',
	'Objects/Tile.png',
	'Objects/Trap.png',
	'Objects/Tree0.png',
	'Objects/Tree1.png',
	'Objects/Wall.png'
];

module.exports = function(cb) {
	loadTilesets(function(err, tilesets) {
		if (err) return cb(err);
		cb(null, {
			tilesets: tilesets
		});
	});
}

function loadTilesets(cb) {
	var toLoad = TILESETS.length;
	var error = null;
	var images = {};
	TILESETS.forEach(function(ts) {
		var img = new Image();
		img.onload = function() {
			images[ts] = img;
			_ok();
		};
		img.onerror = _err;
		img.src = 'assets/DawnLike_3/' + ts;
	});
	function _ok() {
		if (!error && --toLoad === 0) {
			cb(null, _createTilesets(images));
		}
	}
	function _err(err) {
		if (!error) {
			error = err;
			cb(error);
		}
	}
	function _createTilesets(images) {
		var out = {};
		for (var k in images) {
			var id = k.replace(/[01]?\.png$/, '')
						.toLowerCase()
						.replace('/', '_');
			if (k.match(/0\.png$/)) {
				out[id] = tileset(id, [
					images[k],
					images[k.replace('0.png', '1.png')]
				]);
			} else if (!k.match(/1\.png$/)) {
				out[id] = tileset(id, [images[k]]);
			}
		}
		return out;
	}
}
},{"./tileset":4}],4:[function(require,module,exports){
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
},{"./config":1}]},{},[2]);
