import React from 'react';
import { Grid } from '@material-ui/core';
import { Speaker } from 'components/presentational/speaker';
import { AccountCircle, Category } from '@material-ui/icons';

export function Message(direction: any, showSpeaker: boolean, content: any, speaker: string) {
  let icon;
  if(speaker === 'BOT'){
    icon = <Category />
  } else {
    icon = <AccountCircle />
  }
  return (
    <Grid container key={content + Math.random()} spacing={16} direction={direction} wrap="nowrap">
      <Grid item>{Speaker(showSpeaker, icon)}</Grid>
      <Grid item>{content}</Grid>
    </Grid>
  )
}