// @flow

import * as React from 'react';

import { useModalContext } from 'lib/components/modal-provider.react.js';
import { useUserSearchIndex } from 'lib/selectors/nav-selectors.js';
import { threadInfoSelector } from 'lib/selectors/thread-selectors.js';
import {
  roleIsAdminRole,
  useThreadHasPermission,
} from 'lib/shared/thread-utils.js';
import type { RelativeMemberInfo } from 'lib/types/minimally-encoded-thread-permissions-types.js';
import { threadPermissions } from 'lib/types/thread-permission-types.js';
import { useRolesFromCommunityThreadInfo } from 'lib/utils/role-utils.js';

import { AddMembersModal } from './add-members-modal.react.js';
import ThreadMembersList from './members-list.react.js';
import css from './members-modal.css';
import Button from '../../../components/button.react.js';
import Tabs, { type TabData } from '../../../components/tabs.react.js';
import { useSelector } from '../../../redux/redux-utils.js';
import SearchModal from '../../search-modal.react.js';

type TabType = 'All Members' | 'Admins';

const tabsData: $ReadOnlyArray<TabData<TabType>> = [
  {
    id: 'All Members',
    header: 'All Members',
  },
  {
    id: 'Admins',
    header: 'Admins',
  },
];

type ContentProps = {
  +searchText: string,
  +threadID: string,
};
function ThreadMembersModalContent(props: ContentProps): React.Node {
  const { threadID, searchText } = props;

  const [tab, setTab] = React.useState<TabType>('All Members');

  const threadInfo = useSelector(state => threadInfoSelector(state)[threadID]);
  const { members: threadMembersNotFiltered } = threadInfo;

  const userSearchIndex = useUserSearchIndex(threadMembersNotFiltered);
  const userIDs = React.useMemo(
    () => userSearchIndex.getSearchResults(searchText),
    [searchText, userSearchIndex],
  );

  const allMembers = React.useMemo(
    () =>
      threadMembersNotFiltered.filter(
        (member: RelativeMemberInfo) =>
          searchText.length === 0 || userIDs.includes(member.id),
      ),
    [searchText.length, threadMembersNotFiltered, userIDs],
  );

  const roles = useRolesFromCommunityThreadInfo(threadInfo, allMembers);
  const adminMembers = React.useMemo(
    () =>
      allMembers.filter((member: RelativeMemberInfo) =>
        roleIsAdminRole(roles.get(member.id)),
      ),
    [allMembers, roles],
  );

  const tabs = React.useMemo(
    () => <Tabs tabItems={tabsData} activeTab={tab} setTab={setTab} />,
    [tab],
  );

  const tabContent = React.useMemo(() => {
    if (tab === 'All Members') {
      return (
        <ThreadMembersList threadInfo={threadInfo} threadMembers={allMembers} />
      );
    }

    return (
      <ThreadMembersList threadInfo={threadInfo} threadMembers={adminMembers} />
    );
  }, [adminMembers, allMembers, tab, threadInfo]);

  const threadMembersModalContent = React.useMemo(
    () => (
      <div className={css.modalContentContainer}>
        {tabs}
        <div className={css.membersListTabsContent}>{tabContent}</div>
      </div>
    ),
    [tabContent, tabs],
  );

  return threadMembersModalContent;
}

type Props = {
  +threadID: string,
  +onClose: () => void,
};
function ThreadMembersModal(props: Props): React.Node {
  const { onClose, threadID } = props;
  const renderModalContent = React.useCallback(
    (searchText: string) => (
      <ThreadMembersModalContent threadID={threadID} searchText={searchText} />
    ),
    [threadID],
  );

  const { pushModal, popModal } = useModalContext();

  const threadInfo = useSelector(state => threadInfoSelector(state)[threadID]);

  const onClickAddMembers = React.useCallback(() => {
    pushModal(<AddMembersModal onClose={popModal} threadID={threadID} />);
  }, [popModal, pushModal, threadID]);

  const canAddMembers = useThreadHasPermission(
    threadInfo,
    threadPermissions.ADD_MEMBERS,
  );

  const addMembersButton = React.useMemo(() => {
    if (!canAddMembers) {
      return null;
    }
    return (
      <div className={css.addNewMembers}>
        <Button variant="filled" onClick={onClickAddMembers}>
          Add members
        </Button>
      </div>
    );
  }, [canAddMembers, onClickAddMembers]);

  return (
    <SearchModal
      name="Members"
      searchPlaceholder="Search members"
      onClose={onClose}
      size="large"
      primaryButton={addMembersButton}
    >
      {renderModalContent}
    </SearchModal>
  );
}

export default ThreadMembersModal;
