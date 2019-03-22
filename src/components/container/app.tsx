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
  getCurrentPatient,
  getUser,
  getSampleUsers,
  getNavbar,
  getDoctors
} from 'domain/store/selectors/main';
import { Grid } from '@material-ui/core';
import { Navbar } from 'components/presentational/navbar';
import { ChatView } from 'components/container/chat-view';
import { DocumentsView } from 'components/container/documents-view';
import { DiagnoseView } from 'components/container/diagnose-view';
import { ActionsView } from 'components/container/actions-view';
import { DoctorView } from 'components/container/doctor-view';
import { navigate, NAVBARS } from 'domain/middleware/router';
import { css } from 'emotion';
import { Login } from './login';

const lexruntime = new window['AWS'].LexRuntime();

export function App() {
  const content = (pageName => {
    switch (pageName) {
      case 'HOME_PAGE':
        return (
          <ChatView
            messages={getMessages()}
            textInput={getInputText()}
            lexruntime={lexruntime}
            user={getUser()}
            sessionAttributes={getSessionAttributes()}
          />
        );
      case 'SECOND_PAGE':
        return <DocumentsView documents={getDocuments()} user={getUser()} />;
      case 'THIRD_PAGE':
        return <DiagnoseView dianosis={getDianosis()} />;
      case 'FOURTH_PAGE':
        return <ActionsView dianosis={getDianosis()} doctors={getMyDoctors()} patient={getUser()} />;
      case 'LOGIN_PAGE':
        return <Login sampleUsers={getSampleUsers()} />;
      case 'DOCTOR_PAGE':
        return <DoctorView doctor={getDoctors()[getUser().doctorId]} documents={getDocuments()} user={getUser()} />;
      case 'ADD_TREATMENT_PAGE':
        return <DoctorView treatment={getTreatment()} documents={getDocuments()} user={getUser()} />;
      case 'SINGLE_PATIENT_PAGE':
      return <DocumentsView documents={getDocuments()} user={getCurrentPatient()} />;
      default:
        return <p>Page not found</p>;
    }
  })(currentPage().name);

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
          ${currentPage().name  === 'LOGIN_PAGE' ? 'visibility:hidden;' : ''}
        `}
      >
        <Navbar
          value={currentPage().value}
          routes={NAVBARS[getNavbar()]}
        />
      </Grid>
    </Grid>
  );
}
