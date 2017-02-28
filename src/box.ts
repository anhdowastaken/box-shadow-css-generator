import * as $ from 'jquery';
import * as _ from 'underscore';
import * as Backbone from 'backbone';

import { Slider } from './slider.ts';
import { PickerView } from './picker.ts';
import { InsetSelectView } from './inset_select.ts';

class Box extends Backbone.Model {
  private _width: number;
  private _height: number;
  private _color: string;
  private _horizonalLength: number;
  private _verticalLength: number;
  private _blurRadius: number;
  private _spreadRadius: number;
  private _r: number;
  private _g: number;
  private _b: number;
  private _opacity: number;
  private _inset: boolean;

  constructor(
    width: number = 500,
    height: number = 300,
    color: string = '#ffff00',
    horizonalLength: number = 0,
    verticalLength: number = 0,
    blurRadius: number = 0,
    spreadRadius: number = 0,
    r: number = 0,
    g: number = 0,
    b: number = 0,
    opacity: number = 0,
    inset: boolean = false
  ) {
    super();
    this._width = width;
    this._height = height;
    this._color = color;
    this._horizonalLength = horizonalLength;
    this._verticalLength = verticalLength;
    this._blurRadius = blurRadius;
    this._spreadRadius = spreadRadius;
    this._r = r;
    this._g = g;
    this._b = b;
    this._opacity = opacity;
    this._inset = inset;
  }

  setWidth(value: number) {
    this._width = value;
  }

  getWidth(): number {
    return this._width;
  }

  setHeight(value: number) {
    this._height = value;
  }

  getHeight(): number {
    return this._height;
  }

  setColor(value: string) {
    this._color = value;
  }

  getColor(): string {
    return this._color;
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

  setInset(value: boolean) {
    this._inset = value;
  }

  getInset(): boolean {
    return this._inset;
  }

  getWidthString(): string {
    let str: string = ``;
    str += `width: ${ this.getWidth() }px`;

    return str;
  }

  getHeightString(): string {
    let str: string = ``;
    str += `height: ${ this.getHeight() }px`;

    return str;
  }

  getColorString() {
    return this.getColor();
  }

  getBoxShadowString(): string {
    let str: string = ``;
    str += `${ this.getHorizonalLength().toString() }px `;
    str += `${ this.getVerticalLength().toString() }px `;
    str += `${ this.getBlurRadius() }px `;
    str += `${ this.getSpreadRadius().toString() }px `;
    str += `rgba(${ this.getR().toString() }, ${ this.getG().toString() }, ${ this.getB().toString() }, ${ this.getOpacity().toString() })`;

    if (this._inset) {
      str += ' inset';
    }

    return str;
  }
}

class BoxView extends Backbone.View<Box> {
  private eventBus: any;

  constructor(options: any = {}) {
    super(options);
    this.eventBus = options.eventBus;
    // this.eventBus.on('sliderOnInput', this.sliderOnInput, this);
    // this.eventBus.on('colorChange', this.colorChange, this);
    // this.eventBus.on('selectInset', this.selectInset, this);
    // To be safety and avoid zombie, use 'listenTo' instead of 'on'
    this.eventBus.listenTo(this.eventBus, 'sliderOnInput', this.sliderOnInput.bind(this));
    this.eventBus.listenTo(this.eventBus, 'shadowChange', this.shadowChange.bind(this));
    this.eventBus.listenTo(this.eventBus, 'boxColorChange', this.boxColorChange.bind(this));
    this.eventBus.listenTo(this.eventBus, 'selectInset', this.selectInset.bind(this));

    this.render();
  }

  render(): Backbone.View<Box> {
    let template = _.template($('#box-template').html());
    this.$el.html(template({}));

    this.applyCssWidthHeight();
    this.applyCssBackgroundColor();
    this.applyCssBoxShadow();

    return this;
  }

  applyCssWidthHeight() {
    this.$('div').css('width', this.model.getWidth());
    this.$('div').css('height', this.model.getHeight());
  }

  applyCssBackgroundColor() {
    this.$('div').css('background-color', this.model.getColor());
  }

  applyCssBoxShadow() {
    this.$('div').css('-webkit-box-shadow', this.model.getBoxShadowString());
    this.$('div').css('-moz-box-shadow', this.model.getBoxShadowString());
    this.$('div').css('box-shadow', this.model.getBoxShadowString());

    let str: string = ``;
    str += `-webkit-box-shadow: ${ this.model.getBoxShadowString() }\n`;
    str += `-moz-box-shadow: ${ this.model.getBoxShadowString() }\n`;
    str += `box-shadow: ${ this.model.getBoxShadowString() }`;
    this.$('textarea').text(str);
  }

  sliderOnInput(id: string, value: number): void {
    // Depend on type of slider we will update value of corresponding item
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

  shadowChange(r: number, g: number, b: number): void {
    this.model.setR(r);
    this.model.setG(g);
    this.model.setB(b);

    this.applyCssBoxShadow();
  }

  boxColorChange(color: string) {
    this.model.setColor(color);

    this.applyCssBackgroundColor();
  }

  selectInset(inset: boolean) {
    this.model.setInset(inset);

    this.applyCssBoxShadow();
  }
}

export { Box };
export { BoxView };
