import AsyncStorage from "@react-native-async-storage/async-storage";
// LocalStorageService.js

export const AsyncStorageService = (function () {
  var _service;

  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }

  async function _setToken(tokenData) {
    await AsyncStorage.setItem("accessToken", tokenData);
  }
  async function _setRefreshToken(tokenData) {
    await AsyncStorage.setItem("refreshToken", tokenData);
  }
  async function _getAccessToken() {
    return await AsyncStorage.getItem("accessToken");
  }

  async function _getUserId() {
    return await AsyncStorage.getItem("user_id");
  }

  function _getRefreshToken() {
    return AsyncStorage.getItem("refreshToken");
  }

  function _clearToken() {
    AsyncStorage.removeItem("accessToken");
  }

  return {
    getService: _getService,
    setToken: _setToken,
    setRefreshToken: _setRefreshToken,
    getAccessToken: _getAccessToken,
    getUserId: _getUserId,

    getRefreshToken: _getRefreshToken,
    clearToken: _clearToken,
  };
})();
