# data-table-directives

Declaratively adds some features to `<table>` elements.

- Sorting
- Filtering
- Resizing

This package does not provide any decorative styles. You can decorate tables as you like, or you can use a CSS framework.

## Usage

```html
<!-- load css and js -->
<link rel="stylesheet" href="data-table-directives/styles.css">
<script src="data-table-directives/index.js"></script>

<!-- create table element with some `data-table-*` attributes -->
<table>
  <thead>
    <tr>
      <th data-table-sortable data-table-resizable>Name</th>
      <th data-table-sortable style="width: 4em">Age</th>
    </tr>
    <tr data-table-filter>
      <td><input style="width: 100%; box-sizing: border-box;"></td>
      <td><input style="width: 100%; box-sizing: border-box;" type="number"></td>
    </tr>
  </thead>
  <tbody>
    <tr><td>Alice</td><td>24</td></tr>
    <tr><td>Bob</td><td>21</td></tr>
    <tr><td>Charlie</td><td>100</td></tr>
  </tbody>
</table>
```

## License

[WTFPL](http://www.wtfpl.net)
