function Global() {
	//Multiple inits
	this.bullets = new Array();////bullets fired by player
	this.barrierBullets = new Array();
	this.badGuys = new Array(); //the bad guys
	this.bossFire = new Array(); //Important interval handler!
	this.intervalLoop = 0;
	this.fakeGame = 0;
	this.bulletsControl = {};	
	this.Global.luckyLife = 0;
	// for capture
	this.isCaptured = false;
	this.isCapturing = false;
	this.isGalagaMerged = false;
	this.isGalagaMerging = false;
	this.numOfGalaga = 1;
	this.isSpiderMove = false;
	this.hasSpider = false;
	this.Global.spider;
	this.spiderCount = 0;
	this.isViming = false;
	this.oriPosX;
	this.oriPosY;
	this.vim;
	
	this.canvasHeight;
	this.canvasWidth;

	this.sound0;
	this.sound1;
	this.sound2;
	this.sound3;
	this.sound4;
	this.sound5;
	this.sound6;
	this.sound7;
	this.sound8;
	this.sound9;
	this.sound10;
	this.sound11;
	this.sound12;
	this.sound13;
	this.sound14;
	
	this.GALAGA_CANVAS;
	this.GALAGA_CONTEXT;
	this.mouse;
	this.bad1;
	this.bad2;
	this.bad3;
	this.good;
	this.boss;
	this.explosion;
	this.laser;
};