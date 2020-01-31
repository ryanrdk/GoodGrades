import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { WhatsappShareButton } from 'react-share';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardContent,
  Input,
  InputLabel,
  InputAdornment,
  FormControl
} from '@material-ui/core';
import { FileCopyOutlined, School } from '@material-ui/icons';

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
  },
  copyButton: {
    paddingRight: 12
  },
  whatsappButton: {
    marginRight: 16
  }
}));

const InputWithIcon = props => {
  const classes = useStyles();

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
        <CardActions style={{ float: 'right' }}>
          <CopyToClipboard className={classes.copyButton} text={props.value}>
            <FileCopyOutlined style={{ height: 32, width: 32 }} />
          </CopyToClipboard>
          <WhatsappShareButton
            className={classes.whatsappButton}
            title='Room Code:'
            url={props.value}>
            <svg
              id='Bold'
              height='30'
              viewBox='0 0 24 24'
              width='30'
              xmlns='http://www.w3.org/2000/svg'>
              <path d='m17.507 14.307-.009.075c-2.199-1.096-2.429-1.242-2.713-.816-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.293-.506.32-.578.878-1.634.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.576-.05-.997-.042-1.368.344-1.614 1.774-1.207 3.604.174 5.55 2.714 3.552 4.16 4.206 6.804 5.114.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345z' />
              <path d='m20.52 3.449c-7.689-7.433-20.414-2.042-20.419 8.444 0 2.096.549 4.14 1.595 5.945l-1.696 6.162 6.335-1.652c7.905 4.27 17.661-1.4 17.665-10.449 0-3.176-1.24-6.165-3.495-8.411zm1.482 8.417c-.006 7.633-8.385 12.4-15.012 8.504l-.36-.214-3.75.975 1.005-3.645-.239-.375c-4.124-6.565.614-15.145 8.426-15.145 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99z' />
            </svg>
          </WhatsappShareButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default InputWithIcon;
