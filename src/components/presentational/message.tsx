import React from 'react';
import { Grid, Avatar } from '@material-ui/core';
import { Speaker } from 'components/presentational/speaker';
import Favorite from '@material-ui/icons/Favorite';
import { css } from 'emotion';
import { user1 } from '../../assets/user1';
export function Message(direction: any, showSpeaker: boolean, content: any, speaker: string) {
  let icon;
  if(speaker === 'BOT'){
    icon = <Favorite />
  } else {
    icon = <img className={css`height: 100%;`} src={user1}></img>
  }
  return (
    <Grid container key={content + Math.random()} spacing={16} direction={direction} wrap="nowrap" className={css`
      max-width:100%;
    `}>
      <Grid item>{Speaker(showSpeaker, icon)}</Grid>
      <Grid item>{content}</Grid>
    </Grid>
  )
}