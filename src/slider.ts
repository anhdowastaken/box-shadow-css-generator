import * as $ from 'jquery';
import * as _ from 'underscore';
import * as Backbone from 'backbone';

class Slider extends Backbone.Model {
  private _id: string;
  private _title: string;
  private _unit: string;
  private _min: number;
  private _max: number;
  private _value: number;

  constructor(
    id: string = '',
    title: string = '',
    unit: string = '',
    min: number = 0,
    max: number = 100,
    value: number = 0
  ) {
    super();
    this._id = id;
    this._title = title;
    this._unit = unit;
    this._min = min;
    this._max = max;
    // Because opacity value is from 0 to 1
    if (id === 'opacity-slider') {
      this._value = value / 100;
    } else {
      this._value = value;
    }
  }

  getId(): string {
    return this._id;
  }

  getTitle(): string {
    return this._title;
  }

  getUnit(): string {
    return this._unit;
  }

  getMin(): number {
    return this._min;
  }

  getMax(): number {
    return this._max;
  }

  setValue(value: number) {
    // Because opacity value is from 0 to 1
    if (this._id == 'opacity-slider') {
      this._value = value / 100;
    } else {
      this._value = value;
    }
  }

  getValue(): number {
    return this._value;
  }
}

class SliderView extends Backbone.View<Slider> {
  private eventBus: any;

  constructor(options: any = {}) {
    options.tagName = 'div';
    options.className = 'slider';
    options.id = options.model.getId();
    options.events = {
      'input input': 'sliderOnInput'
    };
    super(options);
    this.eventBus = options.eventBus;
    this.render();
  }

  render(): Backbone.View<Slider> {
    let template = _.template($('#slider-template').html());

    // console.log(this.model.toJSON());
    this.$el.html(template({
      title: this.model.getTitle(),
      unit: this.model.getUnit(),
      min: this.model.getMin(),
      max: this.model.getMax(),
      // Because opacity value is from 0 to 1
      value: this.model.getId() === 'opacity-slider' ? this.model.getValue() * 100 : this.model.getValue(),
      valueText: this.model.getValue()
    }));

    return this;
  }

  sliderOnInput() {
    this.model.setValue(this.$('input').val());
    this.$('span#value').html(this.model.getValue().toString());
    this.eventBus.trigger('sliderOnInput', this.model.getId(), this.model.getValue());
  }
}

export { Slider };
export { SliderView };
