// @flow

import type { ThreadInfo } from 'lib/types/thread-types';
import { threadInfoPropType } from 'lib/types/thread-types';
import type { AppState } from '../redux-setup';
import type { ChatMessageItemWithHeight } from './message-list.react';
import { chatMessageItemPropType } from '../selectors/chat-selectors';

import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import { connect } from 'react-redux';
import _isEqual from 'lodash/fp/isEqual';
import invariant from 'invariant';
import PropTypes from 'prop-types';
import Color from 'color';

import { colorIsDark } from 'lib/selectors/thread-selectors';
import { longAbsoluteDate } from 'lib/utils/date-utils';
import { messageKey } from 'lib/shared/message-utils';

type Props = {
  item: ChatMessageItemWithHeight,
  focused: bool,
  onFocus: (messageKey: string) => void,
  // Redux state
  threadInfo: ThreadInfo,
  userID: ?string,
};
type State = {
  threadInfo: ThreadInfo,
};
class Message extends React.PureComponent {

  props: Props;
  state: State;
  static propTypes = {
    item: chatMessageItemPropType.isRequired,
    focused: PropTypes.bool.isRequired,
    onFocus: PropTypes.func.isRequired,
    threadInfo: threadInfoPropType.isRequired,
    userID: PropTypes.string,
  };

  constructor(props: Props) {
    super(props);
    invariant(props.threadInfo, "should be set");
    this.state = {
      // On log out, it's possible for the thread to be deauthorized before
      // the log out animation completes. To avoid having rendering issues in
      // that case, we cache the threadInfo in state and don't reset it when the
      // threadInfo is undefined.
      threadInfo: props.threadInfo,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (
      nextProps.threadInfo &&
      !_isEqual(nextProps.threadInfo)(this.state.threadInfo)
    ) {
      this.setState({ threadInfo: nextProps.threadInfo });
    }
    if (nextProps.focused !== this.props.focused) {
      LayoutAnimation.easeInEaseOut();
    }
  }

  static itemHeight(item: ChatMessageItemWithHeight, userID: ?string) {
    if (item.messageInfo.creatorID === userID) {
      return 24 + item.textHeight;
    } else {
      return 24 + 25 + item.textHeight;
    }
  }

  render() {
    let conversationHeader = null;
    if (this.props.item.startsConversation || this.props.focused) {
      conversationHeader = (
        <Text style={styles.conversationHeader}>
          {longAbsoluteDate(this.props.item.messageInfo.time).toUpperCase()}
        </Text>
      );
    }

    const isYou = this.props.item.messageInfo.creatorID === this.props.userID;
    let containerStyle = null,
      messageStyle = {},
      textStyle = null,
      authorName = null;
    if (isYou) {
      containerStyle = { alignSelf: 'flex-end' };
      messageStyle.backgroundColor = `#${this.state.threadInfo.color}`;
      const darkColor = colorIsDark(this.state.threadInfo.color);
      textStyle = darkColor ? styles.whiteText : styles.blackText;
    } else {
      containerStyle = { alignSelf: 'flex-start' };
      messageStyle.backgroundColor = "#DDDDDDBB";
      textStyle = styles.blackText;
      authorName = (
        <Text style={styles.authorName}>
          {this.props.item.messageInfo.creator}
        </Text>
      );
    }
    messageStyle.borderTopRightRadius =
      isYou && !this.props.item.startsCluster ? 0 : 8;
    messageStyle.borderBottomRightRadius =
      isYou && !this.props.item.endsCluster ? 0 : 8;
    messageStyle.borderTopLeftRadius =
      !isYou && !this.props.item.startsCluster ? 0 : 8;
    messageStyle.borderBottomLeftRadius =
      !isYou && !this.props.item.endsCluster ? 0 : 8;
    messageStyle.marginBottom = this.props.item.endsCluster ? 12 : 5;
    if (this.props.focused) {
      messageStyle.backgroundColor =
        Color(messageStyle.backgroundColor).darken(0.15).hex();
    }

    return (
      <View>
        {conversationHeader}
        <View style={containerStyle}>
          {authorName}
          <View
            style={[styles.message, messageStyle]}
            onStartShouldSetResponder={this.onStartShouldSetResponder}
            onResponderGrant={this.onResponderGrant}
            onResponderTerminationRequest={this.onResponderTerminationRequest}
          >
            <Text
              numberOfLines={1}
              style={[styles.text, textStyle]}
            >{this.props.item.messageInfo.text}</Text>
          </View>
        </View>
      </View>
    );
  }

  onStartShouldSetResponder = () => true;

  onResponderGrant = () => {
    this.props.onFocus(messageKey(this.props.item.messageInfo));
  }

  onResponderTerminationRequest = () => true;

}

const styles = StyleSheet.create({
  conversationHeader: {
    color: '#777777',
    fontSize: 14,
    paddingBottom: 7,
    alignSelf: 'center',
  },
  text: {
    fontSize: 18,
    fontFamily: 'Arial',
  },
  whiteText: {
    color: 'white',
  },
  blackText: {
    color: 'black',
  },
  message: {
    overflow: 'hidden',
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginHorizontal: 12,
  },
  authorName: {
    color: '#777777',
    fontSize: 14,
    paddingHorizontal: 24,
    paddingVertical: 4,
  },
});

export default connect(
  (state: AppState, ownProps: { item: ChatMessageItemWithHeight }) => ({
    threadInfo: state.threadInfos[ownProps.item.messageInfo.threadID],
    userID: state.userInfo && state.userInfo.id,
  }),
)(Message);
