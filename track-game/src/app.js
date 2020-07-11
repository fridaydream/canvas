
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;
        console.log('size', size);
        var sprite = new cc.Sprite(res.bg_map);
        sprite.setPosition(size.width / 2, 0.1)
        var spriteRider = new cc.Sprite(res.rider_png);
        spriteRider.setPosition(size.width / 2, size.height / 2)
        this.addChild(sprite)
        this.addChild(spriteRider)
        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

