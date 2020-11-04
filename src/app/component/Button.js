import React from 'react'
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles'

const useStyle = makeStyles(
    {
        root: {
            background: 'linear-gradient(45deg, #4c5154 30%, #181d21 90%)',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .5)',
            color: 'white',
            height: 48,
            padding: '0 30px',
          },
    }
)


export default function Buttons(props)  {
    const classes = useStyle();
    return <Button onClick={props.function} className={classes.root}>{props.text}</Button>;
        
}

