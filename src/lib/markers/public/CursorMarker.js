import PropTypes from 'prop-types';
import React from 'react';
import { TimelineMarkerType } from '../markerType';
import { TimelineMarkersConsumer } from '../TimelineMarkersContext';

class CursorMarker extends React.Component {
  static propTypes = {
    subscribeMarker: PropTypes.func.isRequired,
    children: PropTypes.func,
  };

  componentDidMount() {
    const { unsubscribe } = this.props.subscribeMarker({
      type: TimelineMarkerType.Cursor,
      renderer: this.props.children,
    });
    this.unsubscribe = unsubscribe;
  }

  componentWillUnmount() {
    if (this.unsubscribe != null) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }
  render() {
    return null;
  }
}

// TODO: turn into HOC?
const CursorMarkerWrapper = (props) => {
  return (
    <TimelineMarkersConsumer>
      {({ subscribeMarker }) => (
        <CursorMarker subscribeMarker={subscribeMarker} {...props} />
      )}
    </TimelineMarkersConsumer>
  );
};

CursorMarkerWrapper.displayName = 'CursorMarkerWrapper';

export default CursorMarkerWrapper;
