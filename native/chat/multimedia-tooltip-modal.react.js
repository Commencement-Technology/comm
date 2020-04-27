// @flow

import type { MediaInfo } from 'lib/types/media-types';
import type { ChatMultimediaMessageInfoItem } from './multimedia-message.react';

import { createTooltip, tooltipHeight } from '../navigation/tooltip.react';
import MultimediaTooltipButton from './multimedia-tooltip-button.react';
import { intentionalSaveMedia } from '../media/save-media';

type CustomProps = {
  item: ChatMultimediaMessageInfoItem,
  mediaInfo: MediaInfo,
  verticalOffset: number,
};

function onPressSave(props: CustomProps) {
  return intentionalSaveMedia(props.mediaInfo.uri);
}

const spec = {
  entries: [{ id: 'save', text: 'Save', onPress: onPressSave }],
};

const MultimediaTooltipModal = createTooltip(MultimediaTooltipButton, spec);

const multimediaTooltipHeight = tooltipHeight(spec.entries.length);

export { MultimediaTooltipModal, multimediaTooltipHeight };
