import * as React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { css } from 'emotion';
import { DoctorCard } from 'components/presentational/doctor-card';

function NoData(array: Array<any>) {
  if (array.length === 0) {
    return (
      <Grid item>
        <Grid container direction="column" alignContent="center" className={css`text-align:center;`}>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            You haven't connected with any doctors yet.
          </Typography>
          </Grid>
          <Grid item xs={12}>
          <Typography align="center">You can add a doctor from Diagnose Tab</Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Typography gutterBottom variant="h5" component="h2" align="center">Your Treatments</Typography>
    )
  }
}

export function ActionsView(props: any) {
  const { diagnosis, patient } = props;
  return (
    <Grid
      container
      direction="column"
      justify="center"
      spacing={8}
      className={css`
        padding: 16px;
        min-height: 50vh;
      `}
    >

      {NoData(props.doctors)}
      <Grid item>
        {props.doctors.map(tile => DoctorCard(tile, true))}
      </Grid>
    </Grid>
  );
}
