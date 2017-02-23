import * as $ from 'jquery';
import * as _ from 'underscore';
import * as Backbone from 'backbone';

import { Slider } from './slider.ts';
import { SliderView } from './slider.ts';

import { Box } from './box.ts';
import { BoxView } from './box.ts';

// Expose jquery for global usage
import 'expose-loader?$!jquery';
import 'expose-loader?jQuery!jquery';

class AppView extends Backbone.View<Backbone.Model> {
  private horizonalLengthSilderView: SliderView;
  private verticalLengthSilderView: SliderView;
  private blurRadiusSilderView: SliderView;
  private spreadRadiusSilderView: SliderView;
  private opacitySilderView: SliderView;
  private boxView: BoxView;
  private eventBus: any;

  constructor(options: any = {}) {
    options.el = 'body';
    super(options);
  }

  initialize() {
    this.eventBus = _.extend({}, Backbone.Events);

    this.horizonalLengthSilderView = new SliderView({
      model: new Slider('horizonal-length-slider', 'Horizonal Length', 'px', 10),
      eventBus: this.eventBus
    });

    this.verticalLengthSilderView = new SliderView({
      model: new Slider('vertical-length-slider', 'Vertical Length', 'px', 10),
      eventBus: this.eventBus
    });

    this.blurRadiusSilderView = new SliderView({
      model: new Slider('blur-radius-slider', 'Blur Radius', 'px', 5),
      eventBus: this.eventBus
    });

    this.spreadRadiusSilderView = new SliderView({
      model: new Slider('spread-radius-slider', 'Spread Radius', 'px', 0),
      eventBus: this.eventBus
    });

    this.opacitySilderView = new SliderView({
      model: new Slider('opacity-slider', 'Opacity', 'px', 0.75),
      eventBus: this.eventBus
    });

    this.boxView = new BoxView({
      model: new Box(),
      eventBus: this.eventBus
    });

    this.render();
  }

  render(): Backbone.View<Backbone.Model> {
    this.$el.append('<h1>Box Shadow CSS Generator</h1>');
    this.$el.append(this.horizonalLengthSilderView.el);
    this.$el.append(this.verticalLengthSilderView.el);
    this.$el.append(this.blurRadiusSilderView.el);
    this.$el.append(this.spreadRadiusSilderView.el);
    this.$el.append(this.opacitySilderView.el);
    this.$el.append(this.boxView.el);

    return this;
  }
}

class AppRouter extends Backbone.Router {
  routes = {
    '': 'showHomePage'
  };

  constructor() {
    super();
    (<any>this)._bindRoutes(); // Bind routes with corresponding callbacks
  }

  showHomePage(): void {
    $(document).ready(function() {
      new AppView();
    });
  }
}

const appRouter: AppRouter = new AppRouter();
Backbone.history.start();
