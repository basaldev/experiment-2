import * as React from 'react';
import { Grid, GridList, Button, GridListTile, CardContent, Card, CardActions, Typography, CardActionArea, CardMedia }  from '@material-ui/core';
import { css } from 'emotion';
import { DoctorCard } from 'components/presentational/doctor-card';
import { DianosesCard } from 'components/presentational/dianoses-card';

function NoData(dianosis: Array<any>){
  if(dianosis.length === 0) {
   return (
    <Grid item >
    <Typography gutterBottom variant="h5" component="h2">
                No Dianosis yet
    </Typography>
    </Grid>
   )
  }
}

export function DianoseView(props:any) {
  debugger
  return (
    <Grid container direction="column" spacing={8} className={css`
      padding: 16px;
    `}>
    {NoData(props.dianosis)}
    <Grid item >
    {props.dianosis.map(tile => {
      return (<>
      {DianosesCard([{Issue: tile.issue}])}
      {DoctorCard(tile.doctor, false)}
      </>)
    })}
    </Grid>
    </Grid>
  )
}