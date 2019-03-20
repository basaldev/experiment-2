import * as React from 'react';
import { Typography, Button, Grid, Avatar } from '@material-ui/core';
import { css } from 'emotion';
import { onChangeCurrentUser } from 'domain/middleware/user';

function SampleUser({ user }) {
  return (
  <Grid item xs={12} key={user.name}>
    <Grid container alignItems="center" className={css`margin-bottom: 16px;`}>
      <Avatar className={css`background: deeppink;`} >{user.name[0]}</Avatar>
      <Button onClick={() => onChangeCurrentUser(user)} className={css`margin-left: 8px !important;`}>{user.name}</Button>
    </Grid>
  </Grid>
  );
}

export const Login = ({ sampleUsers }: { sampleUsers: Array<{ id: string, name: string, avatar: string, age: number }> }) => {
  return (
    <Grid container justify="center" alignItems="center" alignContent="center">
      <Grid item className={css`padding-top: 20vh;`}>
        <Typography align="center" variant="body2" className={css`margin-bottom: 24px !important;`}>
          Select Sample User
        </Typography>
        {sampleUsers.map(user => <SampleUser key={user.id} user={user}/>)}
      </Grid>
    </Grid>
  );
};
