require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = "function" == typeof require && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw f.code = "MODULE_NOT_FOUND", f;
      }
      var l = n[o] = {
        exports: {}
      };
      t[o][0].call(l.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, l, l.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof require && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  Colors: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e9e05xFVUZMZJxSkDzATeiN", "Colors");
    "use strict";
    module.exports = {
      startBg: new cc.color(89, 69, 61, 255),
      overBg: new cc.color(89, 69, 61, 255),
      gameBg: new cc.color(89, 69, 61, 255),
      topBg: new cc.color(166, 137, 124, 255),
      tileBg: new cc.color(166, 137, 124, 255),
      powerBarBg: new cc.color(166, 137, 124, 255),
      power: new cc.color(100, 107, 48, 255),
      num1: new cc.color(217, 202, 184, 255),
      num2: new cc.color(191, 177, 159, 255),
      num3: new cc.color(166, 133, 104, 255),
      num4: new cc.color(115, 86, 69, 255),
      num5: new cc.color(64, 40, 32, 255),
      num6: new cc.color(115, 100, 56, 255),
      num7: new cc.color(140, 89, 70, 255),
      num8: new cc.color(115, 56, 50, 255),
      num9: new cc.color(115, 32, 32, 255),
      num10: new cc.color(115, 103, 88, 255),
      num11: new cc.color(140, 121, 97, 255),
      num12: new cc.color(191, 146, 107, 255),
      num13: new cc.color(191, 140, 11, 255),
      num14: new cc.color(213, 185, 112, 255),
      num15: new cc.color(174, 122, 98, 255),
      num16: new cc.color(181, 91, 82, 255),
      num17: new cc.color(107, 86, 85, 255),
      num18: new cc.color(73, 58, 61, 255),
      num19: new cc.color(176, 125, 98, 255),
      num20: new cc.color(232, 171, 127, 255),
      nums: new cc.color(222, 153, 36, 255)
    };
    cc._RF.pop();
  }, {} ],
  Game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "39193I/GjtNX5AeIUv04rSw", "Game");
    "use strict";
    var Global = require("Global");
    var Colors = require("Colors");
    cc.Class({
      extends: cc.Component,
      properties: {
        tilePre: {
          default: null,
          type: cc.Prefab
        },
        powerPre: {
          default: null,
          type: cc.Prefab
        },
        bg: {
          default: null,
          type: cc.Node
        },
        topBg: {
          default: null,
          type: cc.Node
        },
        tiles: {
          default: null,
          type: Array
        },
        powers: {
          default: null,
          type: Array
        },
        scoreLabel: {
          default: null,
          type: cc.Label
        },
        scoreNum: {
          default: null,
          type: cc.Label
        },
        tileBg: {
          default: null,
          type: cc.Node
        },
        powerBarBg: {
          default: null,
          type: cc.Node
        },
        star1: cc.AudioClip,
        star2: cc.AudioClip,
        star3: cc.AudioClip,
        star4: cc.AudioClip,
        star5: cc.AudioClip,
        star6: cc.AudioClip,
        star7: cc.AudioClip,
        bgMusic: cc.AudioClip,
        maxNum: 0,
        isCal: false
      },
      onDestroy: function onDestroy() {
        cc.audioEngine.stopMusic(this.bgMusic);
      },
      onLoad: function onLoad() {
        cc.audioEngine.playMusic(this.bgMusic, true);
        this.tiles = [ [ null, null, null, null, null ], [ null, null, null, null, null ], [ null, null, null, null, null ], [ null, null, null, null, null ], [ null, null, null, null, null ] ];
        this.powers = [ null, null, null, null, null ];
        this.bg.width = cc.winSize.width;
        this.bg.height = cc.winSize.height;
        this.bg.setPosition(-cc.winSize.width / 2, -cc.winSize.height / 2);
        this.bg.color = Colors.gameBg;
        this.topBg.width = cc.winSize.width - 30;
        this.topBg.height = 100;
        this.topBg.setPosition(-cc.winSize.width / 2 + 15, (cc.winSize.width - 30) / 2);
        this.powerBarBg.width = cc.winSize.width - 30;
        this.powerBarBg.height = this.powerBarBg.width / 5 / 2;
        this.powerBarBg.setPosition(15 - cc.winSize.width / 2, this.topBg.getPositionY() - 200);
        this.powerBarBg.color = Colors.powerBarBg;
        this.tileBg.width = cc.winSize.width - 30;
        this.tileBg.height = this.tileBg.width;
        this.tileBg.setPosition(15 - cc.winSize.width / 2, this.powerBarBg.getPositionY() - 10 - this.tileBg.height);
        this.tileBg.color = Colors.tileBg;
        for (var i = 0; i < 5; i++) {
          var power = cc.instantiate(this.powerPre);
          power.width = (this.powerBarBg.width - 30) / 5;
          power.height = this.powerBarBg.height - 10;
          this.powerBarBg.addChild(power);
          power.setPosition(5 + (5 + power.width) * i + power.width / 2, 5 + power.height / 2);
          power.color = Colors.power;
          this.powers[i] = power;
        }
        var gailv = new Array();
        this.maxNum = 8;
        for (var num = 0; num < this.maxNum - 3; num++) gailv[num] = this.maxNum - 3 - num;
        var sum = 0;
        for (var num = 0; num < gailv.length; num++) sum += gailv[num];
        for (var row = 0; row < 5; row++) for (var col = 0; col < 5; col++) {
          var tile = cc.instantiate(this.tilePre);
          tile.getComponent("Tile").game = this;
          tile.width = (this.tileBg.width - 30) / 5;
          tile.height = (this.tileBg.height - 30) / 5;
          var count = 0;
          var randomNum = 0;
          while (true) {
            count++;
            var arr = new Array();
            var scanArr = new Array();
            randomNum = Math.random() * sum;
            var newNum = 0;
            var min = 0;
            for (var num = 0; num < gailv.length; num++) {
              if (randomNum >= min && randomNum <= min + gailv[num]) {
                newNum = num + 1;
                break;
              }
              min += gailv[num];
            }
            tile.getComponent("Tile").setNum(newNum, false, false);
            tile.setPosition(5 + (5 + tile.width) * col + tile.width / 2, 5 + (5 + tile.height) * row + tile.height / 2);
            this.tiles[row][col] = tile;
            this.scanAround(row, col, -1, -1, newNum, arr, scanArr);
            if (arr.length < 3) break;
          }
          tile.getComponent("Tile").setArrPosition(row, col);
          this.tileBg.addChild(tile);
        }
      },
      scanAround: function scanAround(row, col, lastRow, lastCol, num, arr, scanArr) {
        if (null == this.tiles[row][col]) return;
        var isClear = false;
        void 0 == scanArr && (scanArr = new Array());
        if (-1 != scanArr.indexOf(row + "#" + col)) return;
        scanArr.push(row + "#" + col);
        if (row < 4 && (lastRow != row + 1 || lastCol != col) && null != this.tiles[row + 1][col]) {
          var nextNum = parseInt(this.tiles[row + 1][col].getComponent("Tile").numLabel.string);
          if (nextNum == num) {
            -1 == arr.indexOf(row + "#" + col) && arr.push(row + "#" + col);
            this.scanAround(row + 1, col, row, col, num, arr, scanArr);
            isClear = true;
          }
        }
        if (row > 0 && (lastRow != row - 1 || lastCol != col) && null != this.tiles[row - 1][col]) {
          var nextNum = parseInt(this.tiles[row - 1][col].getComponent("Tile").numLabel.string);
          if (nextNum == num) {
            -1 == arr.indexOf(row + "#" + col) && arr.push(row + "#" + col);
            this.scanAround(row - 1, col, row, col, num, arr, scanArr);
            isClear = true;
          }
        }
        if (col > 0 && (lastRow != row || lastCol != col - 1) && null != this.tiles[row][col - 1]) {
          var nextNum = parseInt(this.tiles[row][col - 1].getComponent("Tile").numLabel.string);
          if (nextNum == num) {
            -1 == arr.indexOf(row + "#" + col) && arr.push(row + "#" + col);
            this.scanAround(row, col - 1, row, col, num, arr, scanArr);
            isClear = true;
          }
        }
        if (col < 4 && (lastRow != row || lastCol != col + 1) && null != this.tiles[row][col + 1]) {
          var nextNum = parseInt(this.tiles[row][col + 1].getComponent("Tile").numLabel.string);
          if (nextNum == num) {
            -1 == arr.indexOf(row + "#" + col) && arr.push(row + "#" + col);
            this.scanAround(row, col + 1, row, col, num, arr, scanArr);
            isClear = true;
          }
        }
        if (!isClear && -1 != lastRow && -1 != lastCol) {
          var curNum = parseInt(this.tiles[row][col].getComponent("Tile").numLabel.string);
          curNum == num && -1 == arr.indexOf(row + "#" + col) && arr.push(row + "#" + col);
        }
      },
      operateLogic: function operateLogic(touchRow, touchCol, curNum, isFirstCall) {
        var arr = new Array();
        var scanArr = new Array();
        this.scanAround(touchRow, touchCol, -1, -1, curNum, arr, scanArr);
        if (arr.length >= 3) {
          var addScore = 0;
          for (var index in arr) {
            var row = arr[index].split("#")[0];
            var col = arr[index].split("#")[1];
            addScore += parseInt(10 * this.tiles[row][col].getComponent("Tile").numLabel.string);
            if (row != touchRow || col != touchCol) {
              this.tiles[row][col].getComponent("Tile").destoryTile();
              this.tiles[row][col] = null;
            } else {
              this.tiles[row][col].getComponent("Tile").setNum(curNum + 1, false, true);
              this.maxNum = curNum + 1 > this.maxNum ? curNum + 1 : this.maxNum;
            }
          }
          this.scoreNum.string = parseInt(this.scoreNum.string) + addScore;
          this.scheduleOnce(function() {
            this.moveAllTileDown();
          }, .1);
          if (!isFirstCall) for (var i = 0; i < 5; i++) if (null == this.powers[i]) {
            var power = cc.instantiate(this.powerPre);
            power.width = (this.powerBarBg.width - 30) / 5;
            power.height = this.powerBarBg.height - 10;
            this.powerBarBg.addChild(power);
            power.setPosition(5 + (5 + power.width) * i + power.width / 2, 5 + power.height / 2);
            power.color = Colors.power;
            power.setScale(0);
            power.runAction(cc.scaleTo(.1, 1));
            this.powers[i] = power;
            break;
          }
          Global.combo++;
          switch (Global.combo) {
           case 1:
            cc.audioEngine.playEffect(this.star1);
            break;

           case 2:
            cc.audioEngine.playEffect(this.star2);
            break;

           case 3:
            cc.audioEngine.playEffect(this.star3);
            break;

           case 4:
            cc.audioEngine.playEffect(this.star4);
            break;

           case 5:
            cc.audioEngine.playEffect(this.star5);
            break;

           case 6:
            cc.audioEngine.playEffect(this.star6);
            break;

           case 7:
           default:
            cc.audioEngine.playEffect(this.star7);
          }
          return true;
        }
        this.isCal = false;
        return false;
      },
      moveAllTileDown: function moveAllTileDown() {
        for (var col = 0; col < 5; col++) for (var row = 0; row < 5; row++) if (null != this.tiles[row][col]) for (var row1 = row; row1 > 0; row1--) if (null == this.tiles[row1 - 1][col]) {
          this.tiles[row1 - 1][col] = this.tiles[row1][col];
          this.tiles[row1][col] = null;
          this.tiles[row1 - 1][col].getComponent("Tile").moveTo(row1 - 1, col);
        }
        this.scheduleOnce(function() {
          var gailv = new Array();
          for (var num = 0; num < this.maxNum - 3; num++) gailv[num] = this.maxNum - 3 - num;
          var sum = 0;
          for (var num = 0; num < gailv.length; num++) sum += gailv[num];
          for (var col = 0; col < 5; col++) for (var row = 0; row < 5; row++) if (null == this.tiles[row][col]) {
            var tile = cc.instantiate(this.tilePre);
            tile.getComponent("Tile").game = this;
            tile.width = (this.tileBg.width - 30) / 5;
            tile.height = (this.tileBg.height - 30) / 5;
            var randomNum = Math.random() * sum;
            var newNum = 0;
            var min = 0;
            for (var num = 0; num < gailv.length; num++) {
              if (randomNum >= min && randomNum <= min + gailv[num]) {
                newNum = num + 1;
                break;
              }
              min += gailv[num];
            }
            tile.getComponent("Tile").setNum(newNum, false, false);
            tile.getComponent("Tile").newTile(row, col);
            this.tiles[row][col] = tile;
            this.tileBg.addChild(tile);
          }
          this.scheduleOnce(function() {
            var isSearch = false;
            for (var col = 0; col < 5; col++) for (var row = 0; row < 5; row++) isSearch || (isSearch = null != this.tiles[row][col] && this.operateLogic(row, col, parseInt(this.tiles[row][col].getComponent("Tile").numLabel.string), false));
          }, .5);
        }, .3);
      }
    });
    cc._RF.pop();
  }, {
    Colors: "Colors",
    Global: "Global"
  } ],
  Global: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "33082e5T1NOqoNc6g/OQ8Mo", "Global");
    "use strict";
    module.exports = {
      score: 0,
      combo: 0
    };
    cc._RF.pop();
  }, {} ],
  Over: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "abb92FkKAJAcZ76wc009Hlx", "Over");
    "use strict";
    var Global = require("Global");
    var Colors = require("Colors");
    cc.Class({
      extends: cc.Component,
      properties: {
        bg: {
          default: null,
          type: cc.Node
        },
        gameText: {
          default: null,
          type: cc.Node
        },
        backBtn: {
          default: null,
          type: cc.Node
        },
        textLabel: {
          default: null,
          type: cc.Label
        },
        scoreLabel: {
          default: null,
          type: cc.Label
        },
        scoreText: {
          default: null,
          type: cc.Node
        },
        overEffect: cc.AudioClip,
        addCoin: cc.AudioClip,
        btnEffect: cc.AudioClip,
        score: 0,
        changeScore: 0
      },
      onLoad: function onLoad() {
        this.bg.width = cc.winSize.width;
        this.bg.height = cc.winSize.height;
        this.bg.setPosition(this.bg.width / 2, this.bg.height / 2);
        this.bg.color = Colors.overBg;
        this.gameText.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        var action = cc.repeatForever(cc.sequence(cc.scaleTo(1, 1.5), cc.scaleTo(1, 1)));
        this.gameText.runAction(action);
        cc.audioEngine.playEffect(this.overEffect);
        this.scoreText.setPosition(this.gameText.getPositionX(), this.gameText.getPositionY() + 200);
        this.score = Global.score;
        this.schedule(this.updateScore, .1, cc.REPEAT_FOREVER, 2);
        var self = this;
        this.bg.on(cc.Node.EventType.TOUCH_START, function(event) {
          cc.log("score text touch");
          cc.audioEngine.playEffect(self.addCoin);
          self.changeScore = self.score;
          self.scoreLabel.string = "最终分数：" + self.changeScore;
        }, this.bg);
        this.backBtn.setPosition(this.gameText.getPositionX(), this.gameText.getPositionY() - 200);
      },
      updateScore: function updateScore() {
        this.score <= this.changeScore && this.unschedule(this.updateScore);
        this.changeScore += 20;
        this.changeScore = this.changeScore > this.score ? this.score : this.changeScore;
        cc.audioEngine.playEffect(this.addCoin);
        this.scoreLabel.string = "最终分数：" + this.changeScore;
      },
      back: function back() {
        Global.score = 0;
        cc.audioEngine.playEffect(this.btnEffect);
        cc.director.loadScene("startScene");
      }
    });
    cc._RF.pop();
  }, {
    Colors: "Colors",
    Global: "Global"
  } ],
  Start: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "34814nzs3pO+a9mpV/mWE6Q", "Start");
    "use strict";
    var Colors = require("Colors");
    cc.Class({
      extends: cc.Component,
      properties: {
        gameName: {
          default: null,
          type: cc.Node
        },
        bg: {
          default: null,
          type: cc.Node
        },
        startBtn: {
          default: null,
          type: cc.Node
        },
        btnEffect: cc.AudioClip
      },
      onLoad: function onLoad() {
        this.bg.width = cc.winSize.width;
        this.bg.height = cc.winSize.height;
        this.bg.setPosition(this.bg.width / 2, this.bg.height / 2);
        this.bg.color = Colors.startBg;
        var action = cc.repeatForever(cc.sequence(cc.scaleTo(1, 1.5), cc.scaleTo(1, 1)));
        this.gameName.runAction(action);
        this.gameName.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        this.startBtn.setPosition(this.gameName.getPositionX(), this.gameName.getPositionY() - 210);
      },
      startGame: function startGame() {
        cc.audioEngine.playEffect(this.btnEffect);
        cc.director.loadScene("gameScene");
      }
    });
    cc._RF.pop();
  }, {
    Colors: "Colors"
  } ],
  Tile: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "33c61KUhGtMdKlxBheGl7E0", "Tile");
    "use strict";
    var Global = require("Global");
    var Colors = require("Colors");
    cc.Class({
      extends: cc.Component,
      properties: {
        numLabel: {
          default: null,
          type: cc.Label
        },
        clickEffect: cc.AudioClip
      },
      onLoad: function onLoad() {
        var self = this;
        this.node.on(cc.Node.EventType.TOUCH_START, function(event) {
          if (!self.game.isCal) {
            cc.audioEngine.playEffect(self.clickEffect);
            self.game.isCal = true;
            Global.combo = 0;
            cc.audioEngine.playEffect(this.addCoin);
            self.setNum(parseInt(self.numLabel.string) + 1, true, false);
          }
        }, this.node);
      },
      newTile: function newTile(row, col) {
        this.node.setPosition(5 + (5 + this.node.width) * col + this.node.width / 2, 5 + (5 + this.node.height) * row + this.node.height / 2);
        this.node.setScale(0);
        this.node.runAction(cc.scaleTo(.1, 1));
        this.setArrPosition(row, col);
      },
      moveTo: function moveTo(row, col) {
        this.row = row;
        this.col = col;
        this.node.stopActionByTag(1);
        var action = cc.moveTo(.2, cc.p(5 + (5 + this.node.width) * col + this.node.width / 2, 5 + (5 + this.node.height) * row + this.node.height / 2));
        this.node.runAction(action);
        action.setTag(1);
      },
      destoryTile: function destoryTile() {
        var action = cc.sequence(cc.scaleTo(.1, 0), cc.callFunc(function(node) {
          node.destroy();
        }, this.node, this.node));
        this.node.runAction(action);
      },
      setArrPosition: function setArrPosition(row, col) {
        this.row = row;
        this.col = col;
      },
      setNum: function setNum(num, exeLogic, playEffect) {
        this.game.maxNum = num > this.game.maxNum ? num : this.game.maxNum;
        this.numLabel.string = num;
        switch (num) {
         case 1:
          this.node.color = Colors.num1;
          break;

         case 2:
          this.node.color = Colors.num2;
          break;

         case 3:
          this.node.color = Colors.num3;
          break;

         case 4:
          this.node.color = Colors.num4;
          break;

         case 5:
          this.node.color = Colors.num5;
          break;

         case 6:
          this.node.color = Colors.num6;
          break;

         case 7:
          this.node.color = Colors.num7;
          break;

         case 8:
          this.node.color = Colors.num8;
          break;

         case 9:
          this.node.color = Colors.num9;
          break;

         case 10:
          this.node.color = Colors.num10;
          break;

         case 11:
          this.node.color = Colors.num11;
          break;

         case 12:
          this.node.color = Colors.num12;
          break;

         case 13:
          this.node.color = Colors.num13;
          break;

         case 14:
          this.node.color = Colors.num14;
          break;

         case 15:
          this.node.color = Colors.num15;
          break;

         case 16:
          this.node.color = Colors.num16;
          break;

         case 17:
          this.node.color = Colors.num17;
          break;

         case 18:
          this.node.color = Colors.num18;
          break;

         case 19:
          this.node.color = Colors.num19;
          break;

         case 20:
          this.node.color = Colors.num20;
          break;

         default:
          this.node.color = Colors.nums;
        }
        playEffect && this.node.runAction(cc.sequence(cc.scaleTo(.15, 1.5), cc.scaleTo(.15, 1)));
        if (exeLogic) {
          var isMove = this.game.operateLogic(this.row, this.col, parseInt(this.numLabel.string), true);
          var powers = this.game.powers;
          if (!isMove) {
            for (var i = powers.length - 1; i >= 0; i--) if (null != powers[i]) {
              var costBarAction = cc.sequence(cc.scaleTo(.1, 0), cc.callFunc(function(power) {
                power.destroy();
              }, null, powers[i]));
              powers[i].runAction(costBarAction);
              powers[i] = null;
              break;
            }
            if (null == powers[0]) {
              Global.score = this.game.scoreNum.string;
              cc.director.loadScene("overScene");
            }
          }
        }
      }
    });
    cc._RF.pop();
  }, {
    Colors: "Colors",
    Global: "Global"
  } ]
}, {}, [ "Colors", "Game", "Global", "Over", "Start", "Tile" ]);