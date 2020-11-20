import { Grid, Typography } from '@material-ui/core';
import QRCode from 'qrcode.react';
import React from 'react';
import { appConstants as c } from '../app';
import { CustomMediaCard } from '../components/material-ui/cards';
import { parseTemplate } from './main-util';

/**
 * generate grid with mediaCard quickButtons from arbitrary data query
 */
export const generateMediaCardQuickButton = (data: any[], classes: any, startPic: number, titleTemplate: string, description: string): JSX.Element => {
  const gridContent = (data.map((e: any, index: number) => {
    const onClickHandler = () => { console.log(`mediaCard id: ${e.id}`); };
    return (
      <Grid item xs={6} md={4} lg={3} key={index}>
        <CustomMediaCard
          title={parseTemplate(titleTemplate, e)}
          content={(
            <Grid container spacing={3} className={classes.spacerTop}>
              <Grid item sm={8}><Typography>{description}</Typography></Grid>
              <Grid item sm={4}><QRCode size={50} value={e.id} /></Grid>
            </Grid>
          )}
          image={`https://picsum.photos/id/${startPic + index}/400/300`}
          imageTitle={e.fiscalNumber}
          buttonLabel={`${c.I18N.donate} ${index + 1}€`}
          onClickHandler={onClickHandler}
          />
      </Grid>
    )
  }));
  return (<Grid container spacing={3}>{gridContent}</Grid>)
}