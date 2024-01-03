import { Button } from "@newfold/ui-component-library";
import apiFetch from "@wordpress/api-fetch";
import React, { useEffect, useState } from "react";
import {
  checkAccessTokenValidity,
  getFacebookUserPosts,
  getFacebookUserProfileDetails,
  getToken,
} from "../utils/helper";
import constants from "../utils/constants";
import AES from "crypto-js/aes";

export const facebookConnectHelper = async () => {
  let fieldValue = "";
  let facebookAccess = null;
  let profileData = [];

  const postToken = (fb_token) => {
    const facebook_token = AES.encrypt(
      fb_token,
      constants.facebook_module.token_phrase
    ).toString();
    //storing facebook token in db
    apiFetch({
      url: constants.wordpress.settings,
      method: "post",
      data: {
        fb_token: facebook_token,
      },
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hiiveToekna = () =>
    apiFetch({ url: constants.wordpress.access })
      .then((res) => {
        getToken(res.token)
          .then((resp) => {
            // Make sure the Facebook SDK is loaded before calling this
            window.fbAsyncInit = function () {
              FB.init({
                appId: "696041252459517",
                cookie: true,
                xfbml: true,
                version: "v18.0",
              });
              if (resp.token) {
                checkAccessTokenValidity(resp.token);
              }
            };

            // Function to check the validity of an access token
            function checkAccessTokenValidity(accessToken) {
              // Make a call to the Graph API debug_token endpoint
              FB.api(
                "/debug_token",
                {
                  input_token: accessToken,
                  access_token:
                    "696041252459517|66251f57e1d15f5db650ed121920a4a1",
                },
                function (response) {
                  if (response && !response.error) {
                    // The response contains information about the token
                    // console.log('Token information:', response);
                    let isAccessTokenValid = response.data.is_valid;
                    if (isAccessTokenValid) {
                      //console.log('Access token is valid');
                      postToken(resp.token);
                      facebookAccess = resp.token;
                      getFacebookUserProfile(resp.token);
                    } else {
                      //console.log('Access token is not valid');
                      facebookAccess = false;
                    }
                  } else {
                    console.error(
                      "Error checking access token validity:",
                      response.error
                    );
                  }
                }
              );
            }

            //Get User Profile Information
            function getFacebookUserProfile(accessToken) {
              // Make a request to get the Facebook logged in user information
              FB.api(
                `/me?fields=id,name,email,picture&access_token=${accessToken}`,
                (response) => {
                  if (!response.error) {
                    getFacebookUserPosts(response.id, accessToken);
                    profileData = [response];
                  } else {
                    console.log("Error fetching user profile:", response.error);
                  }
                }
              );
            }

            // Load the Facebook SDK asynchronously
            (function (d, s, id) {
              var js,
                fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s);
              js.id = id;
              js.src = "https://connect.facebook.net/en_US/sdk.js";
              fjs.parentNode.insertBefore(js, fjs);
            })(document, "script", "facebook-jssdk");
          })
          .catch((err) => {
            console.log(err);
          });
        fieldValue = res.token;
      })
      .catch((err) => {
        console.log(err);
      });

  await hiiveToekna();
  await apiFetch({ url: constants.wordpress.settings }).then(async (res) => {
    if (res.fb_token) {
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
        console.log("called");
        if (win.closed) {
          console.log("called1");
          clearInterval(intervalId);
          await hiiveToekna();
          window.location.reload();
          return profileData;
        }
      }, 1000);
    }
  });

  // return profileData;
};
