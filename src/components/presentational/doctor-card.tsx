import {
  Grid,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  GridListTile,
  CardContent,
  Card,
  CardActions,
  Typography,
  CardActionArea,
  CardMedia,
} from '@material-ui/core';
import TickIcon from '@material-ui/icons/Check';
import { css } from 'emotion';
import React from 'react';
import { saveDoctor } from 'domain/middleware/user';

function expandedSection() {
  return (
    <CardContent>
      <List component="nav">
        <ListItem>
          <ListItemText primary="Medicine A" />
        </ListItem>
        <Divider />
        <ListItem divider>
          <ListItemText primary="Medicine B" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Daily for 3 weeks" />
        </ListItem>
      </List>
    </CardContent>
  );
}

export function DoctorCard(tile: any, expanded: boolean) {
  const expandedContent = expanded ? expandedSection() : '';
  return (
    <Card key={tile.name + Math.random()}>
      <CardMedia
        className={css`
          min-height: 30vh;
        `}
        image={tile.img}
        title={tile.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {tile.name} <Chip color="primary" label="Covered by Issurance" icon={<TickIcon />} />
        </Typography>
        <Typography component="p">
          During our last vist I prescripted Medicine A and B for your back pain, <strong>daily for 3 weeks</strong>
        </Typography>
      </CardContent>
      {expandedContent}
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            saveDoctor(tile);
          }}
        >
          Book an Appointment
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            window.open('tel:900300400');
          }}
        >
          Call
        </Button>
      </CardActions>
    </Card>
  );
}
