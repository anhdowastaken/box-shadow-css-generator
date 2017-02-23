import * as $ from 'jquery';
import * as _ from 'underscore';
import * as Backbone from 'backbone';

class Box extends Backbone.Model {
  private _horizonalLength: number;
  private _verticalLength: number;
  private _blurRadius: number;
  private _spreadRadius: number;
  private _opacity: number;

  constructor(
    horizonalLength: number = 0,
    verticalLength: number = 0,
    blurRadius: number = 0,
    spreadRadius: number = 0,
    opacity: number = 0
  ) {
    super();
    this._horizonalLength = horizonalLength;
    this._verticalLength = verticalLength;
    this._blurRadius = blurRadius;
    this._spreadRadius = spreadRadius;
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

  setOpacity(value: number) {
    this._opacity = value;
  }

  getOpacity(): number {
    return this._opacity;
  }

  getBoxShadowString(): string {
    let str: string = '';
    str += this.getHorizonalLength().toString();
    str += 'px ';
    str += this.getVerticalLength().toString();
    str += 'px ';
    str += this.getBlurRadius().toString();
    str += 'px ';
    str += this.getSpreadRadius().toString();
    str += 'px ';

    return str;
  }
}

class BoxView extends Backbone.View<Box> {
  private eventBus: any;

  constructor(options: any = {}) {
    super(options);
    this.eventBus = options.eventBus;
    this.eventBus.on('sliderOnInput', this.sliderOnInput, this);
    // this.eventBus.listenTo(this.eventBus, 'sliderOnInput', this.sliderOnInput);
    this.render();
  }

  render(): Backbone.View<Box> {
    let templateHtml: string = '';
    templateHtml += '<div style="width: 300px; height: 100px; background-color: yellow">';
    templateHtml += '<textarea rows="3"></textarea>';
    templateHtml += '</div>';

    let template = _.template(templateHtml);
    this.$el.html(template(this.model.toJSON()));
    this.$('div').css('box-shadow', this.model.getBoxShadowString());

    return this;
  }

  sliderOnInput(id: string, value: number): void {
    // this.$('p').html(id + ' ' + value.toString());
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

    this.$('div').css('box-shadow', this.model.getBoxShadowString());
    this.$('textarea').text('box-shadow: ' + this.$('div').css('box-shadow'));
  }
}

export { Box };
export { BoxView };
