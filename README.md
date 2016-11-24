# react-interval-formatter

A React formatter that updates the element each 15 seconds

## [Demo](http://scup.github.io/react-interval-formatter/demo.html)

## Install
```
yarn install react-interval-formatter
```
or
```
npm install react-interval-formatter --save
```

## Properties
### `tag` : `string`
The tag you want to rendered

### `formatter` : `function`

A function that knows how to format the `value` prop

### `value` : `string`

The value that is going to be passed to the formatter

### `othersProps`
You can send any props you want, i.e.: `onClick`, `className`, etc...

## Example
```js
import IntervalFormatter from 'react-interval-formatter'

const multiplier = 1
const formatter = (value) =>
  `${value} * ${multiplier} = ${value * multiplier++}`

export default () => 
  <IntervalFormatter
    tag='label'
    formatter={formatter}
    value=10
    className='ten-multiplier'
    onClick={() => alert('aaa')}
  />;
```

It will render<br/>
<code>Instantly</code>: `<label class="ten-multiplier">10 * 1 = 10</div>`<br/>
<code>15 seconds later</code>: `<label class="ten-multiplier">10 * 2 = 20</div>`<br/>
<code>30 seconds later</code>: `<label class="ten-multiplier">10 * 3 = 30</div>`
