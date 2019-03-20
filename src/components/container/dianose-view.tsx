import * as React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { css } from 'emotion';
import { DoctorCard } from 'components/presentational/doctor-card';
import { DianosesCard } from 'components/presentational/diagnoses-card';

function NoData(dianosis: Array<any>) {
  if (dianosis.length === 0) {
    return (
      <Grid item>
        <Grid container>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            You haven’t saved a diagnosis yet.
          </Typography>
          <Typography align="center">Go to chat, and tell me your symptoms</Typography>
        </Grid>
      </Grid>
    );
  }
}

export function DianoseView(props: any) {
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
      {NoData(props.dianosis)}
      <Grid item>
        {props.dianosis.map(tile => {
          return (
            <div key={tile.id}>
              <Typography gutterBottom variant="h5" component="h2" align="center">
                Your Pre-diagnosis
              </Typography>
              {DianosesCard([{ Issue: tile.issue }], false)}
              <Typography variant="body1" component="p" align="center">
                Doctors who can help you
              </Typography>
              {DoctorCard(tile.doctor, false)}
            </div>
          );
        })}
      </Grid>
    </Grid>
  );
}
