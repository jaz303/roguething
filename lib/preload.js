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