import * as $ from 'jquery';
import * as _ from 'underscore';
import * as Backbone from 'backbone';

class Box extends Backbone.Model {
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
    templateHtml += '<p></p>';

    let template = _.template(templateHtml);
    this.$el.html(template(this.model.toJSON()));

    return this;
  }

  sliderOnInput(id: string, value: number): void {
    this.$('p').html(id + ' ' + value.toString());
  }
}

export { Box };
export { BoxView };
