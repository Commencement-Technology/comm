// @flow

import * as React from 'react';

import { useENSNames } from 'lib/hooks/ens-cache';
import { type SetState } from 'lib/types/hook-types';
import { type RelationshipButton } from 'lib/types/relationship-types';
import type { UserInfo } from 'lib/types/user-types';

import ThreadSettingsRelationshipButton from './thread-settings-relationship-button.react';
import css from './thread-settings-relationship-tab.css';

type Props = {
  +setErrorMessage: SetState<?string>,
  +relationshipButtons: $ReadOnlyArray<RelationshipButton>,
  +otherUserInfo: UserInfo,
};

function ThreadSettingsRelationshipTab(props: Props): React.Node {
  const { relationshipButtons, otherUserInfo, setErrorMessage } = props;
  const [otherUserInfoWithENSName] = useENSNames([otherUserInfo]);
  const buttons = React.useMemo(
    () =>
      relationshipButtons.map(action => (
        <ThreadSettingsRelationshipButton
          key={action}
          relationshipButton={action}
          otherUserInfo={otherUserInfoWithENSName}
          setErrorMessage={setErrorMessage}
        />
      )),
    [otherUserInfoWithENSName, relationshipButtons, setErrorMessage],
  );
  return <div className={css.container}>{buttons}</div>;
}

export default ThreadSettingsRelationshipTab;
