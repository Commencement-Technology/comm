// @flow

import type { AppState, UpdateStore } from './redux-reducer';

import React from 'react';
import { connect } from 'react-redux';
import update from 'immutability-helper';

import fetchJSON from './fetch-json';
import LogInModal from './modals/account/log-in-modal.react';
import RegisterModal from './modals/account/register-modal.react';
import UserSettingsModal from './modals/account/user-settings-modal.react.js';
import { monthURL } from './nav-utils';
import { mapStateToUpdateStore } from './redux-utils';
import history from './router-history';

type Props = {
  monthURL: string,
  loggedIn: bool,
  username: string,
  updateStore: UpdateStore,
  setModal: (modal: React.Element<any>) => void,
  clearModal: () => void,
};

class AccountBar extends React.Component {

  props: Props;

  render() {
    if (this.props.loggedIn) {
      return (
        <div className="nav-button">
          {"logged in as "}
          <span className="username">{this.props.username}</span>
          <div className="nav-menu">
            <div>
              <a
                href="#"
                onClick={this.onLogOut.bind(this)}
              >Log out</a>
            </div>
            <div>
              <a
                href="#"
                onClick={this.onEditAccount.bind(this)}
              >Edit account</a>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="nav-button">
          <a
            href="#"
            onClick={this.onLogIn.bind(this)}
          >Log in</a>
          {" · "}
          <a
            href="#"
            onClick={this.onRegister.bind(this)}
          >Register</a>
        </div>
      );
    }
  }

  async onLogOut(event: SyntheticEvent) {
    event.preventDefault();
    const response = await fetchJSON('logout.php', {});
    if (response.success) {
      this.props.updateStore((prevState: AppState) => update(prevState, {
        calendarInfos: { $set: response.calendar_infos },
        email: { $set: "" },
        loggedIn: { $set: false },
        username: { $set: "" },
        emailVerified: { $set: false },
      }));
      // TODO fix this special case of default calendar 254
      history.replace(`calendar/254/${this.props.monthURL}`);
    }
  }

  onEditAccount(event: SyntheticEvent) {
    event.preventDefault();
    this.props.setModal(
      <UserSettingsModal
        onClose={this.props.clearModal}
        setModal={this.props.setModal}
      />
    );
  }

  onLogIn(event: SyntheticEvent) {
    event.preventDefault();
    this.props.setModal(
      <LogInModal
        onClose={this.props.clearModal}
        setModal={this.props.setModal}
      />
    );
  }

  onRegister(event: SyntheticEvent) {
    event.preventDefault();
    this.props.setModal(
      <RegisterModal
        onClose={this.props.clearModal}
        setModal={this.props.setModal}
      />
    );
  }

}

AccountBar.propTypes = {
  monthURL: React.PropTypes.string.isRequired,
  loggedIn: React.PropTypes.bool.isRequired,
  username: React.PropTypes.string.isRequired,
  updateStore: React.PropTypes.func.isRequired,
  setModal: React.PropTypes.func.isRequired,
  clearModal: React.PropTypes.func.isRequired,
};

export default connect(
  (state: AppState) => ({
    monthURL: monthURL(state),
    loggedIn: state.loggedIn,
    username: state.username,
  }),
  mapStateToUpdateStore,
)(AccountBar);
