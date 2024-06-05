// @flow

import type { $Response, $Request } from 'express';
import t from 'tcomb';
import type { TInterface, TUnion } from 'tcomb';

import {
  type ReportCreationResponse,
  type ReportCreationRequest,
  type FetchErrorReportInfosResponse,
  type FetchErrorReportInfosRequest,
  type ThreadInconsistencyReportCreationRequest,
  type EntryInconsistencyReportCreationRequest,
  type MediaMissionReportCreationRequest,
  type UserInconsistencyReportCreationRequest,
  reportTypes,
  threadInconsistencyReportValidatorShape,
  entryInconsistencyReportValidatorShape,
  userInconsistencyReportValidatorShape,
} from 'lib/types/report-types.js';
import { ServerError } from 'lib/utils/errors.js';
import { tShape, tPlatformDetails } from 'lib/utils/validation-utils.js';

import createReport from '../creators/report-creator.js';
import {
  fetchErrorReportInfos,
  fetchReduxToolsImport,
} from '../fetchers/report-fetchers.js';
import type { Viewer } from '../session/viewer.js';

const threadInconsistencyReportCreationRequest =
  tShape<ThreadInconsistencyReportCreationRequest>({
    ...threadInconsistencyReportValidatorShape,
    type: t.irreducible<typeof reportTypes.THREAD_INCONSISTENCY>(
      'reportTypes.THREAD_INCONSISTENCY',
      x => x === reportTypes.THREAD_INCONSISTENCY,
    ),
  });

const entryInconsistencyReportCreationRquest =
  tShape<EntryInconsistencyReportCreationRequest>({
    ...entryInconsistencyReportValidatorShape,
    type: t.irreducible<typeof reportTypes.ENTRY_INCONSISTENCY>(
      'reportTypes.ENTRY_INCONSISTENCY',
      x => x === reportTypes.ENTRY_INCONSISTENCY,
    ),
  });

const mediaMissionReportCreationRequest =
  tShape<MediaMissionReportCreationRequest>({
    type: t.irreducible<typeof reportTypes.MEDIA_MISSION>(
      'reportTypes.MEDIA_MISSION',
      x => x === reportTypes.MEDIA_MISSION,
    ),
    platformDetails: tPlatformDetails,
    time: t.Number,
    mediaMission: t.Object,
    uploadServerID: t.maybe(t.String),
    uploadLocalID: t.maybe(t.String),
    mediaLocalID: t.maybe(t.String),
    messageServerID: t.maybe(t.String),
    messageLocalID: t.maybe(t.String),
  });

const userInconsistencyReportCreationRequest =
  tShape<UserInconsistencyReportCreationRequest>({
    ...userInconsistencyReportValidatorShape,
    type: t.irreducible<typeof reportTypes.USER_INCONSISTENCY>(
      'reportTypes.USER_INCONSISTENCY',
      x => x === reportTypes.USER_INCONSISTENCY,
    ),
  });

export const reportCreationRequestInputValidator: TUnion<ReportCreationRequest> =
  t.union<ReportCreationRequest>([
    tShape({
      type: t.irreducible<typeof reportTypes.ERROR>(
        'reportTypes.ERROR',
        x => x === reportTypes.ERROR,
      ),
      platformDetails: tPlatformDetails,
      errors: t.list(
        tShape({
          errorMessage: t.String,
          stack: t.maybe(t.String),
          componentStack: t.maybe(t.String),
        }),
      ),
      preloadedState: t.Object,
      currentState: t.Object,
      actions: t.list(t.Object),
    }),
    threadInconsistencyReportCreationRequest,
    entryInconsistencyReportCreationRquest,
    mediaMissionReportCreationRequest,
    userInconsistencyReportCreationRequest,
  ]);

async function reportCreationResponder(
  viewer: Viewer,
  request: ReportCreationRequest,
): Promise<ReportCreationResponse> {
  if (request.type === null || request.type === undefined) {
    request.type = reportTypes.ERROR;
  }
  if (!request.platformDetails && request.deviceType) {
    const { deviceType, codeVersion, stateVersion, ...rest } = request;
    request = {
      ...rest,
      platformDetails: { platform: deviceType, codeVersion, stateVersion },
    };
  }
  const response = await createReport(viewer, request);
  if (!response) {
    throw new ServerError('ignored_report');
  }
  return response;
}

export const reportMultiCreationRequestInputValidator: TInterface<ReportMultiCreationRequest> =
  tShape<ReportMultiCreationRequest>({
    reports: t.list(reportCreationRequestInputValidator),
  });

type ReportMultiCreationRequest = {
  +reports: $ReadOnlyArray<ReportCreationRequest>,
};
async function reportMultiCreationResponder(
  viewer: Viewer,
  request: ReportMultiCreationRequest,
): Promise<void> {
  await Promise.all(
    request.reports.map(reportCreationRequest =>
      createReport(viewer, reportCreationRequest),
    ),
  );
}

export const fetchErrorReportInfosRequestInputValidator: TInterface<FetchErrorReportInfosRequest> =
  tShape<FetchErrorReportInfosRequest>({
    cursor: t.maybe(t.String),
  });

async function errorReportFetchInfosResponder(
  viewer: Viewer,
  request: FetchErrorReportInfosRequest,
): Promise<FetchErrorReportInfosResponse> {
  return await fetchErrorReportInfos(viewer, request);
}

async function errorReportDownloadResponder(
  viewer: Viewer,
  req: $Request,
  res: $Response,
): Promise<void> {
  const id = req.params.reportID;
  if (!id) {
    throw new ServerError('invalid_parameters');
  }
  const result = await fetchReduxToolsImport(viewer, id);
  res.set('Content-Disposition', `attachment; filename=report-${id}.json`);
  res.json({
    preloadedState: JSON.stringify(result.preloadedState),
    payload: JSON.stringify(result.payload),
  });
}

export {
  threadInconsistencyReportValidatorShape,
  entryInconsistencyReportValidatorShape,
  reportCreationResponder,
  reportMultiCreationResponder,
  errorReportFetchInfosResponder,
  errorReportDownloadResponder,
};
