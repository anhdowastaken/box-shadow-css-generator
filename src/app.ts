import * as $ from 'jquery';
import * as _ from 'underscore';
import * as Backbone from 'backbone';
// Expose jquery for global usage
import 'expose?$!jquery';
import 'expose?jQuery!jquery';

class AppView extends Backbone.View<Backbone.Model> {
  constructor(options: any = {}) {
    options.el = 'body';
    super(options);
  }

  initialize() {
    this.render();
  }

  render(): Backbone.View<Backbone.Model> {
    this.$el.append('<h1>Box Shadow CSS Generator</h1>');
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
