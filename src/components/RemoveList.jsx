import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {AiFillDelete} from 'react-icons/ai';

const RemoveList = ({movie, movieSearch, handleDelete}) => {
  return (
    <>
    <div className='remove-list'>
    {
      movie.filter(val => val.Title.toLowerCase().includes(movieSearch)
      ).map((movies, id) => {
        return (
          <Card className='remove-cards' key={id}
          onClick={() => (handleDelete(movies))}
          >
            <CardMedia
            component='img'
            alt='movies'
            image={movies.Poster}
            className='movies-poster'
            />

          <CardContent>
            <Typography>
              {movies.Title}
            </Typography>
            <Typography>
              {movies.Year}
            </Typography>
          </CardContent>

          <CardActions>
            <Button style={{margin: '0px 30px', color: 'red', fontSize: '1.5rem'}}>
             <AiFillDelete />
            </Button>
          </CardActions>
          </Card>
        )
      })
    }
    </div>
    </>
  )
}

export default RemoveList