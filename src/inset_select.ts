import * as $ from 'jquery';
import * as _ from 'underscore';
import * as Backbone from 'backbone';

class InsetSelect extends Backbone.Model {
  constructor() {
    super();
  }
}

class InsetSelectView extends Backbone.View<InsetSelect> {
  private eventBus: any;

  constructor(options: any = {}) {
    options.events = {
      'change select': 'selectInset'
    };
    super(options);
    this.eventBus = options.eventBus;
    this.render();
  }

  render(): Backbone.View<InsetSelect> {
    let template = _.template($('#select-template').html());
    this.$el.html(template({}));

    return this;
  }

  selectInset(): void {
    if (this.$('select').val() === 'Outline') {
      this.eventBus.trigger('selectInset', false);
    } else {
      this.eventBus.trigger('selectInset', true);
    }
  }
}

export { InsetSelect };
export { InsetSelectView };
