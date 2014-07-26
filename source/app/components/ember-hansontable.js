import Ember from 'ember';

function _merge (source, destination) {
  for (var key in source) {
    if (source.hasOwnProperty(key) && !destination.hasOwnProperty(key) ) {
      destination[key] = source[key];
    }
  }
  return destination;
}

export default Ember.Component.extend({
  
  _initialize: function _initialize () {
    var EmberHandsontable = this;

    var options = this.get('options') || this.set('options', {}).get('options'),
        rows    = this.get('rows') || this.set('rows', []).get('rows'),
        columns = this.get('columns');

    var colHeaders;

    if (columns) {
      colHeaders = columns.map(function (column) {
        return column.header;
      }); 
    }
    
    var settings = _merge({
      data: rows,
      colHeaders: colHeaders,
      columns: columns,
      afterChange: function afterChange () {
        // TODO Make this in any way efficient
        
        var data = this.getData();
        var rows = EmberHandsontable.get('rows');

        rows.set('content', data).arrayContentDidChange();
      }
    }, options);

    var element = this.$().handsontable(settings);

    this.set('handsontableElement', element);

  }.on('didInsertElement'),

  _updateSettings: function (newSettings) {
    var element = this.get('handsontableElement'),
        instance,
        currentSettings,
        settings;

    if (element) {
      instance = element.handsontable('getInstance');
      currentSettings = instance.getSettings();
      settings = _merge(currentSettings, newSettings);

      instance.updateSettings(settings);
    }
  },
  
  _updateRows: function () {
    var element = this.get('handsontableElement'),
        rows = this.get('rows');

    if (element) {
      element.handsontable('getInstance').loadData(rows);
    }

  }.observes('rows.@each'),

  _updateColumns: function () {
    var columns = this.get('columns'),
        colHeaders;

    if (columns) {
      colHeaders = columns.map(function (column) {
        return column.header;
      });
    }

    this._updateSettings({
      colHeaders: colHeaders,
      columns: columns
    });

  }.observes('columns.@each'),

  _updateOptions: function () {
    var options = this.get('options');

    this._updateSettings(options);
  
  }.observes('options')

});
