import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationElement from './NavigationElement/NavigationElement';

configure({ adapter: new Adapter() });

describe('<NavigationItems/>', () => {
   let wrapper;

   beforeEach(() => {
      wrapper = shallow(<NavigationItems />);
   });

   it('should render 2 <NavigationItem /> elements if not authenticated', () => {
      expect(wrapper.find(NavigationElement)).toHaveLength(2);
   });

   it('should render 3 <NavigationItem /> elements if authenticated', () => {
      wrapper.setProps({ isAuthenticated: true });
      expect(wrapper.find(NavigationElement)).toHaveLength(3);
   });

   it('should render 3 <NavigationItem /> elements if authenticated', () => {
      wrapper.setProps({ isAuthenticated: true });
      expect(
         wrapper.contains(
            <NavigationElement link='/logout'>Log Out</NavigationElement>
         )
      ).toEqual(true);
   });
});
