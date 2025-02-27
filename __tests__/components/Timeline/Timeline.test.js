import { mount } from 'enzyme';
import Timeline from 'lib/Timeline';
import React from 'react';
import { noop } from 'test-utility';
import dayjs from '../../test-utility/dayjs';

const defaultProps = {
  ...Timeline.defaultProps,
  items: [],
  groups: [],
};

xdescribe('Timeline', () => {
  describe('initialiation', () => {
    it('sets the visibleTime properties to defaultTime props', () => {
      const defaultTimeStart = dayjs('2018-01-01');
      const defaultTimeEnd = dayjs('2018-03-01');

      const props = {
        ...defaultProps,
        defaultTimeStart,
        defaultTimeEnd,
      };

      const wrapper = mount(<Timeline {...props} />);

      expect(wrapper.state()).toMatchObject({
        visibleTimeStart: defaultTimeStart.valueOf(),
        visibleTimeEnd: defaultTimeEnd.valueOf(),
      });
    });
    it('sets the visibleTime properties to visibleTime props', () => {
      const visibleTimeStart = dayjs('2018-01-01').valueOf();
      const visibleTimeEnd = dayjs('2018-03-01').valueOf();

      const props = {
        ...defaultProps,
        visibleTimeStart,
        visibleTimeEnd,
      };

      const wrapper = mount(<Timeline {...props} />);

      expect(wrapper.state()).toMatchObject({
        visibleTimeStart,
        visibleTimeEnd,
      });
    });
    it('throws error if neither visibleTime or defaultTime props are passed', () => {
      const props = {
        ...defaultProps,
        visibleTimeStart: undefined,
        visibleTimeEnd: undefined,
        defaultTimeStart: undefined,
        defaultTimeEnd: undefined,
      };
      jest.spyOn(global.console, 'error').mockImplementation(noop);
      expect(() => mount(<Timeline {...props} />)).toThrow(
        'You must provide either "defaultTimeStart" and "defaultTimeEnd" or "visibleTimeStart" and "visibleTimeEnd" to initialize the Timeline'
      );
      jest.restoreAllMocks();
    });
  });
});
