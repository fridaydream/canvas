
var MAP_WIDTH = 375 * 2
var MAP_HEIGHT = MAP_WIDTH * 7
var RIDER_WIDTH = 180
var RIDER_HEIGHT = 200
var HelloWorldLayer = cc.Layer.extend({
    sprite: null,
    mapSprite: null,
    spriteRider: null,
    timer: 0, // 第几次点击
    ctor:function () {
        this._super();
        this.space = new cp.Space();
        var size = cc.winSize;
        console.log('size', size);
        this.mapSprite = new cc.Sprite(res.bg_map);
        this.mapSprite.setPosition(size.width / 2, size.height / 2)
        this.spriteRider = new cc.Sprite(res.rider_png);
        
        this.spriteRider.setPosition(RIDER_WIDTH / 2, 125 + RIDER_HEIGHT / 2)
        this.spriteRider.setAnchorPoint(0.5, 0.5);
        this.addChild(this.mapSprite, 1)
        var action = cc.moveBy(1, cc.p(0, MAP_HEIGHT / 2 - size.height / 2))
        this.mapSprite.runAction(action);
        this.mapSprite.addChild(this.spriteRider, 2)
        cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: true,
          onTouchBegan: this.onTouchBegan.bind(this)
        }, this.spriteRider)
        return true;
    },  
    onEnter: function() {
      this._super()
    },
    onTouchBegan: function(touch, event) {
      var target = event.getCurrentTarget()
      var location = touch.getLocation()
      var s = target.getContentSize();
      var rect = cc.rect(0, 0, s.width, s.height);
      // 获取当前触摸点相对于按钮所在的坐标
      var locationInNode = target.convertToNodeSpace(location);
      // this.timer < 2 第三段动画没加
      if (cc.rectContainsPoint(rect, locationInNode) && this.timer < 2) {       // 判断触摸点是否在按钮范围内
        this.moveRider()
        return true;
      }
      return false;
    },
    moveRider: function() {
      var that = this
      // 第一次点击
      if (this.timer === 0) {
        var actionFinish = cc.callFunc(function () {
          // 左右翻转(镜像翻转)
          that.spriteRider.setFlippedX(true);
        }, that);
        var action1 = cc.moveTo(2, cc.p(RIDER_WIDTH / 2 + 300, 125 + RIDER_HEIGHT / 2));
        // var action2 = cc.moveTo(2, cc.p(300, 565));
        var action2 = cc.bezierTo(3, [cc.p(RIDER_WIDTH / 2 + 600, 125 + RIDER_HEIGHT / 2), cc.p(RIDER_WIDTH / 2 + 600, 125 + RIDER_HEIGHT / 2 + 440), cc.p(RIDER_WIDTH / 2 + 300, 125 + RIDER_HEIGHT / 2 + 440)])
        var action3 = cc.bezierTo(3, [cc.p(RIDER_WIDTH / 2 + 100, 125 + RIDER_HEIGHT / 2 + 440), cc.p(RIDER_WIDTH / 2 + 100, 125 + RIDER_HEIGHT / 2 + 440 + 420), cc.p(RIDER_WIDTH / 2 + 300, 125 + RIDER_HEIGHT / 2 + 440 + 420)])
        var action4 = cc.moveTo(1, cc.p(RIDER_WIDTH / 2 + 430, 125 + RIDER_HEIGHT / 2 + 440 + 420))
        var action5 = cc.moveTo(1, cc.p(RIDER_WIDTH / 2 + 430, 125 + RIDER_HEIGHT / 2 + 440 + 420 + 368 / 2))
        var action6 = cc.moveBy(10, cc.p(0, -600))
        // var sequence1 = cc.spawn(action2)
        var sequence = cc.sequence(action1, action2, actionFinish, action3, actionFinish, action4, action5);
        this.spriteRider.runAction(sequence);
        this.mapSprite.runAction(action6);
      } else if (this.timer === 1) { // 第二次点击
        var actionFinish = cc.callFunc(function () {
          // 左右翻转(镜像翻转)
          that.spriteRider.setFlippedX(true);
        }, that);
        var action1 = cc.moveTo(1, cc.p(RIDER_WIDTH / 2 + 430, 125 + RIDER_HEIGHT / 2 + 440 + 420 + 368))
        var action2 = cc.moveTo(1, cc.p(RIDER_WIDTH / 2 + 240, 125 + RIDER_HEIGHT / 2 + 440 + 420 + 368))
        var action3 = cc.bezierTo(3, [cc.p(RIDER_WIDTH / 2 + 80, 125 + RIDER_HEIGHT / 2 + 440 + 420 + 368), cc.p(RIDER_WIDTH / 2 + 80, 125 + RIDER_HEIGHT / 2 + 440 + 420 + 368 + 328), cc.p(RIDER_WIDTH / 2 + 240, 125 + RIDER_HEIGHT / 2 + 440 + 420 + 368 + 328)])
        var action4 = cc.moveBy(5, cc.p(0, -400))
        var sequence = cc.sequence(action1, action2, action3, actionFinish);
        this.spriteRider.runAction(sequence);
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

