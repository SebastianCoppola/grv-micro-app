import React from 'react';
import PropTypes from 'prop-types';
//material-ui
import Avatar from '@material-ui/core/Avatar';
//estilo
import { makeStyles, createStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

const CustomAvatar = (props) => {
    const {alt, src , className, style, variant} = props;
    const classes = useStyles(props);
    return (
        <div className={classes.root}>
            <Avatar alt={alt} src={src} className={className} variant={variant} style={style}/>
        </div>
    )
}
CustomAvatar.propTypes = {
    alt:PropTypes.string,
    src:PropTypes.string,
    className:PropTypes.any,
    variant:PropTypes.string,
    style:PropTypes.any,
};

export default CustomAvatar
