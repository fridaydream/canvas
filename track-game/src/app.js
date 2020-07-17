var MAP_WIDTH = 375 * 2
var MAP_HEIGHT = MAP_WIDTH * 7
var RIDER_WIDTH = 180
var RIDER_HEIGHT = 200
var HelloWorldLayer = cc.Layer.extend({
    sprite: null,
    mapSprite: null,
    riderSprite: null,
    timer: 0, // 第几次点击
    ctor:function () {
        this._super();
        // 页面大小
        var size = cc.winSize;
        // 创建地图精灵
        this.mapSprite = new cc.Sprite(res.bg_map);
        // 添加精灵
        this.addChild(this.mapSprite, 1)
        // 地图精灵位置设置屏幕中间
        this.mapSprite.setPosition(size.width / 2, size.height / 2)
        // 创建骑手精灵
        this.riderSprite = new cc.Sprite(res.rider_png);
        // 骑手添加到地图中
        this.mapSprite.addChild(this.riderSprite, 2)
        // 骑手精灵位置
        this.riderSprite.setPosition(RIDER_WIDTH / 2, 125 + RIDER_HEIGHT / 2)
        // 骑手精灵位置
        this.riderSprite.setAnchorPoint(0.5, 0.5);
        // 设置动画让精灵移动到底部
        var action = cc.moveBy(1, cc.p(0, MAP_HEIGHT / 2 - size.height / 2))
        // 开始动画
        this.mapSprite.runAction(action);
        // 开始粒子下雪
        this.showEffect()
        // 给骑手添加点击事件
        cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: true, // 不进行冒泡
          onTouchBegan: this.onTouchBegan.bind(this)
        }, this.riderSprite)
        return true;
    },  
    onTouchBegan: function(touch, event) {
      // 第一次加载播放音乐
      if (this.timer === 0) {
        cc.audioEngine.playMusic(res.bg_mp3, true);
      }
      // 获取点击元素
      var target = event.getCurrentTarget()
      // 获取点击位置
      var location = touch.getLocation()
      // 点击元素的大小
      var s = target.getContentSize();
      var rect = cc.rect(0, 0, s.width, s.height);
      // 获取当前触摸点相对于按钮所在的坐标
      var locationInNode = target.convertToNodeSpace(location);
      // this.timer < 2 第三段动画没加
      if (cc.rectContainsPoint(rect, locationInNode) && this.timer < 2) {       // 判断触摸点是否在按钮范围内
        this.riderMove()
        return true;
      }
      return false;
    },
    showEffect: function() {
      // 创建粒子系统
      this.particleSystem = new cc.ParticleSystem(res.snow_plist)
      // 完成之后消失(好性能)
      this.particleSystem.setAutoRemoveOnFinish(true)
      // 添加粒子
      this.addChild(this.particleSystem, 3)
    },
    // 骑手移动
    riderMove: function() {
      // 自定义运动完成之后的回调
      var actionFinish = cc.callFunc(function () {
        // 左右翻转(镜像翻转)
        this.riderSprite.setFlippedX(true);
      }, this);
      // 第一次点击
      if (this.timer === 0) {
        // 创建动画
        var action1 = cc.moveTo(2, cc.p(RIDER_WIDTH / 2 + 300, 125 + RIDER_HEIGHT / 2));
        // 画类半圆的贝塞尔曲线(4个控制点)
        var action2 = cc.bezierTo(3, [cc.p(RIDER_WIDTH / 2 + 600, 125 + RIDER_HEIGHT / 2), cc.p(RIDER_WIDTH / 2 + 600, 125 + RIDER_HEIGHT / 2 + 440), cc.p(RIDER_WIDTH / 2 + 300, 125 + RIDER_HEIGHT / 2 + 440)])
        var action3 = cc.bezierTo(3, [cc.p(RIDER_WIDTH / 2 + 100, 125 + RIDER_HEIGHT / 2 + 440), cc.p(RIDER_WIDTH / 2 + 100, 125 + RIDER_HEIGHT / 2 + 440 + 420), cc.p(RIDER_WIDTH / 2 + 300, 125 + RIDER_HEIGHT / 2 + 440 + 420)])
        var action4 = cc.moveTo(1, cc.p(RIDER_WIDTH / 2 + 430, 125 + RIDER_HEIGHT / 2 + 440 + 420))
        var action5 = cc.moveTo(1, cc.p(RIDER_WIDTH / 2 + 430, 125 + RIDER_HEIGHT / 2 + 440 + 420 + 368 / 2))
        var action6 = cc.moveBy(10, cc.p(0, -600))
        var sequence = cc.sequence(action1, action2, actionFinish, action3, actionFinish, action4, action5);
        this.riderSprite.runAction(sequence);
        this.mapSprite.runAction(action6);
      } else if (this.timer === 1) { // 第二次点击
        var action1 = cc.moveTo(1, cc.p(RIDER_WIDTH / 2 + 430, 125 + RIDER_HEIGHT / 2 + 440 + 420 + 368))
        var action2 = cc.moveTo(1, cc.p(RIDER_WIDTH / 2 + 240, 125 + RIDER_HEIGHT / 2 + 440 + 420 + 368))
        var action3 = cc.bezierTo(3, [cc.p(RIDER_WIDTH / 2 + 80, 125 + RIDER_HEIGHT / 2 + 440 + 420 + 368), cc.p(RIDER_WIDTH / 2 + 80, 125 + RIDER_HEIGHT / 2 + 440 + 420 + 368 + 328), cc.p(RIDER_WIDTH / 2 + 240, 125 + RIDER_HEIGHT / 2 + 440 + 420 + 368 + 328)])
        var action4 = cc.moveBy(5, cc.p(0, -400))
        var sequence = cc.sequence(action1, action2, action3, actionFinish);
        this.riderSprite.runAction(sequence);
        this.mapSprite.runAction(action4);
      }
      this.timer += 1
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

