/**
 * This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
 *
 * Do not edit this file as changes may cause incorrect behavior and will be lost
 * once the code is regenerated.
 *
 * @generated by codegen project: GenerateModuleH.js
 */

#include "commJSI.h"

namespace facebook {
namespace react {

static jsi::Value __hostFunction_CommCoreModuleSchemaCxxSpecJSI_getDraft(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  return static_cast<CommCoreModuleSchemaCxxSpecJSI *>(&turboModule)->getDraft(rt, args[0].asString(rt));
}
static jsi::Value __hostFunction_CommCoreModuleSchemaCxxSpecJSI_updateDraft(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  return static_cast<CommCoreModuleSchemaCxxSpecJSI *>(&turboModule)->updateDraft(rt, args[0].asString(rt), args[1].asString(rt));
}
static jsi::Value __hostFunction_CommCoreModuleSchemaCxxSpecJSI_moveDraft(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  return static_cast<CommCoreModuleSchemaCxxSpecJSI *>(&turboModule)->moveDraft(rt, args[0].asString(rt), args[1].asString(rt));
}
static jsi::Value __hostFunction_CommCoreModuleSchemaCxxSpecJSI_getClientDBStore(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  return static_cast<CommCoreModuleSchemaCxxSpecJSI *>(&turboModule)->getClientDBStore(rt);
}
static jsi::Value __hostFunction_CommCoreModuleSchemaCxxSpecJSI_removeAllDrafts(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  return static_cast<CommCoreModuleSchemaCxxSpecJSI *>(&turboModule)->removeAllDrafts(rt);
}
static jsi::Value __hostFunction_CommCoreModuleSchemaCxxSpecJSI_getAllMessagesSync(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  return static_cast<CommCoreModuleSchemaCxxSpecJSI *>(&turboModule)->getAllMessagesSync(rt);
}
static jsi::Value __hostFunction_CommCoreModuleSchemaCxxSpecJSI_processDraftStoreOperations(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  return static_cast<CommCoreModuleSchemaCxxSpecJSI *>(&turboModule)->processDraftStoreOperations(rt, args[0].asObject(rt).asArray(rt));
}
static jsi::Value __hostFunction_CommCoreModuleSchemaCxxSpecJSI_processMessageStoreOperations(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  return static_cast<CommCoreModuleSchemaCxxSpecJSI *>(&turboModule)->processMessageStoreOperations(rt, args[0].asObject(rt).asArray(rt));
}
static jsi::Value __hostFunction_CommCoreModuleSchemaCxxSpecJSI_processMessageStoreOperationsSync(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  static_cast<CommCoreModuleSchemaCxxSpecJSI *>(&turboModule)->processMessageStoreOperationsSync(rt, args[0].asObject(rt).asArray(rt));
  return jsi::Value::undefined();
}
static jsi::Value __hostFunction_CommCoreModuleSchemaCxxSpecJSI_getAllThreadsSync(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  return static_cast<CommCoreModuleSchemaCxxSpecJSI *>(&turboModule)->getAllThreadsSync(rt);
}
static jsi::Value __hostFunction_CommCoreModuleSchemaCxxSpecJSI_processThreadStoreOperations(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  return static_cast<CommCoreModuleSchemaCxxSpecJSI *>(&turboModule)->processThreadStoreOperations(rt, args[0].asObject(rt).asArray(rt));
}
static jsi::Value __hostFunction_CommCoreModuleSchemaCxxSpecJSI_processReportStoreOperations(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  return static_cast<CommCoreModuleSchemaCxxSpecJSI *>(&turboModule)->processReportStoreOperations(rt, args[0].asObject(rt).asArray(rt));
}
static jsi::Value __hostFunction_CommCoreModuleSchemaCxxSpecJSI_processThreadStoreOperationsSync(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  static_cast<CommCoreModuleSchemaCxxSpecJSI *>(&turboModule)->processThreadStoreOperationsSync(rt, args[0].asObject(rt).asArray(rt));
  return jsi::Value::undefined();
}
static jsi::Value __hostFunction_CommCoreModuleSchemaCxxSpecJSI_initializeCryptoAccount(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  return static_cast<CommCoreModuleSchemaCxxSpecJSI *>(&turboModule)->initializeCryptoAccount(rt);
}
static jsi::Value __hostFunction_CommCoreModuleSchemaCxxSpecJSI_getUserPublicKey(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  return static_cast<CommCoreModuleSchemaCxxSpecJSI *>(&turboModule)->getUserPublicKey(rt);
}
static jsi::Value __hostFunction_CommCoreModuleSchemaCxxSpecJSI_getUserOneTimeKeys(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  return static_cast<CommCoreModuleSchemaCxxSpecJSI *>(&turboModule)->getUserOneTimeKeys(rt);
}
static jsi::Value __hostFunction_CommCoreModuleSchemaCxxSpecJSI_getCodeVersion(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  return static_cast<CommCoreModuleSchemaCxxSpecJSI *>(&turboModule)->getCodeVersion(rt);
}
static jsi::Value __hostFunction_CommCoreModuleSchemaCxxSpecJSI_terminate(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  static_cast<CommCoreModuleSchemaCxxSpecJSI *>(&turboModule)->terminate(rt);
  return jsi::Value::undefined();
}
static jsi::Value __hostFunction_CommCoreModuleSchemaCxxSpecJSI_setNotifyToken(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  return static_cast<CommCoreModuleSchemaCxxSpecJSI *>(&turboModule)->setNotifyToken(rt, args[0].asString(rt));
}
static jsi::Value __hostFunction_CommCoreModuleSchemaCxxSpecJSI_clearNotifyToken(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  return static_cast<CommCoreModuleSchemaCxxSpecJSI *>(&turboModule)->clearNotifyToken(rt);
}
static jsi::Value __hostFunction_CommCoreModuleSchemaCxxSpecJSI_setCurrentUserID(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  return static_cast<CommCoreModuleSchemaCxxSpecJSI *>(&turboModule)->setCurrentUserID(rt, args[0].asString(rt));
}
static jsi::Value __hostFunction_CommCoreModuleSchemaCxxSpecJSI_getCurrentUserID(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  return static_cast<CommCoreModuleSchemaCxxSpecJSI *>(&turboModule)->getCurrentUserID(rt);
}
static jsi::Value __hostFunction_CommCoreModuleSchemaCxxSpecJSI_setDeviceID(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  return static_cast<CommCoreModuleSchemaCxxSpecJSI *>(&turboModule)->setDeviceID(rt, args[0].asString(rt));
}
static jsi::Value __hostFunction_CommCoreModuleSchemaCxxSpecJSI_getDeviceID(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  return static_cast<CommCoreModuleSchemaCxxSpecJSI *>(&turboModule)->getDeviceID(rt);
}
static jsi::Value __hostFunction_CommCoreModuleSchemaCxxSpecJSI_clearSensitiveData(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  return static_cast<CommCoreModuleSchemaCxxSpecJSI *>(&turboModule)->clearSensitiveData(rt);
}
static jsi::Value __hostFunction_CommCoreModuleSchemaCxxSpecJSI_checkIfDatabaseNeedsDeletion(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  return static_cast<CommCoreModuleSchemaCxxSpecJSI *>(&turboModule)->checkIfDatabaseNeedsDeletion(rt);
}
static jsi::Value __hostFunction_CommCoreModuleSchemaCxxSpecJSI_reportDBOperationsFailure(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  static_cast<CommCoreModuleSchemaCxxSpecJSI *>(&turboModule)->reportDBOperationsFailure(rt);
  return jsi::Value::undefined();
}
static jsi::Value __hostFunction_CommCoreModuleSchemaCxxSpecJSI_generateNonce(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  return static_cast<CommCoreModuleSchemaCxxSpecJSI *>(&turboModule)->generateNonce(rt);
}
static jsi::Value __hostFunction_CommCoreModuleSchemaCxxSpecJSI_registerUser(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  return static_cast<CommCoreModuleSchemaCxxSpecJSI *>(&turboModule)->registerUser(rt, args[0].asString(rt), args[1].asString(rt), args[2].asString(rt), args[3].asString(rt), args[4].asString(rt), args[5].asString(rt), args[6].asString(rt), args[7].asString(rt), args[8].asObject(rt).asArray(rt), args[9].asObject(rt).asArray(rt));
}
static jsi::Value __hostFunction_CommCoreModuleSchemaCxxSpecJSI_loginPasswordUser(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  return static_cast<CommCoreModuleSchemaCxxSpecJSI *>(&turboModule)->loginPasswordUser(rt, args[0].asString(rt), args[1].asString(rt), args[2].asString(rt), args[3].asString(rt), args[4].asString(rt), args[5].asString(rt), args[6].asString(rt), args[7].asString(rt), args[8].asObject(rt).asArray(rt), args[9].asObject(rt).asArray(rt));
}

CommCoreModuleSchemaCxxSpecJSI::CommCoreModuleSchemaCxxSpecJSI(std::shared_ptr<CallInvoker> jsInvoker)
  : TurboModule("CommTurboModule", jsInvoker) {
  methodMap_["getDraft"] = MethodMetadata {1, __hostFunction_CommCoreModuleSchemaCxxSpecJSI_getDraft};
  methodMap_["updateDraft"] = MethodMetadata {2, __hostFunction_CommCoreModuleSchemaCxxSpecJSI_updateDraft};
  methodMap_["moveDraft"] = MethodMetadata {2, __hostFunction_CommCoreModuleSchemaCxxSpecJSI_moveDraft};
  methodMap_["getClientDBStore"] = MethodMetadata {0, __hostFunction_CommCoreModuleSchemaCxxSpecJSI_getClientDBStore};
  methodMap_["removeAllDrafts"] = MethodMetadata {0, __hostFunction_CommCoreModuleSchemaCxxSpecJSI_removeAllDrafts};
  methodMap_["getAllMessagesSync"] = MethodMetadata {0, __hostFunction_CommCoreModuleSchemaCxxSpecJSI_getAllMessagesSync};
  methodMap_["processDraftStoreOperations"] = MethodMetadata {1, __hostFunction_CommCoreModuleSchemaCxxSpecJSI_processDraftStoreOperations};
  methodMap_["processMessageStoreOperations"] = MethodMetadata {1, __hostFunction_CommCoreModuleSchemaCxxSpecJSI_processMessageStoreOperations};
  methodMap_["processMessageStoreOperationsSync"] = MethodMetadata {1, __hostFunction_CommCoreModuleSchemaCxxSpecJSI_processMessageStoreOperationsSync};
  methodMap_["getAllThreadsSync"] = MethodMetadata {0, __hostFunction_CommCoreModuleSchemaCxxSpecJSI_getAllThreadsSync};
  methodMap_["processThreadStoreOperations"] = MethodMetadata {1, __hostFunction_CommCoreModuleSchemaCxxSpecJSI_processThreadStoreOperations};
  methodMap_["processReportStoreOperations"] = MethodMetadata {1, __hostFunction_CommCoreModuleSchemaCxxSpecJSI_processReportStoreOperations};
  methodMap_["processThreadStoreOperationsSync"] = MethodMetadata {1, __hostFunction_CommCoreModuleSchemaCxxSpecJSI_processThreadStoreOperationsSync};
  methodMap_["initializeCryptoAccount"] = MethodMetadata {0, __hostFunction_CommCoreModuleSchemaCxxSpecJSI_initializeCryptoAccount};
  methodMap_["getUserPublicKey"] = MethodMetadata {0, __hostFunction_CommCoreModuleSchemaCxxSpecJSI_getUserPublicKey};
  methodMap_["getUserOneTimeKeys"] = MethodMetadata {0, __hostFunction_CommCoreModuleSchemaCxxSpecJSI_getUserOneTimeKeys};
  methodMap_["getCodeVersion"] = MethodMetadata {0, __hostFunction_CommCoreModuleSchemaCxxSpecJSI_getCodeVersion};
  methodMap_["terminate"] = MethodMetadata {0, __hostFunction_CommCoreModuleSchemaCxxSpecJSI_terminate};
  methodMap_["setNotifyToken"] = MethodMetadata {1, __hostFunction_CommCoreModuleSchemaCxxSpecJSI_setNotifyToken};
  methodMap_["clearNotifyToken"] = MethodMetadata {0, __hostFunction_CommCoreModuleSchemaCxxSpecJSI_clearNotifyToken};
  methodMap_["setCurrentUserID"] = MethodMetadata {1, __hostFunction_CommCoreModuleSchemaCxxSpecJSI_setCurrentUserID};
  methodMap_["getCurrentUserID"] = MethodMetadata {0, __hostFunction_CommCoreModuleSchemaCxxSpecJSI_getCurrentUserID};
  methodMap_["setDeviceID"] = MethodMetadata {1, __hostFunction_CommCoreModuleSchemaCxxSpecJSI_setDeviceID};
  methodMap_["getDeviceID"] = MethodMetadata {0, __hostFunction_CommCoreModuleSchemaCxxSpecJSI_getDeviceID};
  methodMap_["clearSensitiveData"] = MethodMetadata {0, __hostFunction_CommCoreModuleSchemaCxxSpecJSI_clearSensitiveData};
  methodMap_["checkIfDatabaseNeedsDeletion"] = MethodMetadata {0, __hostFunction_CommCoreModuleSchemaCxxSpecJSI_checkIfDatabaseNeedsDeletion};
  methodMap_["reportDBOperationsFailure"] = MethodMetadata {0, __hostFunction_CommCoreModuleSchemaCxxSpecJSI_reportDBOperationsFailure};
  methodMap_["generateNonce"] = MethodMetadata {0, __hostFunction_CommCoreModuleSchemaCxxSpecJSI_generateNonce};
  methodMap_["registerUser"] = MethodMetadata {10, __hostFunction_CommCoreModuleSchemaCxxSpecJSI_registerUser};
  methodMap_["loginPasswordUser"] = MethodMetadata {10, __hostFunction_CommCoreModuleSchemaCxxSpecJSI_loginPasswordUser};
}


} // namespace react
} // namespace facebook
