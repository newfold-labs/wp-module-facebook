import { Button } from "@newfold/ui-component-library";
import apiFetch from "@wordpress/api-fetch";
import React, { useEffect, useState } from "react";
import { checkAccessTokenValidity, getFacebookUserPosts, getFacebookUserProfileDetails, getToken } from "../utils/helper";
import constants from "../utils/constants";

const FacebookConnectButton = () => {
    const [fieldValue, setFieldValue] = useState('');
    const [facebookAccess, setFacebookToken] = useState(null);
    const [profileData, setProfileData] = useState([]);

    const postToken = (fb_token) => {
            //storing facebook token in db
        apiFetch({
            url: constants.wordpress.settings,
            method: "post",
            data: {
                fb_token
            }
        }).then(res => console.log(res)).catch(err => {
            console.log(err)
        })
    }

    const hiiveToekna = () => apiFetch({ url: constants.wordpress.access }).then((res) => {
        getToken(res.token).then(resp => {
            // Make sure the Facebook SDK is loaded before calling this
            window.fbAsyncInit = function () {
                FB.init({
                    appId: '696041252459517',
                    cookie: true,
                    xfbml: true,
                    version: 'v18.0'
                });

                resp.token && checkAccessTokenValidity(resp.token);
            };

            // Function to check the validity of an access token
            function checkAccessTokenValidity(accessToken) {
                // Make a call to the Graph API debug_token endpoint
                FB.api('/debug_token', { input_token: accessToken, access_token: '696041252459517|66251f57e1d15f5db650ed121920a4a1' }, function (response) {
                    if (response && !response.error) {

                        // The response contains information about the token
                        // console.log('Token information:', response);
                        let isAccessTokenValid = response.data.is_valid
                        if (isAccessTokenValid) {
                            //console.log('Access token is valid');
                            postToken(resp.token);
                            setFacebookToken(resp.token);
                            getFacebookUserProfile(resp.token)
                        } else {
                            //console.log('Access token is not valid');
                            setFacebookToken(false);
                        }
                    } else {
                        console.error('Error checking access token validity:', response.error);
                    }
                });
            }

            //Get User Profile Information
            function getFacebookUserProfile(accessToken) {
                // Make a request to get the Facebook logged in user information
                FB.api(`/me?fields=id,name,email,picture&access_token=${accessToken}`, (response) => {
                    if (!response.error) {
                        getFacebookUserPosts(response.id, accessToken)
                        setProfileData([response])
                    } else {
                        console.log('Error fetching user profile:', response.error);
                    }
                })
            }

            // Load the Facebook SDK asynchronously
            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = 'https://connect.facebook.net/en_US/sdk.js';
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));

        }).catch(err => {
            console.log(err)
        })
        setFieldValue(res.token);
    }).catch((err) => {
        console.log(err);
    });

    useEffect(() => {
        apiFetch({ url: constants.wordpress.settings }).then((res) => {
           if(res.fb_token){
            getFacebookUserProfileDetails().then(response => {
                setFacebookToken(res.fb_token);
                setProfileData([response])
            })
           }else{
            hiiveToekna();
           }
        })
    }, [])

    const connectFacebook = () => {
       const win = window.open(`${constants.cf_worker.login_screen}?token_hiive=${fieldValue}&redirect=${window.location.href}`, "ModalPopUp", `toolbar=no,scrollbars=no,location=no,width=50,height=50,top=200,left=200`)
   
      const intervalId = setInterval(function() {
        if (win.closed) {
            clearInterval(intervalId);
            window.location.reload();
        }
    }, 5000);
    }

    return (
        <div>{
            facebookAccess ?
                <div>
                    <Button style={{ "color": "#fff", "padding": "5px 20px" }} className="nfd-bg-green-600">Connected to Facebook</Button>
                    <div>
                        {profileData?.map((dataObj, index) => {
                            return (
                                <>
                                    <ul style={{ "paddingTop": "20px" }}>
                                        <li><p>Facebook ID: {dataObj.id}</p></li>
                                        <li><p>User Name: {dataObj.name}</p></li>
                                        <li><p>User Email: {dataObj.email}</p></li>
                                        <li><p>Profile pic:{dataObj.picture.data.url}</p></li>
                                    </ul>
                                    <img src={`https://graph.facebook.com/${dataObj.id}/picture?type=small`} height={dataObj.picture.height} width={dataObj.picture.width} />
                                </>
                            );
                        })}
                    </div>
                </div>
                :
                <Button type="submit" variant="primary" onClick={() => connectFacebook()}>Connect to Facebook</Button>
        }
        </div>)
}

export default FacebookConnectButton;