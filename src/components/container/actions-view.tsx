import * as React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { css } from 'emotion';
import { DoctorCard } from 'components/presentational/doctor-card';

export function ActionsView(props: any) {
  const { diagnosis, patient } = props;
  return (
    <Grid
      container
      direction="column"
      className={css`
        padding: 16px;
      `}
    >
      <Typography gutterBottom variant="h5" component="h2" align="center">
        Your Treatment
      </Typography>
      {props.doctors.map(doctor => DoctorCard(doctor, true))}
    </Grid>
  );
}
