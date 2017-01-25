import Ember from 'ember';

export default Ember.Service.extend({
  enabled: false,
  map: {},
  prepend: '/',

  rootURL: Ember.computed(function() {
    var applicationConfig = Ember.getOwner(this).resolveRegistration('config:environment');

    return applicationConfig.rootURL;
  }),

  resolve(name) {
    const map = this.get('map') || {};
    const prepend = this.get('prepend');
    const rootURL = this.get('rootURL');
    const enabled = this.get('enabled');
    const assetName = enabled ? map[name] : name;

    return `${prepend}${rootURL}${assetName}`.replace(/(\w|^)(\/\/+)/, '$1/');
  }
});
