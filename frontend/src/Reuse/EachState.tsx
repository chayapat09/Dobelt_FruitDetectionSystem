import React from 'react';
// import RadioButtonUncheckedSharpIcon from '@material-ui/icons/RadioButtonUncheckedSharp';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { makeStyles } from '@material-ui/core/styles';

const greenColor: string = '#A9E29B';
const redColor: string = '#EE6041';
const iconSize: number = 50

const EachState = (props: any) => {

    const useStyles = makeStyles({
        iconStyle: {
            color: props.value == 1 ? greenColor: redColor,
            width: iconSize,
            height: iconSize
        },
    })

    const classes = useStyles();  

    return (
        <div>
            <p style={{ display: 'inline-block',
                         margin: 20,
                         marginLeft: 50,
                         fontSize: 20                         
                }}>{props.name}
            </p>
            <FiberManualRecordIcon className={classes.iconStyle} />
            <br />
        </div>
    )
}

export default EachState;
