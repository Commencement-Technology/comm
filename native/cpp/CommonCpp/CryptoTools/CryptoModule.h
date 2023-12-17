#pragma once

#include <memory>
#include <string>
#include <unordered_map>

#include "folly/Optional.h"
#include "olm/olm.h"

#include "Persist.h"
#include "Session.h"
#include "Tools.h"

namespace comm {
namespace crypto {

class CryptoModule {

  OlmBuffer accountBuffer;

  std::unordered_map<std::string, std::shared_ptr<Session>> sessions = {};

  Keys keys;

  OlmAccount *getOlmAccount();
  void createAccount();
  void exposePublicIdentityKeys();
  void generateOneTimeKeys(size_t oneTimeKeysAmount);
  // returns number of published keys
  size_t publishOneTimeKeys();

public:
  const std::string id;
  CryptoModule(std::string id);
  CryptoModule(std::string id, std::string secretKey, Persist persist);

  // CryptoModule's accountBuffer cannot be safely copied
  // See explanation in https://phab.comm.dev/D9562
  CryptoModule(const CryptoModule &) = delete;

  static Keys keysFromStrings(
      const std::string &identityKeys,
      const std::string &oneTimeKeys);

  std::string getIdentityKeys();
  std::string getOneTimeKeys(size_t oneTimeKeysAmount = 50);

  // Prekey rotation methods for X3DH
  std::uint8_t getNumPrekeys();
  std::string getPrekey();
  std::string getPrekeySignature();
  folly::Optional<std::string> getUnpublishedPrekey();
  std::string generateAndGetPrekey();
  void markPrekeyAsPublished();
  void forgetOldPrekey();

  void initializeInboundForReceivingSession(
      const std::string &targetDeviceId,
      const OlmBuffer &encryptedMessage,
      const OlmBuffer &idKeys,
      const bool overwrite = false);
  void initializeOutboundForSendingSession(
      const std::string &targetDeviceId,
      const OlmBuffer &idKeys,
      const OlmBuffer &preKeys,
      const OlmBuffer &preKeySignature,
      const OlmBuffer &oneTimeKeys,
      size_t keyIndex = 0);
  bool hasSessionFor(const std::string &targetDeviceId);
  std::shared_ptr<Session> getSessionByDeviceId(const std::string &deviceId);

  Persist storeAsB64(const std::string &secretKey);
  void restoreFromB64(const std::string &secretKey, Persist persist);

  EncryptedData
  encrypt(const std::string &targetDeviceId, const std::string &content);
  std::string
  decrypt(const std::string &targetDeviceId, EncryptedData &encryptedData);

  std::string signMessage(const std::string &message);
  static void verifySignature(
      const std::string &publicKey,
      const std::string &message,
      const std::string &signature);
};

} // namespace crypto
} // namespace comm
