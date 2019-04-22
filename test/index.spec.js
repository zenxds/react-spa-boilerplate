import { mount, shallow } from 'enzyme'
import {
  MemoryRouter as Router
} from 'react-router-dom'

import Header from '../src/component/Header'

test('header', () => {
  const wrapper = mount(<Router><Header /></Router>)

  expect(wrapper.html()).toBeTruthy()
})
