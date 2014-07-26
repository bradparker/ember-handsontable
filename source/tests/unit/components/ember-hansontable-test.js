import { test, moduleForComponent } from 'ember-qunit';

moduleForComponent('ember-hansontable', 'EmberHansontableComponent', {});

function getTableInstance(component) {
  return component.get('handsontableElement').handsontable('getInstance');
}

test('setting a Handsontable element', function () {
  expect(1);

  var component = this.subject();

  this.append();

  ok(component.get('handsontableElement'));
});

test('setting rows before render', function () {
  expect(1);

  var component = this.subject();
  var rows = [
    { foo: "Foo", bar: "Bar" }
  ];

  component.set('rows', rows);
  
  this.append();

  var instance = getTableInstance(component);
  
  equal(instance.getData(), rows);
});

test('setting rows after render', function () {
  expect(1);

  var component = this.subject();
  var rows = [
    { foo: "Foo", bar: "Bar" }
  ];

  this.append();

  component.set('rows', rows);
  
  var instance = getTableInstance(component);
  
  equal(instance.getData(), rows);
});

test('setting columns before render', function () {
  expect(2);

  var component = this.subject();
  
  var columns =  [
    { header: "Foo", data: "foo" },
    { header: "Bar", data: "bar" }
  ];

  component.set('columns', columns);
  
  this.append();

  var instance = getTableInstance(component);

  equal(instance.colToProp(0), 'foo');
  equal(instance.colToProp(1), 'bar');
});

test('setting columns after render', function () {
  expect(2);

  var component = this.subject();
  
  var columns =  [
    { header: "Foo", data: "foo" },
    { header: "Bar", data: "bar" }
  ];

  this.append();

  component.set('columns', columns);

  var instance = getTableInstance(component);

  equal(instance.colToProp(0), 'foo');
  equal(instance.colToProp(1), 'bar');
});

test('setting options before render', function () {
  expect(1);

  var component = this.subject();
  
  var options =  { minSpareRows : 2 };

  component.set('options', options);
  
  this.append();

  var instance = getTableInstance(component);

  equal(instance.countEmptyRows(), 2);
});

test('setting options after render', function () {
  expect(1);

  var component = this.subject();
  
  var options = { minSpareRows : 2 };

  this.append();

  component.set('options', options);

  var instance = getTableInstance(component);

  equal(instance.countEmptyRows(), 2);
});

test('replacing the rows array', function () {
  expect(1);

  var component = this.subject();
  var rows = [
    { foo: "Foo", bar: "Bar" }
  ];
  var rows2 = [
    { foo: "Foo2", bar: "Bar2" }
  ];

  component.set('rows', rows);
  component.set('rows', rows2);
  
  this.append();

  var instance = getTableInstance(component);
  
  equal(instance.getData(), rows2);
});

test('updating the rows array', function () {
  expect(1);

  var component = this.subject();
  var rows = [
    { foo: "Foo", bar: "Bar" }
  ];

  component.set('rows', rows);
  
  this.append();

  rows.push({ foo: "Foo2", bar: "Bar2" });

  var instance = getTableInstance(component);
  
  equal(instance.getData().length, 2);
});

test('updating table data', function () {
  expect(1);

  var component = this.subject();
  
  var rows = [
    { foo: "Foo", bar: "Bar" }
  ];

  component.set('rows', rows);
  
  this.append();

  var instance = getTableInstance(component);
  instance.setDataAtCell(0, 0, 'Foo2');
  
  equal(rows[0].foo, 'Foo2');
});
