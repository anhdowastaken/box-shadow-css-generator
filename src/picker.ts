import * as $ from 'jquery';
import * as _ from 'underscore';
import * as Backbone from 'backbone';

class Picker extends Backbone.Model {
  private _id: string;
  private _title: string;
  private _value: string;

  constructor(
    id: string = '',
    title: string = '',
    value: string = ''
  ) {
    super();
    this._id = id;
    this._title = title;
    this._value = value;
  }

  getId(): string {
    return this._id;
  }

  getTitle(): string {
    return this._title;
  }

  getValue(): string {
    return this._value;
  }
}

class PickerView extends Backbone.View<Picker> {
  private eventBus: any;

  constructor(options: any = {}) {
    options.events = {
      'change.spectrum': 'changeColor'
    };
    super(options);
    this.eventBus = options.eventBus;
    this.render();
  }

  render(): Backbone.View<Picker> {
    let templateHtml: string = '';
    templateHtml += '<strong><%= title %></strong><br/>';
    templateHtml += '<span id="value"><%= value %></span><span> </span>';
    templateHtml += '<input id="<%= id %>" class="color-picker"/>';

    let template = _.template(templateHtml);
    this.$el.html(template({
      id: this.model.getId(),
      title: this.model.getTitle(),
      value: this.model.getValue()
    }));

    return this;
  }

  changeColor(event: any, color: any) {
    this.$('span#value').html(color.toHexString());
    let rgb = color.toRgb();
    this.eventBus.trigger('colorChange', rgb.r, rgb.g, rgb.b);
  }
}

export { Picker };
export { PickerView };
