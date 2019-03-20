import * as React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { css } from 'emotion';

interface Props {
  treatment: any;
}

export class DoctorView extends React.Component<Props, {}> {
  render() {
    const { treatment } = this.props;
    return (
      <Grid
        container
        direction="column"
        className={css`
          padding: 16px;
        `}
      >
        <Typography gutterBottom variant="h5" component="h2" align="center">
          Treatments Prescribed
        </Typography>
        {treatment ? (
          <>
            <div>Treatment ID: {treatment.id}</div>
            <div>Diagnosis: {treatment.diagnosis}</div>
            <div>Patient: {treatment.patient.name}</div>
            <div>{treatment.prescription}</div>
            <div>
              Prescription:
              <input type="text" />
            </div>
          </>
        ) : (
          <p>No treatments prescribed yet</p>
        )}
      </Grid>
    );
  }
}
