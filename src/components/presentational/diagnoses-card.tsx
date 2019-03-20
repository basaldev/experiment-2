import React from 'react';
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
import { saveDianoses } from 'domain/middleware/user';
import { css } from 'emotion';

<<<<<<< HEAD:src/components/presentational/diagnoses-card.tsx
export function DiagnosesCard(content: any, showSaveButton: boolean) {
  const issues = content.map((tile) => {
=======
export function DianosesCard(content: any, showSaveButton: boolean) {
  const issues = content.map(tile => {
>>>>>>> 88c752fa76f7c66ffc6df38e4e53de56f1d4188f:src/components/presentational/dianoses-card.tsx
    const { Issue } = tile;
    const Action = showSaveButton ? (
      <CardActions>
        <Button size="small" color="primary" onClick={() => saveDianoses(Issue)}>
          Save pre-dianoses
        </Button>
      </CardActions>
    ) : null;

    return (
      <Card
        key={Issue.Name}
        className={css`
          margin-bottom: 8px;
        `}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            <Chip color="primary" label={`${Issue.Accuracy}%`} /> {Issue.Name}{' '}
          </Typography>
          <Typography component="p">{Issue.IcdName}</Typography>
        </CardContent>
        {Action}
      </Card>
    );
  });
  return <>{issues}</>;
}
