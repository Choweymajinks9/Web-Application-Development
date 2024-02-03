import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Product from '../Pages/Product.jsx';

describe('Product Component', () => {
  it('renders correctly', () => {
    const product = {
      id: 1,
      name: 'Test Product',
      image: 'test_image.png',
      new_price: 10,
      old_price: 15,
    };

    const wrapper = shallow(<Product product={product} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

});
