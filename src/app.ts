import * as $ from 'jquery';
import * as _ from 'underscore';
import * as Backbone from 'backbone';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js'; 

import 'spectrum-colorpicker/spectrum.css';
import 'spectrum-colorpicker/spectrum.js';

import { Slider } from './slider.ts';
import { SliderView } from './slider.ts';

import { Picker } from './picker.ts';
import { PickerView } from './picker.ts';

import { InsetSelect } from './inset_select.ts';
import { InsetSelectView } from './inset_select.ts';

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

  private shadowColorPicker: PickerView;
  private backgroundColorPicker: PickerView;
  private boxColorPicker: PickerView;

  private insetSelectView: InsetSelectView;

  private boxView: BoxView;

  private eventBus: any; // Event bus is used to share events between views

  constructor(options: any = {}) {
    options.el = 'body';
    super(options);
  }

  initialize() {
    let width: number = 500;
    let height: number = 300;

    let horizonalLength: number = 10;
    let verticalLength: number = 10;
    let blurRadius: number = 5;
    let spreadRadius: number = 0
    let opacity: number = 75; // Value of opacity must be divided by 100
    let r: number = 0;
    let g: number = 0;
    let b: number = 0;

    let shadowColor = '#000000';
    let boxColor = '#ffff00';

    this.eventBus = _.extend({}, Backbone.Events);

    this.horizonalLengthSilderView = new SliderView({
      model: new Slider('horizonal-length-slider', 'Horizonal Length', 'px', -200, 200, horizonalLength),
      eventBus: this.eventBus
    });

    this.verticalLengthSilderView = new SliderView({
      model: new Slider('vertical-length-slider', 'Vertical Length', 'px', -200, 200, verticalLength),
      eventBus: this.eventBus
    });

    this.blurRadiusSilderView = new SliderView({
      model: new Slider('blur-radius-slider', 'Blur Radius', 'px', 0, 300, blurRadius),
      eventBus: this.eventBus
    });

    this.spreadRadiusSilderView = new SliderView({
      model: new Slider('spread-radius-slider', 'Spread Radius', 'px', -200, 200, spreadRadius),
      eventBus: this.eventBus
    });

    this.opacitySilderView = new SliderView({
      model: new Slider('opacity-slider', 'Opacity', '', 0, 100, opacity),
      eventBus: this.eventBus
    });

    this.shadowColorPicker = new PickerView({
      model: new Picker('shadow-color-picker', 'Shadow Color', shadowColor),
      eventBus: this.eventBus
    });

    // this.backgroundColorPicker = new PickerView({
    //   model: new Picker('background-color-picker', 'Background Color', '#000000'),
    //   eventBus: this.eventBus
    // });

    this.boxColorPicker = new PickerView({
      model: new Picker('box-color-picker', 'Box Color', boxColor),
      eventBus: this.eventBus
    });

    this.insetSelectView = new InsetSelectView({
      model: new InsetSelect(),
      eventBus: this.eventBus
    });

    this.boxView = new BoxView({
      model: new Box(width, height, boxColor, horizonalLength, verticalLength, blurRadius, spreadRadius, r, g, b, opacity),
      eventBus: this.eventBus
    });

    this.render();
    // Apply spectrum color picker
    this.$(document).ready(function() {
      $('input.color-picker#shadow-color-picker').spectrum({
        color: shadowColor
      });
      $('input.color-picker#box-color-picker').spectrum({
        color: boxColor
      });
    });
  }

  render(): Backbone.View<Backbone.Model> {
    this.$('div.container').prepend('<h1>Box Shadow CSS Generator</h1>');

    this.$('div#configure-panel').append(this.horizonalLengthSilderView.el);
    this.$('div#configure-panel').append(this.verticalLengthSilderView.el);
    this.$('div#configure-panel').append(this.blurRadiusSilderView.el);
    this.$('div#configure-panel').append(this.spreadRadiusSilderView.el);
    this.$('div#configure-panel').append(this.opacitySilderView.el);

    this.$('div#configure-panel').append(this.shadowColorPicker.el);
    // this.$('div#configure-panel').append(this.backgroundColorPicker.el);
    this.$('div#configure-panel').append(this.boxColorPicker.el);

    this.$('div#configure-panel').append(this.insetSelectView.el);

    this.$('div#box-panel').append(this.boxView.el);

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
