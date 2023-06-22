// @flow

import * as React from 'react';

import { useModalContext } from 'lib/components/modal-provider.react.js';
import { type ChatMessageItem } from 'lib/selectors/chat-selectors.js';
import { useSearchMessages } from 'lib/shared/search-utils.js';
import type { RawMessageInfo } from 'lib/types/message-types.js';
import type { ThreadInfo } from 'lib/types/thread-types.js';
import { useResolvedThreadInfo } from 'lib/utils/entity-helpers.js';

import css from './message-search-modal.css';
import { useParseSearchResults } from './message-search-utils.react.js';
import { useTooltipContext } from '../../chat/tooltip-provider.js';
import Button from '../../components/button.react.js';
import MessageResult from '../../components/message-result.react.js';
import Search from '../../components/search.react.js';
import LoadingIndicator from '../../loading-indicator.react.js';
import { useMessageSearchContext } from '../../search/message-search-state-provider.react.js';
import Modal from '../modal.react.js';

type ContentProps = {
  +threadInfo: ThreadInfo,
};

function MessageSearchModal(props: ContentProps): React.Node {
  const { threadInfo } = props;

  const [lastID, setLastID] = React.useState();
  const [searchResults, setSearchResults] = React.useState([]);
  const [endReached, setEndReached] = React.useState(false);

  const { getQuery, setQuery, clearQuery } = useMessageSearchContext();

  const query = React.useMemo(
    () => getQuery(threadInfo.id),
    [getQuery, threadInfo.id],
  );

  const appendSearchResults = React.useCallback(
    (newMessages: $ReadOnlyArray<RawMessageInfo>, end: boolean) => {
      setSearchResults(oldMessages => [...oldMessages, ...newMessages]);
      setEndReached(end);
    },
    [],
  );

  React.useEffect(() => {
    setSearchResults([]);
    setLastID(undefined);
    setEndReached(false);
  }, [query]);

  const searchMessages = useSearchMessages();

  React.useEffect(
    () => searchMessages(query, threadInfo.id, appendSearchResults, lastID),
    [appendSearchResults, lastID, query, searchMessages, threadInfo.id],
  );

  const modifiedItems = useParseSearchResults(threadInfo, searchResults);

  const renderItem = React.useCallback(
    item => (
      <MessageResult
        key={item.messageInfo.id}
        item={item}
        threadInfo={threadInfo}
        scrollable={false}
      />
    ),
    [threadInfo],
  );

  const messages = React.useMemo(
    () => modifiedItems.map(item => renderItem(item)),
    [modifiedItems, renderItem],
  );

  const messageContainer = React.useRef(null);

  const messageContainerRef = (msgContainer: ?HTMLDivElement) => {
    messageContainer.current = msgContainer;
    messageContainer.current?.addEventListener('scroll', onScroll);
  };

  const { clearTooltip } = useTooltipContext();

  const possiblyLoadMoreMessages = React.useCallback(() => {
    if (!messageContainer.current) {
      return;
    }

    const loaderTopOffset = 32;
    const { scrollTop, scrollHeight, clientHeight } = messageContainer.current;
    if (
      endReached ||
      Math.abs(scrollTop) + clientHeight + loaderTopOffset < scrollHeight
    ) {
      return;
    }
    setLastID(modifiedItems ? oldestMessageID(modifiedItems) : undefined);
  }, [endReached, modifiedItems]);

  const onScroll = React.useCallback(() => {
    if (!messageContainer.current) {
      return;
    }
    clearTooltip();
    possiblyLoadMoreMessages();
  }, [clearTooltip, possiblyLoadMoreMessages]);

  const footer = React.useMemo(() => {
    if (query === '') {
      return (
        <div className={css.footer}>Your search results will appear here</div>
      );
    }
    if (!endReached) {
      return (
        <div key="search-loader" className={css.loading}>
          <LoadingIndicator status="loading" size="medium" color="white" />
        </div>
      );
    }
    if (modifiedItems.length > 0) {
      return <div className={css.footer}>End of results</div>;
    }
    return (
      <div className={css.footer}>
        No results. Please try using different keywords to refine your search
      </div>
    );
  }, [query, endReached, modifiedItems.length]);

  const [input, setInput] = React.useState(query);

  const onPressSearch = React.useCallback(
    () => setQuery(input, threadInfo.id),
    [setQuery, input, threadInfo.id],
  );

  const clearQueryWrapper = React.useCallback(
    () => clearQuery(threadInfo.id),
    [clearQuery, threadInfo.id],
  );

  const onKeyDown = React.useCallback(
    event => {
      if (event.key === 'Enter') {
        onPressSearch();
      }
    },
    [onPressSearch],
  );

  const { uiName } = useResolvedThreadInfo(threadInfo);
  const searchPlaceholder = `Searching in ${uiName}`;
  const { popModal } = useModalContext();

  return (
    <Modal name="Search Message" onClose={popModal} size="large">
      <div className={css.container}>
        <div className={css.header}>
          <Search
            onChangeText={setInput}
            searchText={input}
            placeholder={searchPlaceholder}
            onClearText={clearQueryWrapper}
            onKeyDown={onKeyDown}
          />
          <Button
            onClick={onPressSearch}
            variant="filled"
            className={css.button}
          >
            Search
          </Button>
        </div>
        <div className={css.content} ref={messageContainerRef}>
          {messages}
          {footer}
        </div>
      </div>
    </Modal>
  );
}

function oldestMessageID(data: $ReadOnlyArray<ChatMessageItem>) {
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].itemType === 'message' && data[i].messageInfo.id) {
      return data[i].messageInfo.id;
    }
  }
  return undefined;
}

export default MessageSearchModal;
