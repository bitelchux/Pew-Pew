/**
 * Copyright (c) 2014, Matthew Erickson (Matt@MattErickson.ME)
 * All rights reserved.
 *
 * Please see copyright.txt for full license details
 **/
var Redraw = Redraw || {};
Redraw.GoodGuy = Redraw.GoodGuy || {};
Redraw.BadGuys = Redraw.BadGuys || {};
Redraw.Bullets = Redraw.Bullets || {};

Redraw.GoodGuy.RedrawPlayerPregame = function() {
	if (Constants.REDRAW_LOGGING)
		console.log("Move Player for pregame");
	Game.player.move();
		
	Global.PEWPEW_CONTEXT.drawImage(Game.player.img, Game.player.x, Game.player.y - Game.player.height, Game.player.width, Game.player.height);
	
	Global.PEWPEW_CONTEXT.fillStyle = "White";
	Global.PEWPEW_CONTEXT.font = 10 * Global.scaling() + "px sans-serif";	
	Global.PEWPEW_CONTEXT.fillText("PlayerScore: [" + Game.playerScore + "] Level: [" + Game.level + "] Click to start game/level", 10, Global.PEWPEW_CANVAS.height - 10, Global.PEWPEW_CANVAS.width / 3);
	for (var i = 1; i < Game.lives; i++) {
		Global.PEWPEW_CONTEXT.drawImage(Game.player.img, Global.PEWPEW_CANVAS.width - (i * Global.lives_width()), Global.PEWPEW_CANVAS.height - (Global.lives_height() + 5), Global.lives_height(), Global.lives_width());
	}
	
};

Redraw.GoodGuy.RedrawPlayer = function() {
	if (Constants.REDRAW_LOGGING)
		console.log("Move Player for game");
	Game.player.move();

	if (Global.luckLife > 0) {
		Global.PEWPEW_CONTEXT.fillStyle = "GRAY";
		Global.PEWPEW_CONTEXT.fillRect(0, 350, Global.PEWPEW_CANVAS.width, Global.PEWPEW_CANVAS.height);
		//X, Y, width, height
		Global.PEWPEW_CONTEXT.fillStyle = "Black";
		Global.PEWPEW_CONTEXT.fillText("GOD MODE!" + Global.luckLife, 20, Global.PEWPEW_CANVAS.height - Game.player.height);
	}
	if (Constants.isCapturing) {
		tmpYPos -= 2;
		Global.PEWPEW_CONTEXT.drawImage(Game.player.img, Global.spider.x, tmpYPos - Game.player.offset(), Game.player.width, Game.player.height);
		if (tmpYPos <= Global.spider.y - (Global.spider.height / 2)) {
			Constants.isCapturing = false;
			isCaptured = true;
		}

	} else if (Global.isPewPewMerging) {
		Global.PEWPEW_CONTEXT.drawImage(Game.player.img, Game.player.centerX(), Game.player.centerY(), Game.player.width, Game.player.height);
		// if(!clonePlayer){
		//     clonePlayer = new GoodGuy(Global.spider.x, Global.spider.y-(Global.spider.height/2), good, 0, Constants.GUYWIDTH, Constants.GUYHEIGHT, 0, 5);
		// }
		Global.PEWPEW_CONTEXT.drawImage(Game.player.img, clonePlayer.centerX(), clonePlayer.centerY(), cloneplayer.width, cloneplayer.height);
	} else if (Global.isPewPewMerged) {
		Global.PEWPEW_CONTEXT.drawImage(Game.player.img, Game.player.x - Game.player.offset() * 2, Game.player.y - Game.player.offset(), Game.player.width, Game.player.height);
		Global.PEWPEW_CONTEXT.drawImage(Game.player.img, Game.player.centerX(), Game.player.centerY(), Game.player.width, Game.player.height);
	} else {
		Global.PEWPEW_CONTEXT.drawImage(Game.player.img, Game.player.centerX(), Game.player.centerY() - Game.player.height, Game.player.width, Game.player.height);
	}

	Global.PEWPEW_CONTEXT.fillStyle = "White";
	Global.PEWPEW_CONTEXT.font = 10 * Global.scaling() + "px sans-serif";
	
	Global.PEWPEW_CONTEXT.fillText("PlayerScore: [" + Game.playerScore + "] Level: [" + Game.level + "]", 10, Global.PEWPEW_CANVAS.height - 10, Global.PEWPEW_CANVAS.width / 3);
	
	for (var i = 1; i < Game.lives; i++) {
		Global.PEWPEW_CONTEXT.drawImage(Game.player.img, Global.PEWPEW_CANVAS.width - (i * Global.lives_width()), Global.PEWPEW_CANVAS.height - (Global.lives_height() + 5), Global.lives_height(), Global.lives_width());
	}
	if (Constants.DEBUG) {
		//Write other things about the Game.player
	}

	Util.checkBadGuyIntersection();
};

Redraw.BadGuys.redrawBadGuys = function() {
	if (Constants.REDRAW_LOGGING)
		console.log("redraw badGuys");
	for (var i = Global.badGuys.length - 1; i >= 0; i--) {
		var badGuy = Global.badGuys[i];
		if (Constants.DEBUG) {
			Global.PEWPEW_CONTEXT.fillStyle = "White";
			Global.PEWPEW_CONTEXT.font = 5 * Global.scaling() + "px sans-serif";
			Global.PEWPEW_CONTEXT.fillText("HP: [" + badGuy.hp + "]", badGuy.x, badGuy.y - 2);
		}
		Global.PEWPEW_CONTEXT.drawImage(badGuy.img, badGuy.x, badGuy.y, badGuy.width, badGuy.height);
	};
};

Redraw.Bullets.redrawBullets = function() {
	if (Constants.REDRAW_LOGGING)
		console.log("redraw bullets");
	Redraw.redrawPlayerBullets();
	Redraw.redrawBadGuyBullets();
	Redraw.redrawBarrierBullets();
};

Redraw.redrawBadGuyBullets = function() {
	//Bad guy bullets
	for (var a = Global.badBullets.length - 1; a >= 0; a--) {
		var badBullet = Global.badBullets[a];
		if (badBullet != undefined) {
			badBullet.y += (2 * Global.scaling()) + (Game.level * 0.1);
			//Move bullet up
			if (badBullet.bulletType == "lucky") {
				Global.PEWPEW_CONTEXT.fillStyle = "Green";
			} else {
				Global.PEWPEW_CONTEXT.fillStyle = "White";
			}
			Global.PEWPEW_CONTEXT.fillRect(badBullet.x, badBullet.y, badBullet.width, badBullet.height);
			//X, Y, width, height
			if (badBullet.y > $(Global.PEWPEW_CANVAS).height) {
				Global.badBullets.splice(index, 1);
			}
		}
	};

	//TODO: there has to be a better way than to check if this guy is a boss like this... this is a dirty hack [ME]
	for (var b = Global.badGuys.length - 1; b >= 0; b--) {
		var badGuy = Global.badGuys[b];
		if ( badGuy instanceof Boss) {
			if (badGuy.isFiredLaser) {

				var startLaser = badGuy.top();
				var endLaser = (badGuy.top() + badGuy.increaseLaserHeight());
				//                console.log("laser fire-->"+endLaser);

				if (endLaser >= 2000) {
					badGuy.stopLaser();
				} else {
					if (endLaser >= 400) {
						endLaser = 400;
					}
					for ( start = startLaser; start <= endLaser; start++) {
						Global.PEWPEW_CONTEXT.drawImage(laser, badGuy.x - badGuy.offset() + 15, start - badGuy.offset() + 60, 40, 24);
					}
				}

			}

			for (var c = badGuy.suriArr.length - 1; c >= 0; c--) {
				var suri = badGuy.suriArr[i];
				try {
					suri.move();

					if (suri.right() < 0 || suri.left() > Global.PEWPEW_CANVAS.width || suri.top() > Global.PEWPEW_CANVAS.height) {
						badGuy.suriArr.splice(index, 1);
						console.log("suri removed -> " + index);
					} else {
						//                        console.log("suri draw->"+index+"["+suri.left()+","+suri.top()+"]");
						Global.PEWPEW_CONTEXT.drawImage(suri.img, suri.left(), suri.top(), 15, 15);
					}
				} catch(e) {
					console.log("suri error -> " + suri);
				}
			};
		}
	}
};

Redraw.redrawBarrierBullets = function() {
	for (var i = Global.barrierBullets.length - 1; i >= 0; i--) {
		var barrierBullet = Global.barrierBullets[i];
		if (barrierBullet != undefined) {
			Global.PEWPEW_CONTEXT.fillStyle = "Blue";
			Global.PEWPEW_CONTEXT.fillRect(barrierBullet.x, barrierBullet.y, barrierBullet.width, barrierBullet.height);
			//X, Y, width, height
		}
	}
};

Redraw.redrawPlayerBullets = function() {
	for (var i = Global.bullets.length - 1; i >= 0; i--) {
		var bullet = Global.bullets[i];
		if (bullet != undefined) {
			bullet.move();
			
			//Move bullet up
			bullet.x += bullet.xdiff;

			//This is custom bullet control... and i don't like it
			bullet.x += bulletsControl[0];
			bullet.y += bulletsControl[1];

			Global.PEWPEW_CONTEXT.fillStyle = "White";
			Global.PEWPEW_CONTEXT.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
			//X, Y, width, height
			if (bullet.y < 0) {
				Global.bullets.splice(i, 1);
			}
		}
	}
	bulletsControl = [0, 0];
};