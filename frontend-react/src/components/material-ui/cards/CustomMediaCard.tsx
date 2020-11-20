import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

interface Props {
  title: string,
  content: JSX.Element,
  image: string,
  imageTitle: string,
  buttonLabel: string,
  onClickHandler?: () => void
}

export const CustomMediaCard: React.FC<Props> = ({ title, content, image, imageTitle, buttonLabel, onClickHandler }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title={imageTitle}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>{title}</Typography>
          {content}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='medium' variant='outlined' color='primary' onClick={onClickHandler}>{buttonLabel}</Button>
      </CardActions>
    </Card>
  );
}