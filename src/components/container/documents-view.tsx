import * as React from 'react';
import { GridList, GridListTile }  from '@material-ui/core';
import { css } from 'emotion';

const tileData = [
  {
    img: `https://picsum.photos/200/300/?random`,
    title: 'Image',
    author: 'author',
    cols: 3,
  },
  {
    img: `https://picsum.photos/500/200/?random`,
    title: 'Image',
    author: 'author',
    cols: 1,
  },
  {
    img: `https://picsum.photos/430/470/?random`,
    title: 'Image',
    author: 'author',
    cols: 2,
  },
  {
    img: `https://picsum.photos/100/300/?random`,
    title: 'Image',
    author: 'author',
    cols: 3,
  },
  {
    img: `https://picsum.photos/900/200/?random`,
    title: 'Image',
    author: 'author',
    cols: 1,
  },
  {
    img: `https://picsum.photos/450/454/?random`,
    title: 'Image',
    author: 'author',
    cols: 2,
  },
]

export function DocumentsView(props:any) {
  return (

      <GridList cellHeight={160} className={css`
        width: 500;
        height: 450;
      `} cols={3}>
        {tileData.map(tile => (
          <GridListTile key={tile.img} cols={tile.cols || 1} className={css`
            border-radius: 10px;
          `}>
            <img src={tile.img} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
  )
}