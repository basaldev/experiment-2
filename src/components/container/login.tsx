import * as React from 'react';
import { Typography, Button, Grid, Avatar } from '@material-ui/core';
import { css } from 'emotion';
import { onChangeCurrentUser } from 'domain/middleware/user';
import * as LogoImg from 'assets/logo.png';

function SampleUser({ user }) {
  return (
    <Grid item xs={12} key={user.name}>
      <Grid
        container
        alignItems="center"
        justify="center"
        className={css`
          margin-bottom: 16px;
        `}
      >
      <Grid item>
        <Avatar
        className={css`
        && {
          color: #fff;
          height: 60px;
          width: 60px;
        }
        `}
        ><img className={css`
          height: 100%;
          width: auto;
        `
        } src={user.avatar}></img></Avatar>
        </Grid>
        <Grid item xs={12}>
        <Button
          variant="contained"
          onClick={() => onChangeCurrentUser(user)}
          className={css`
          && {
            margin:8px auto;
            display:block;
          }
          `}
        >
          {user.name}
        </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export const Login = ({
  sampleUsers,
}: {
  sampleUsers: Array<{ id: string; name: string; avatar: string; age: number }>;
}) => {
  return (
    <Grid container justify="center" alignItems="center" alignContent="center">
      <Grid
        item
        className={css`
          height: 90vh;
        `}
      >
        <Grid container justify="center" alignItems="center" alignContent="center" className={css`
          height: 100%;
        `}>
          <div
            className={css`
              text-align: center;
            `}
          >
            <img src={LogoImg} width="200" />
            <Typography
              align="center"
              className={css`
                padding: 30px 0;
              `}
            >
              Select Sample User
            </Typography>
          </div>
          {sampleUsers.map(user => <SampleUser key={user.id} user={user} />)}
        </Grid>
      </Grid>
    </Grid>
  );
};
