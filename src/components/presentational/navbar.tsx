import * as React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import Assignment from '@material-ui/icons/Assignment';
import AssignmentLate from '@material-ui/icons/AssignmentLate';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import ChatIcon from '@material-ui/icons/Chat';

const icons = {
  'ChatIcon': <ChatIcon />,
  'Assignment': <Assignment />,
  'AssignmentLate': <AssignmentLate />,
  'AssignmentInd': <AssignmentInd />,
}

import { css } from 'emotion';
export function Navbar(props: any) {
  return (
    <BottomNavigation value={props.value} showLabels>
      {props.routes.map(item => {
        return <BottomNavigationAction key={item.label} onClick={item.route} label={item.label} icon={icons[item.icon]} />
      })}
    </BottomNavigation>
  );
}
