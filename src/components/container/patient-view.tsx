import * as React from 'react';
import {
  Grid,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Fab,
  Avatar,
  Typography,
} from '@material-ui/core';
import BackUp from '@material-ui/icons/Backup';
import { onClickUploadDocument, onClickViewPatient } from 'domain/middleware/user';
import { css } from 'emotion';

export function PatientCard(tile: any) {
  console.log(tile)
  return (
    <Grid item xs={4} key={tile.url} alignContent="center">
    <Grid container direction="column" justify="center">
    <Grid item>
          <Avatar
            className={css`
             && { width:100%; height:auto; margin-bottom: 32px;}
            `}
            src={tile.avatar}
            title={tile.name}
          />
          </Grid>
            <Typography gutterBottom variant="body1" component="h2" align="center">
            {tile.name}
            </Typography>
          <Button onClick={() => onClickViewPatient(tile)} size="small" color="primary">
            View Patient
          </Button>
          </Grid>
    </Grid>
  );
}

export function DoctorView(props: any) {
  return (
    <Grid container justify="center">
      <Grid
        item
        xs={12}
        className={css`
          position: relative;
          z-index: 999;
          padding: 16px;
          border-bottom: 1px solid #efefef;
          background: #fff;
        `}
      >
        <Avatar
          className={css`
          && {
            height: 100px;
            width: 100px;
            margin: 64px auto 12px auto;
          }
          `}
        >
          <img  className={css`
          height: 100%;
          text-align:center;
        `}
        src={props.user.avatar} />
        </Avatar>
        <Typography color="textPrimary" variant="h6" align="center">
          {props.user.name}
        </Typography>
        <Button className={css` && { margin:0 auto; display:block; }`} onClick={onClickUploadDocument} variant="contained" color="primary" >Add a patient</Button>
      </Grid>
      <Grid
        container
        spacing={16}
        className={css`
          padding: 16px;
          height: 52vh;
          overflow-y: scroll;
        `}
      >
        {props.doctor.patients.map(tile => PatientCard(tile))}
      </Grid>
    </Grid>
  );
}
