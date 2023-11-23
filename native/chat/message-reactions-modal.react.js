// @flow

import Icon from '@expo/vector-icons/FontAwesome.js';
import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { ReactionInfo } from 'lib/selectors/chat-selectors.js';
import {
  useMessageReactionsList,
  type MessageReactionListInfo,
} from 'lib/shared/reaction-utils.js';

import UserAvatar from '../avatars/user-avatar.react.js';
import Modal from '../components/modal.react.js';
import type { RootNavigationProp } from '../navigation/root-navigator.react.js';
import { type NavigationRoute } from '../navigation/route-names.js';
import { useColors, useStyles } from '../themes/colors.js';
import { useNavigateToUserProfileBottomSheet } from '../user-profile/user-profile-utils.js';

export type MessageReactionsModalParams = {
  +reactions: ReactionInfo,
};

type Props = {
  +navigation: RootNavigationProp<'MessageReactionsModal'>,
  +route: NavigationRoute<'MessageReactionsModal'>,
};
function MessageReactionsModal(props: Props): React.Node {
  const { navigation, route } = props;

  const { navigate, goBackOnce } = navigation;
  const { reactions } = route.params;

  const styles = useStyles(unboundStyles);
  const colors = useColors();

  const modalSafeAreaEdges = React.useMemo(() => ['top'], []);
  const modalContainerSafeAreaEdges = React.useMemo(() => ['bottom'], []);

  const reactionsListData = useMessageReactionsList(reactions);

  const navigateToUserProfileBottomSheet =
    useNavigateToUserProfileBottomSheet();

  const [selectedUserID, setSelectedUserID] = React.useState<?string>();

  // This useEffect will call navigateToUserProfileBottomSheet whenever the
  //  MessageReactionsModal is unmounting and there is a selectedUserID.
  // This will make sure that the user profile bottom sheet slides in only
  // after MessageReactionsModal has finished sliding out.
  React.useEffect(() => {
    return () => {
      if (!selectedUserID) {
        return;
      }
      navigateToUserProfileBottomSheet(selectedUserID);
    };
  }, [navigate, navigateToUserProfileBottomSheet, selectedUserID]);

  const onPressUser = React.useCallback(
    (userID: string) => {
      setSelectedUserID(userID);
      goBackOnce();
    },
    [goBackOnce, setSelectedUserID],
  );

  const renderItem = React.useCallback(
    ({ item }: { +item: MessageReactionListInfo, ... }) => (
      <TouchableOpacity
        onPress={() => onPressUser(item.id)}
        key={item.id}
        style={styles.reactionsListRowContainer}
      >
        <View style={styles.reactionsListUserInfoContainer}>
          <UserAvatar size="S" userID={item.id} />
          <Text style={styles.reactionsListUsernameText}>{item.username}</Text>
        </View>
        <Text style={styles.reactionsListReactionText}>{item.reaction}</Text>
      </TouchableOpacity>
    ),
    [
      onPressUser,
      styles.reactionsListReactionText,
      styles.reactionsListRowContainer,
      styles.reactionsListUserInfoContainer,
      styles.reactionsListUsernameText,
    ],
  );

  const itemSeperator = React.useCallback(() => {
    return <View style={styles.reactionsListItemSeperator} />;
  }, [styles.reactionsListItemSeperator]);

  return (
    <Modal
      modalStyle={styles.modalStyle}
      containerStyle={styles.modalContainerStyle}
      safeAreaEdges={modalSafeAreaEdges}
    >
      <SafeAreaView edges={modalContainerSafeAreaEdges}>
        <View style={styles.modalContentContainer}>
          <Text style={styles.reactionsListTitleText}>All reactions</Text>
          <TouchableHighlight
            onPress={goBackOnce}
            style={styles.closeButton}
            underlayColor={colors.modalIosHighlightUnderlay}
          >
            <Icon name="close" size={16} style={styles.closeIcon} />
          </TouchableHighlight>
        </View>
        <FlatList
          data={reactionsListData}
          renderItem={renderItem}
          ItemSeparatorComponent={itemSeperator}
          contentContainerStyle={styles.reactionsListContentContainer}
        />
      </SafeAreaView>
    </Modal>
  );
}

const unboundStyles = {
  modalStyle: {
    // we need to set each margin property explicitly to override
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    marginTop: 0,
    justifyContent: 'flex-end',
    flex: 0,
    borderWidth: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalContainerStyle: {
    justifyContent: 'flex-end',
  },
  modalContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  reactionsListContentContainer: {
    paddingBottom: 16,
  },
  reactionsListTitleText: {
    color: 'modalForegroundLabel',
    fontSize: 18,
  },
  reactionsListRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reactionsListUserInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  reactionsListUsernameText: {
    color: 'modalForegroundLabel',
    fontSize: 18,
    marginLeft: 8,
  },
  reactionsListReactionText: {
    fontSize: 18,
  },
  reactionsListItemSeperator: {
    height: 16,
  },
  closeButton: {
    borderRadius: 4,
    width: 18,
    height: 18,
    alignItems: 'center',
  },
  closeIcon: {
    color: 'modalBackgroundSecondaryLabel',
  },
};

export default MessageReactionsModal;
