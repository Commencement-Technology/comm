// @flow

import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, Text } from 'react-native';

import { addKeyserverActionType } from 'lib/actions/keyserver-actions.js';
import { useIsKeyserverURLValid } from 'lib/shared/keyserver-utils.js';
import type { KeyserverInfo } from 'lib/types/keyserver-types.js';
import { defaultKeyserverInfo } from 'lib/types/keyserver-types.js';
import { useDispatch } from 'lib/utils/redux-utils.js';

import type { ProfileNavigationProp } from './profile.react.js';
import TextInput from '../components/text-input.react.js';
import HeaderRightTextButton from '../navigation/header-right-text-button.react.js';
import type { NavigationRoute } from '../navigation/route-names.js';
import { useSelector } from '../redux/redux-utils.js';
import { useStyles, useColors } from '../themes/colors.js';
import { useStaffCanSee } from '../utils/staff-utils.js';

type KeyserverCheckStatus =
  | { +status: 'inactive' }
  | { +status: 'loading' }
  | { +status: 'error' };
const keyserverCheckStatusInactive = { status: 'inactive' };
const keyserverCheckStatusLoading = { status: 'loading' };
const keyserverCheckStatusError = { status: 'error' };

type Props = {
  +navigation: ProfileNavigationProp<'AddKeyserver'>,
  +route: NavigationRoute<'AddKeyserver'>,
};
// eslint-disable-next-line no-unused-vars
function AddKeyserver(props: Props): React.Node {
  const { goBack, setOptions } = useNavigation();

  const dispatch = useDispatch();

  const staffCanSee = useStaffCanSee();

  const currentUserID = useSelector(state => state.currentUserInfo?.id);
  const customServer = useSelector(state => state.customServer);

  const { panelForegroundTertiaryLabel } = useColors();
  const styles = useStyles(unboundStyles);

  const [urlInput, setUrlInput] = React.useState(
    customServer && staffCanSee ? customServer : '',
  );
  const [status, setStatus] = React.useState<KeyserverCheckStatus>(
    keyserverCheckStatusInactive,
  );

  const isKeyserverURLValidCallback = useIsKeyserverURLValid(urlInput);

  const onPressSave = React.useCallback(async () => {
    if (!currentUserID || !urlInput) {
      return;
    }
    setStatus(keyserverCheckStatusLoading);

    const keyserverVersionData = await isKeyserverURLValidCallback();
    if (!keyserverVersionData) {
      setStatus(keyserverCheckStatusError);
      return;
    }
    setStatus(keyserverCheckStatusInactive);

    const newKeyserverInfo: KeyserverInfo = defaultKeyserverInfo(urlInput);

    dispatch({
      type: addKeyserverActionType,
      payload: {
        keyserverAdminUserID: keyserverVersionData.ownerID,
        newKeyserverInfo,
      },
    });

    goBack();
  }, [currentUserID, dispatch, goBack, isKeyserverURLValidCallback, urlInput]);

  const buttonDisabled = !urlInput || status.status === 'loading';
  React.useEffect(() => {
    setOptions({
      headerRight: () => (
        <HeaderRightTextButton
          label="Save"
          onPress={onPressSave}
          disabled={buttonDisabled}
        />
      ),
    });
  }, [onPressSave, setOptions, buttonDisabled]);

  const onChangeText = React.useCallback(
    (text: string) => setUrlInput(text),
    [],
  );

  const showErrorMessage = status.status === 'error';
  const errorMessage = React.useMemo(() => {
    if (!showErrorMessage) {
      return null;
    }

    return (
      <Text style={styles.errorMessage}>
        Cannot connect to keyserver. Please check the URL or your connection and
        try again.
      </Text>
    );
  }, [showErrorMessage, styles.errorMessage]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>KEYSERVER URL</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={urlInput}
          onChangeText={onChangeText}
          placeholder="Keyserver URL"
          placeholderTextColor={panelForegroundTertiaryLabel}
          autoFocus={true}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      {errorMessage}
    </View>
  );
}

const unboundStyles = {
  container: {
    paddingTop: 8,
  },
  header: {
    color: 'panelBackgroundLabel',
    fontSize: 12,
    fontWeight: '400',
    paddingBottom: 3,
    paddingHorizontal: 24,
  },
  inputContainer: {
    backgroundColor: 'panelForeground',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: 'panelForegroundBorder',
    borderTopWidth: 1,
  },
  input: {
    color: 'panelForegroundLabel',
    flex: 1,
    fontFamily: 'Arial',
    fontSize: 16,
    paddingVertical: 0,
    borderBottomColor: 'transparent',
  },
  errorMessage: {
    marginTop: 8,
    marginHorizontal: 16,
    color: 'redText',
  },
};

export default AddKeyserver;
