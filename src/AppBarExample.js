import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';


function handleTouchTap() {
  //alert('onClick triggered on the title component');
}

const styles = {
  title: {
    cursor: 'pointer',
  },
};

/**
 * This example uses an [IconButton](/#/components/icon-button) on the left, has a clickable `title`
 * through the `onClick` property, and a [FlatButton](/#/components/flat-button) on the right.
 */
const AppBarExample = () => (
  <AppBar
    title={<span style={styles.title}>Data Visualization</span>}
    onTitleTouchTap={handleTouchTap}
    iconElementLeft={<IconButton tooltip="SVG Icon">
      <ActionHome />
    </IconButton>}
  />
);

export default AppBarExample;