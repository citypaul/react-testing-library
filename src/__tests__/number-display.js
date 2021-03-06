import React from 'react'
import {render} from '../'

let idCounter = 1

class NumberDisplay extends React.Component {
  id = idCounter++ // to ensure we don't remount a different instance
  render() {
    return (
      <div>
        <span data-test="number-display">{this.props.number}</span>
        <span data-test="instance-id">{this.id}</span>
      </div>
    )
  }
}

test('calling render with the same component on the same container does not remount', () => {
  const {container, queryByTestId} = render(<NumberDisplay number={1} />)
  expect(queryByTestId('number-display').textContent).toBe('1')

  // re-render the same component with different props
  // but pass the same container in the options argument.
  // which will cause a re-render of the same instance (normal React behavior).
  render(<NumberDisplay number={2} />, {container})
  expect(queryByTestId('number-display').textContent).toBe('2')

  expect(queryByTestId('instance-id').textContent).toBe('1')
})
