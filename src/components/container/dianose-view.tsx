import * as React from 'react';
import { Grid, GridList, Button, GridListTile, CardContent, Card, CardActions, Typography, CardActionArea, CardMedia }  from '@material-ui/core';
import { css } from 'emotion';
import { DoctorCard } from 'components/presentational/doctor-card';
import { DianosesCard } from 'components/presentational/dianoses-card';

function NoData(dianosis: Array<any>){
  if(dianosis.length === 0) {
   return (
    <Grid item >
    <Grid container>
    <Typography gutterBottom variant="h5" component="h2" align="center">
                No Dianosis yet
    </Typography>
    </Grid>
    </Grid>
   )
  }
}

export function DianoseView(props:any) {
  return (
    <Grid container direction="column" justify="center" spacing={8} className={css`
      padding: 16px;
      min-height: 50vh;
    `}>
    {NoData(props.dianosis)}
    <Grid item >
    {props.dianosis.map(tile => {
      return (<>
      {DianosesCard([{Issue: tile.issue}], false)}
      {DoctorCard(tile.doctor, false)}
      </>)
    })}
    </Grid>
    </Grid>
  )
}