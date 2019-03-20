import React from 'react';
import {
  currentPage,
  getMessages,
  getDocuments,
  getSessionAttributes,
  getDianosis,
  getTreatment,
  getInputText,
  getMyDoctors,
  getUser,
  getSampleUsers
} from 'domain/store/selectors/main';
import { Grid } from '@material-ui/core';
import { Navbar } from 'components/presentational/navbar';
import { ChatView } from 'components/container/chat-view';
import { DocumentsView } from 'components/container/documents-view';
import { DianoseView } from 'components/container/dianose-view';
import { ActionsView } from 'components/container/actions-view';
import { DoctorView } from 'components/container/doctor-view';
import { navigate } from 'domain/middleware/router';
import { css } from 'emotion';
import { Login } from './login';

const lexruntime = new window['AWS'].LexRuntime();

export function App() {
  const user = getUser();

  const content = (pageName => {
    switch (pageName) {
      case 'HOME_PAGE':
        return (
          <ChatView
            messages={getMessages()}
            textInput={getInputText()}
            lexruntime={lexruntime}
            sessionAttributes={getSessionAttributes()}
          />
        );
      case 'SECOND_PAGE':
        return <DocumentsView documents={getDocuments()} user={getUser()} />;
      case 'THIRD_PAGE':
        return <DianoseView dianosis={getDianosis()} />;
      case 'FOURTH_PAGE':
        return <ActionsView dianosis={getDianosis()} doctors={getMyDoctors()} patient={getUser()} />;
      case 'LOGIN_PAGE':
        return <Login sampleUsers={getSampleUsers()} />;
      default:
        return <p>Page not found</p>;
    }
  })(currentPage().name);

  if (user.role === 'doctor') {
    return <DoctorView treatment={getTreatment()} />;
  }

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        className={css`
          height: 90vh;
          overflow: scroll;
        `}
      >
        {content}
      </Grid>
      <Grid
        item
        xs={12}
        className={css`
          border-top: 1px solid #efefef;
        `}
      >
        <Navbar
          value={currentPage().value}
          routes={[
            e => {
              navigate('/', e);
            },
            e => {
              navigate('/2', e);
            },
            e => {
              navigate('/3', e);
            },
            e => {
              navigate('/4', e);
            }
          ]}
        />
      </Grid>
    </Grid>
  );
}
