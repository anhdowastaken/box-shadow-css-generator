import * as $ from 'jquery';
import * as _ from 'underscore';
import * as Backbone from 'backbone';

class Box extends Backbone.Model {
  private _horizonalLength: number;
  private _verticalLength: number;
  private _blurRadius: number;
  private _spreadRadius: number;
  private _r: number;
  private _g: number;
  private _b: number;
  private _opacity: number;

  constructor(
    horizonalLength: number = 0,
    verticalLength: number = 0,
    blurRadius: number = 0,
    spreadRadius: number = 0,
    r: number = 0,
    g: number = 0,
    b: number = 0,
    opacity: number = 0
  ) {
    super();
    this._horizonalLength = horizonalLength;
    this._verticalLength = verticalLength;
    this._blurRadius = blurRadius;
    this._spreadRadius = spreadRadius;
    this._r = r;
    this._g = g;
    this._b = b;
    this._opacity = opacity;
  }

  setHorizonalLength(value: number) {
    this._horizonalLength = value;
  }

  getHorizonalLength(): number {
    return this._horizonalLength;
  }

  setVerticalLength(value: number) {
    this._verticalLength = value;
  }

  getVerticalLength(): number {
    return this._verticalLength;
  }

  setBlurRadius(value: number) {
    this._blurRadius = value;
  }

  getBlurRadius(): number {
    return this._blurRadius;
  }

  setSpreadRadius(value: number) {
    this._spreadRadius = value;
  }

  getSpreadRadius(): number {
    return this._spreadRadius;
  }

  setR(value: number) {
    this._r = value;
  }

  getR(): number {
    return this._r;
  }

  setG(value: number) {
    this._g = value;
  }

  getG(): number {
    return this._g;
  }

  setB(value: number) {
    this._b = value;
  }

  getB(): number {
    return this._b;
  }

  setOpacity(value: number) {
    this._opacity = value;
  }

  getOpacity(): number {
    return this._opacity;
  }

  getBoxShadowString(): string {
    let str: string = `${ this.getHorizonalLength().toString() }px ${ this.getVerticalLength().toString() }px ${ this.getBlurRadius() }px ${ this.getSpreadRadius().toString() }px rgba(${ this.getR().toString() }, ${ this.getG().toString() }, ${ this.getB().toString() }, ${ this.getOpacity().toString() })`;

    return str;
  }
}

class BoxView extends Backbone.View<Box> {
  private eventBus: any;

  constructor(options: any = {}) {
    super(options);
    this.eventBus = options.eventBus;
    this.eventBus.on('sliderOnInput', this.sliderOnInput, this);
    this.eventBus.on('colorChange', this.colorChange, this);
    // this.eventBus.listenTo(this.eventBus, 'sliderOnInput', this.sliderOnInput);
    this.render();
  }

  render(): Backbone.View<Box> {
    let templateHtml: string = '';
    templateHtml += '<div style="width: 500px; height: 300px; background-color: yellow">';
    templateHtml += '<textarea class="form-control" rows="3"></textarea>';
    templateHtml += '</div>';

    let template = _.template(templateHtml);
    this.$el.html(template({}));

    this.applyCssBoxShadow();

    return this;
  }

  applyCssBoxShadow() {
    this.$('div').css('-webkit-box-shadow', this.model.getBoxShadowString());
    this.$('div').css('-moz-box-shadow', this.model.getBoxShadowString());
    this.$('div').css('box-shadow', this.model.getBoxShadowString());

    let str: string = '';
    str += '-webkit-box-shadow: ' + this.model.getBoxShadowString() + '\n';
    str += '-moz-box-shadow: ' + this.model.getBoxShadowString() + '\n';
    str += 'box-shadow: ' + this.model.getBoxShadowString();
    this.$('textarea').text(str);
  }

  sliderOnInput(id: string, value: number): void {
    switch (id) {
      case 'horizonal-length-slider':
        this.model.setHorizonalLength(value);
        break;
      case 'vertical-length-slider':
        this.model.setVerticalLength(value);
        break;
      case 'blur-radius-slider':
        this.model.setBlurRadius(value);
        break;
      case 'spread-radius-slider':
        this.model.setSpreadRadius(value);
        break;
      case 'opacity-slider':
        this.model.setOpacity(value);
        break;
      default:
        break;
    }

    this.applyCssBoxShadow();
  }

  colorChange(r: number, g: number, b: number): void {
    this.model.setR(r);
    this.model.setG(g);
    this.model.setB(b);

    this.applyCssBoxShadow();
  }
}

export { Box };
export { BoxView };
