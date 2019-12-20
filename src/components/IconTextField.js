import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { WhatsappShareButton, WhatsappIcon } from 'react-share';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  Typography
} from '@material-ui/core';
import School from '@material-ui/icons/School';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  card: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}));

const InputWithIcon = props => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <FormControl className={classes.margin}>
            <InputLabel htmlFor='input-with-icon-adornment'>
              Unique Room Code
            </InputLabel>
            <Input
              id='input-with-icon-adornment'
              value={props.value}
              startAdornment={
                <InputAdornment position='start'>
                  <School />
                </InputAdornment>
              }
            />
          </FormControl>
        </CardContent>
        <CardActions style={{ justifyContent: 'center' }}>
          <CopyToClipboard text={props.value}>
            <Button>Copy to Clipboard</Button>
          </CopyToClipboard>
          <WhatsappShareButton title='Room Code:' url={props.value}>
            <WhatsappIcon round={true} size={32} />
          </WhatsappShareButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default InputWithIcon;
