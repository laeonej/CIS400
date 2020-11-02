import React from 'react'
import Button from '@material-ui/core/Button';
// import {makeStyles} from '@material-ui/core/styles'

// const useStyle = makeStyles(
//     {
//         root: {
//             size: 'medium',
//             variant: 'contained',
//             color: 'primary'
//         }
//     }
// )


export default class Buttons extends React.Component {

    render() {
        return (
            <Button variant='contained' color='primary'>{this.props.name}</Button>
        )
    }
}