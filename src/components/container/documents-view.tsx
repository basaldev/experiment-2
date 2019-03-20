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
import { onClickUploadDocument } from 'domain/middleware/user';
import { css } from 'emotion';

export function FileCard(tile: any) {
  return (
    <Grid item xs={6} key={tile.url}>
      <Card
        className={css`
          width: 100%;
        `}
      >
      <Typography align="center" gutterBottom variant="body1">
         Your Medical Profile
        </Typography>
        <CardActionArea>
          <CardMedia
            className={css`
              height: 160px;
            `}
            image={tile.img}
            title={tile.title}
          />
          <CardContent>
            <Typography gutterBottom variant="body1" component="h2">
              {tile.title}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            View Document
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export function DocumentsView(props: any) {
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
            height: 64px;
            width: 64px;
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
        <Button className={css` && { margin:0 auto; display:block; }`} onClick={onClickUploadDocument} variant="contained" color="primary" >Upload Documents</Button>

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
      <Typography align="center" gutterBottom variant="body1">
          Upload documents for a more personalised diagonsis.
        </Typography>
        {props.documents.map(tile => FileCard(tile))}
      </Grid>
    </Grid>
  );
}
