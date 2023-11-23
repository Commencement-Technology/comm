// @flow

import * as React from 'react';

import { cookieSelector } from 'lib/selectors/keyserver-selectors.js';
import { isLoggedIn } from 'lib/selectors/user-selectors.js';
import { ashoatKeyserverID } from 'lib/utils/validation-utils.js';

import { logInActionType, logOutActionType } from './action-types.js';
import ModalPruner from './modal-pruner.react.js';
import NavFromReduxHandler from './nav-from-redux-handler.react.js';
import { useIsAppLoggedIn } from './nav-selectors.js';
import { NavContext, type NavAction } from './navigation-context.js';
import PolicyAcknowledgmentHandler from './policy-acknowledgment-handler.react.js';
import ThreadScreenTracker from './thread-screen-tracker.react.js';
import DevTools from '../redux/dev-tools.react.js';
import { useSelector } from '../redux/redux-utils.js';
import { usePersistedStateLoaded } from '../selectors/app-state-selectors.js';

const NavigationHandler: React.ComponentType<{}> = React.memo<{}>(
  function NavigationHandler() {
    const navContext = React.useContext(NavContext);
    const persistedStateLoaded = usePersistedStateLoaded();

    const devTools = __DEV__ ? <DevTools key="devTools" /> : null;

    if (!navContext || !persistedStateLoaded) {
      if (__DEV__) {
        return (
          <>
            <NavFromReduxHandler />
            {devTools}
          </>
        );
      } else {
        return null;
      }
    }

    const { dispatch } = navContext;
    return (
      <>
        <LogInHandler dispatch={dispatch} />
        <ThreadScreenTracker />
        <ModalPruner navContext={navContext} />
        <PolicyAcknowledgmentHandler />
        {devTools}
      </>
    );
  },
);
NavigationHandler.displayName = 'NavigationHandler';

type LogInHandlerProps = {
  +dispatch: (action: NavAction) => void,
};
const LogInHandler = React.memo<LogInHandlerProps>(function LogInHandler(
  props: LogInHandlerProps,
) {
  const { dispatch } = props;

  const hasCurrentUserInfo = useSelector(isLoggedIn);

  const cookie = useSelector(cookieSelector(ashoatKeyserverID));
  const hasUserCookie = !!(cookie && cookie.startsWith('user='));

  const loggedIn = hasCurrentUserInfo && hasUserCookie;
  const navLoggedIn = useIsAppLoggedIn();
  const prevLoggedInRef = React.useRef<?boolean>();

  React.useEffect(() => {
    if (loggedIn === prevLoggedInRef.current) {
      return;
    }
    prevLoggedInRef.current = loggedIn;
    if (loggedIn && !navLoggedIn) {
      dispatch({ type: (logInActionType: 'LOG_IN') });
    } else if (!loggedIn && navLoggedIn) {
      dispatch({ type: (logOutActionType: 'LOG_OUT') });
    }
  }, [navLoggedIn, loggedIn, dispatch]);

  return null;
});
LogInHandler.displayName = 'LogInHandler';

export default NavigationHandler;
