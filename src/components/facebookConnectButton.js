import { Button } from "@newfold/ui-component-library";
import apiFetch from "@wordpress/api-fetch";
import React, { useEffect, useState } from "react";
import GetUserProfile from "./getUserProfile";

const FacebookConnectButton = () => {
    const [fieldValue, setFieldValue] = useState('');
    const [facebookAccess, setFacebookToken] = useState(null);

    const ENDPOINTS = {
        facebook_module: {
            login_status: "https://graph.facebook.com/v18.0/me"
        },
        hiive_toke: {
            access: `${window.location.origin}/home/index.php?rest_route=%2Fnewfold-ecommerce%2Fv1%2Fintegrations%2Fhiive&_locale=user`
        },
        cf_worker: {
            login_screen: `https://192.168.2.4:8787/?redirect=${window.location.href}`,
            get_token: "https://192.168.2.4:8787/get/token?hiive_token="
        }
    }

    const hiiveToekna = () => apiFetch({ url: ENDPOINTS.hiive_toke.access }).then((res) => {
        apiFetch({
            url: `${ENDPOINTS.cf_worker.get_token}${res.token}&origin=${window.location.origin}`,
            headers: {
                method: "GET",
                Allow: "*/*",
                Connection: "keep-alive"
            }
                 }).then(resp => {            

            // Make sure the Facebook SDK is loaded before calling this
            window.fbAsyncInit = function() {
                FB.init({
                appId: '696041252459517',
                cookie: true,
                xfbml: true,
                version: 'v18.0'
                });

                // Check the validity of an access token when the page is loaded        
                checkAccessTokenValidity(resp.token);               
                
            };
            
            // Function to check the validity of an access token
            function checkAccessTokenValidity(accessToken) {
                // Make a call to the Graph API debug_token endpoint
                FB.api('/debug_token', { input_token: accessToken, access_token: '696041252459517|66251f57e1d15f5db650ed121920a4a1' }, function(response) {
                    if (response && !response.error) {
                        // The response contains information about the token
                        console.log('Token information:', response);
                        let isAccessTokenValid = response.data.is_valid
                        if (isAccessTokenValid) {
                            console.log('Access token is valid');
                            setFacebookToken(resp.token);      
                            getLoginStatusInfo()                            
                        } else {
                            console.log('Access token is not valid');
                            setFacebookToken(false);
                        }                                                              
                    } else {
                        console.error('Error checking access token validity:', response.error);
                    }                    
                });
            }                    
            
            //Get Login Status
            function getLoginStatusInfo(){
                // Check the login status and get user profile information when the page is loaded
                FB.getLoginStatus(function(response) {
                    console.log(response, "****")                        
                    if (response.status === 'connected'){
                        getProfileInfo()
                    } else {
                        // User is either not logged into Facebook or has not authorized your app
                        console.log('User is not logged in or not authorized');                        
                    }
                });
                
            }
            //Get User Profile Information
            function getProfileInfo(){
                FB.api('/me', { fields: 'id,name,email' }, function(response) {
                    console.log(response, "Kay ala response ekde?")
                    if (response && !response.error) {
                      console.log(`User profile information: ${ response.id }, ${response.name}, ${response.email}`);                      
                    } else {
                      console.error(`Error fetching user profile: ${response.error}`);                      
                    }
                });
            }            
            
            // Load the Facebook SDK asynchronously
            (function(d, s, id) {
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
        hiiveToekna();
    }, [])

    //Trigger Facebook logout
    const performLogout = () => {
        window.FB.logout(function (response) {
          // This function will be called after the user is logged out
          console.log('User logged out');
          // Add additional logout handling as needed
        });
    };

    return (<div>{facebookAccess ? <Button style={{ "color": "#fff", "padding": "5px 20px"}} className="nfd-bg-red-600" onClick={performLogout}>Disconnect Facebook</Button> : <form action={ENDPOINTS.cf_worker.login_screen} enctype="application/x-www-form-urlencoded" method="post">
        <input type="text" value={fieldValue} name="token_hiive" hidden />
        <Button type="submit" variant="primary">Connect to Facebook</Button>
    </form>}
    </div>)

}

export default FacebookConnectButton;