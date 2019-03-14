import * as React from 'react';
import { Grid,
    CardHeader,
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
    CardMedia } from '@material-ui/core';
import { css } from 'emotion';
export function ActionsView(props: any) {
  return (
    <Grid container direction="column" className={css`
      padding: 16px;
    `}>
      {props.doctors.map(tile => (
        <Card key={tile.img + Math.random()} >
          <CardActionArea>
            <CardMedia
              image="https://images.unsplash.com/photo-1552525741-53f2afa46e0c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Docotor Lizard
          </Typography>
              <Typography component="p">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica
          </Typography>
            </CardContent>
            <CardContent>
              <CardHeader>Scripts:</CardHeader>
              <List component="nav" >
                <ListItem button>
                  <ListItemText primary="Inbox" />
                </ListItem>
                <Divider />
                <ListItem button divider>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Trash" />
                </ListItem>
                <Divider light />
                <ListItem button>
                  <ListItemText primary="Spam" />
                </ListItem>
              </List>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
        </Button>
            <Button size="small" color="primary">
              Learn More
        </Button>
          </CardActions>
        </Card>
      ))}
    </Grid>
  )
}