import apiFetch from "@wordpress/api-fetch";
import { getFacebookUserProfileDetails, getToken } from "../utils/helper";
import constants from "../utils/constants";

export const facebookConnectHelper = async () => {
  let fieldValue = "";
  let facebookAccess = null;
  let profileData = [];

  const postToken = (fb_token) => {
    apiFetch({
      url: constants.wordpress.settings,
      method: "post",
      data: {
        fb_token: fb_token,
      },
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
            console.log(err);
          });
        fieldValue = res.token;
      })
      .catch((err) => {
        console.log(err);
      });

  await hiiveToken();
  await apiFetch({ url: constants.wordpress.fb_token }).then(async (res) => {
    if (res?.fb_token) {
      await getFacebookUserProfileDetails().then((response) => {
        facebookAccess = res.fb_token;
        profileData = [response];
        return profileData;
      });
    } else {
      const win = window.open(
        `${constants.cf_worker.login_screen}?token_hiive=${fieldValue}&redirect=${window.location.href}`,
        "ModalPopUp",
        `toolbar=no,scrollbars=no,location=no,width=${
          window.innerWidth / 2 + 200
        },height=${window.innerHeight / 2 + 200},top=200,left=200`
      );

      const intervalId = setInterval(async function () {
        if (win.closed) {
          clearInterval(intervalId);
          await hiiveToken();
          // window.location.reload();
          return profileData;
        }
      }, 1000);
    }
  });

  // return profileData;
};
