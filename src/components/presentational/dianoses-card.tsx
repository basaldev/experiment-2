import React from 'react';
import { Card, CardContent } from '@material-ui/core';

export function DianosesCard(content:any){
  return (<Card>
    <CardContent>
      {content}
    </CardContent>
  </Card>)
}