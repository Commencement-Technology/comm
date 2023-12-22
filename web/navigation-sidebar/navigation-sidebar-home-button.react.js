// @flow

import * as React from 'react';

import SWMansionIcon from 'lib/components/SWMansionIcon.react.js';
import { unreadCount } from 'lib/selectors/thread-selectors.js';

import css from './navigation-sidebar-home-button.css';
import UnreadBadge from '../components/unread-badge.react.js';
import { useSelector } from '../redux/redux-utils.js';
import { useNavigationSidebarTooltip } from '../utils/tooltip-action-utils.js';

function NavigationSidebarHomeButton(): React.Node {
  const unreadCountValue = useSelector(unreadCount);

  const { onMouseEnter, onMouseLeave } = useNavigationSidebarTooltip({
    tooltipLabel: 'Home',
  });

  const unreadBadge = React.useMemo(() => {
    if (unreadCountValue === 0) {
      return null;
    }
    return (
      <div className={css.unreadBadgeContainer}>
        <UnreadBadge unreadCount={unreadCountValue} />
      </div>
    );
  }, [unreadCountValue]);

  return (
    <div className={css.container}>
      <div
        className={css.buttonContainer}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {unreadBadge}
        <SWMansionIcon icon="home-1" size={24} />
      </div>
    </div>
  );
}

export default NavigationSidebarHomeButton;
