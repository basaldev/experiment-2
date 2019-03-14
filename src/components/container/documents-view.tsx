import * as React from 'react';
import { Grid, GridList, Paper, GridListTile, GridListTileBar, IconButton }  from '@material-ui/core';
import { css } from 'emotion';


export function FileCard(tile:any) {
  return (
  <GridListTile key={tile.img} cols={tile.cols || 1} className={css`
            border-radius: 10px;
          `}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.author}</span>}
              actionIcon={
                <IconButton >
                  I
                </IconButton>
              }
            />
      </GridListTile>
  )
}
export function DataCard(tile:any){
  return (
    <GridListTile key={tile.img} cols={tile.cols || 1} className={css`
    border-radius: 10px;
  `}>
  <Paper className={css` && { background: green; padding: 16px; text-align:center; }`}>
    <Grid container direction="column" justify="center">
      <Grid item alignContent="center">cholesterol</Grid>
      <Grid item alignContent="center">10</Grid>
    </Grid>
  </Paper>
  </GridListTile>
  )
}

export function DocumentsView(props:any) {
  return (
    <Grid container direction="row">
      <GridList cellHeight={160} className={css`
        max-width: 100%;
        height: 90vh;
      `} cols={3}>
        {props.documents.map(tile => FileCard(tile))}
      </GridList>
    </Grid>
  )
}