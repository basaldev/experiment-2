import {
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  CardContent,
  Card,
  CardActions,
  Typography,
  CardMedia
} from '@material-ui/core';
import TickIcon from '@material-ui/icons/Check';
import { css } from 'emotion';
import React from 'react';
import { saveDoctor, saveTreatment } from 'domain/middleware/user';
import { getDianosis, getUser } from 'domain/store/selectors/main';

function expandedSection() {
  return (
  <CardContent className={css`&&& { color:rgba(0,0,0,0.9) !important; }}`}>
      <List component="nav">
        <ListItem>
          <ListItemText primary="Medicine A" className={css`&&& { color:rgba(0,0,0,0.9) !important; }}`} />
        </ListItem>
        <Divider />
        <ListItem divider>
          <ListItemText primary="Medicine B" className={css`&&& { color:rgba(0,0,0,0.9) !important; }}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Daily for 3 weeks" className={css`&&& { color:rgba(0,0,0,0.9) !important; }}`} />
        </ListItem>
      </List>
    </CardContent>
  );
}

export function DoctorCard(doctor: any, expanded: boolean) {
  const expandedContent = expanded ? expandedSection() : '';
  return (
    <Card key={doctor.id}>
      <CardMedia
        className={css`
          min-height: 30vh;
        `}
        image={doctor.img}
        title={doctor.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {doctor.name} <Chip color="primary" label="Covered by Insurance" icon={<TickIcon />} />
        </Typography>
        <Typography component="p">MD. General Practitioner.</Typography>
      </CardContent>
      {expandedContent}
      {!expanded && (
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              saveDoctor(doctor);
              saveTreatment(getDianosis(), doctor, getUser(), '');
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
      )}
    </Card>
  );
}
