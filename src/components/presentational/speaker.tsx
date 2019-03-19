import React from 'react';
import { css } from 'emotion';
import { Avatar } from '@material-ui/core';
import { colors } from 'assets/colors';
export function Speaker(show: boolean, UserIcon) {
  return (
    <Avatar className={css`
    && {
          color: #fff;
          height: 60px;
          width: 60px;
          background-color: ${colors.botAvatar};
          visibility: ${!show ? 'hidden' : ''};
    }
        `}>
      {UserIcon}
    </Avatar>
  )
}
