import apiFetch from '@wordpress/api-fetch';
import { getFacebookUserProfileDetails, getToken, postFbToken } from '../utils/helper';
import constants from '../utils/constants';

export const facebookConnectHelper = async (getFbDetails) => {
  let fieldValue = '';
  let facebookAccess = null;
  let profileData = [];

  const postToken = (fb_token) => {
    apiFetch({
      url: constants.wordpress.settings,
      method: 'post',
      data: {
        fb_token: fb_token,
      },
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  function receiveMessage(event) {
    // Check origin of the message sender for security
    if (event.origin.search('https://hiive.cloud') < 0) {
        return;
    }
    window.removeEventListener('message', receiveMessage);
    // Process data received from the popup
    postFbToken(event.data).then(() => {
      getFbDetails()
    })
}

  const hiiveToken = () =>
    apiFetch({ url: constants.wordpress.access })
      .then((res) => {
        getToken()
          .then((resp) => {
            if (resp.token) {
              postToken(resp.token);
              facebookAccess = resp.token;
            }
          })
          .catch((err) => {
            console.error(err);
          });
        fieldValue = res.token;
      })
      .catch((err) => {
        console.error(err);
      });

  await hiiveToken();
  await apiFetch({ url: constants.wordpress.fb_token, data: fieldValue, method: 'post' }).then(async (res) => {
    if (res?.fb_token) {
      await getFacebookUserProfileDetails().then((response) => {
        facebookAccess = res.fb_token;
        profileData = [response];
        return profileData;
      });
    } else {
      const win = window.open(
        `${constants.cf_worker.login_screen}?token_hiive=${fieldValue}&redirect=${window.location.href}`,
        'ModalPopUp',
        `toolbar=no,scrollbars=no,location=no,width=${
          window.innerWidth / 2 + 200
        },height=${window.innerHeight / 2 + 200},top=200,left=200`
      );
      window.addEventListener('message', receiveMessage, false);
    }
  });
};
