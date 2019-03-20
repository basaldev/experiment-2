import React from 'react';
import { Chip, Button, CardContent, Card, CardActions, Typography } from '@material-ui/core';
import { saveDianoses } from 'domain/middleware/user';
import { css } from 'emotion';

export function DianosesCard(content: any, showSaveButton: boolean) {
  const issues = content.map(tile => {
    const { Issue } = tile;
    const Action = showSaveButton ? (
      <CardActions>
        <Button size="small" color="primary" onClick={() => saveDianoses(Issue)}>
          Save pre-diagnosis
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
            <Chip color="primary" label={`${Math.round(Issue.Accuracy)}%`} /> {Issue.Name}{' '}
          </Typography>
          <Typography component="p">{Issue.IcdName}</Typography>
        </CardContent>
        {Action}
      </Card>
    );
  });
  return <>{issues}</>;
}
