import * as $ from 'jquery';
import * as _ from 'underscore';
import * as Backbone from 'backbone';

class Slider extends Backbone.Model {
  private _id: string;
  private _title: string;
  private _unit: string;
  private _value: number;

  constructor(id: string = '', title: string = '', unit: string = '', value: number = 0) {
    super();
    this._id = id;
    this._title = title;
    this._unit = unit;
    this._value = value;
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

  setValue(value: number) {
    this._value = value;
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
    let templateHtml: string = '';
    templateHtml += '<p><%= title %></p>';
    templateHtml += '<span id="value"><%= value %></span><span> <%= unit %></span>';
    templateHtml += '<br/>';
    templateHtml += '<input type="range" value="<%= value %>"/>';
    let template = _.template(templateHtml);

    // console.log(this.model.toJSON());
    this.$el.html(template({
      title: this.model.getTitle(),
      unit: this.model.getUnit(),
      value: this.model.getValue()
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
