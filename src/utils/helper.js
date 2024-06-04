import apiFetch from '@wordpress/api-fetch';
import constants from './constants';

export const getToken = () => {
  return apiFetch({
    url: `${constants.wordpress.fb_token}`,
    headers: {
      method: 'GET',
      'content-type': 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export const getFacebookUserProfile = (accessToken) => {
  return fetch(
    `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`
  );
};

export const checkAccessTokenValidity = (accessToken) => {
  return fetch(
    `${constants.facebook_module.base_url}/${constants.facebook_module.debug_token}?input_token=${accessToken}&access_token=696041252459517|66251f57e1d15f5db650ed121920a4a1`
  )
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error fetching user profile:', error);
    });
};

export const getFacebookUserProfileDetails = () => {
  return apiFetch({ url: constants.wordpress.facebook_details })
    .then((res) => {
      if (res?.details?.error) {
        throw {
          message: 'failed to load the data',
          error: res?.details?.error,
        };
      }
      return res?.details;
    })
    .catch((error) => {
      throw error;
    });
};

export const facebookLogout = () => {
  return apiFetch({ url: constants.wordpress.facebook_logout })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw { message: 'failed to load the data', errorMsg: error };
    });
};

export const postFbToken = (token) => {
  return apiFetch({
    url: `${constants.wordpress.fb_token}`,
    data: token,
    method: "POST"
  });
}