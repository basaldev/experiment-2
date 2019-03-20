import * as React from 'react';
import { Grid, InputBase, Paper, IconButton } from '@material-ui/core';
import { css } from 'emotion';
import { updateInputText } from 'domain/store/reducers/main'; //TODO move to user middleware;
import SendIcon from '@material-ui/icons/Send';
import { onKeyPressUpdateInputText, pushChat } from 'domain/middleware/user';
export class MessageInput extends React.Component {
  props: {
    sessionAttributes: any;
    textInput: string;
    lexruntime: any;
    scrollContainer: any;
    className?: any;
  }
  state: {
    inputRef: any;
  }
  constructor(props) {
    super(props);
    this.state = {
      inputRef: null
    };
  }
  render() {
    return (
        <Grid container direction="row" justify="space-between" className={css`
       border-top: 1px solid #efefef;
      `}>
          <Grid item xs={10}>
            <InputBase className={css`
            && {
          padding: 8px;
          width: 100%;
          line-height: 30px;
            }
        `} onKeyUp={(e) => {
                this.setState({ inputRef: onKeyPressUpdateInputText(e) });
              }} placeholder="Send a message" />
          </Grid>
          <Grid item>
            <IconButton className={css`height:100%;`}color="primary" onClick={() => {
              if (this.props.textInput !== '') {
                pushChat(
                  this.props.textInput,
                  this.props.lexruntime,
                  this.props.sessionAttributes,
                );
                updateInputText('');
                this.state.inputRef.value = '';
              }
            }}>
              <SendIcon />
            </IconButton>
          </Grid>
        </Grid>
    )
  }
}