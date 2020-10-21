const {ccclass, property} = cc._decorator;

@ccclass
export default class MainController extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        // 0. getting canvas properties
        let { x: canvasX, y: canvasY, width: canvasWidth, height: canvasHeight } = cc.Canvas.instance.node

        // 1. creating RenderTexture
        let renderTexture = this.createRenderTexture(canvasWidth, canvasHeight)

        // 2. changing targetTexture property (rendering destination)
        //    before: Scene, afer: RenderTexture
        let camera = this.node.getChildByName("CameraRender2").getComponent(cc.Camera)
        camera.targetTexture = renderTexture

        // 3. showing RenderTexture via Sprite.spriteFrame
        let sprite = this.createSprite(canvasX, canvasY, canvasWidth, canvasHeight, renderTexture)
    }

    start () {}

    update (dt) {}

    // PRIVATE FUNCTIONS:

    private createRenderTexture(width: number, height: number) : cc.RenderTexture {
        let renderTexture = new cc.RenderTexture()
        renderTexture.initWithSize(width, height)
        return renderTexture
    }

    private createSprite(x: number, y: number, width: number, height: number, renderTexture: cc.RenderTexture): cc.Sprite {
        let sprite = this.node.addComponent(cc.Sprite)
        sprite.node.width = width
        sprite.node.height = height
        sprite.spriteFrame = this.createSpriteFrame(renderTexture)
        return sprite
    }

    private createSpriteFrame(renderTexture: cc.RenderTexture): cc.SpriteFrame {
        let spriteFrame = new cc.SpriteFrame()
        spriteFrame.setFlipY(true)
        spriteFrame.setTexture(renderTexture)
        return spriteFrame
    }
}
