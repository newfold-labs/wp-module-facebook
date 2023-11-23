import { Button } from "@newfold/ui-component-library";
import apiFetch from "@wordpress/api-fetch";
import React, { useEffect, useState } from "react";

const FacebookConnectButton = () => {
    const [fieldValue, setFieldValue] = useState('');
    const [facebookAccess, setFacebookToken] = useState(null);
    const [profileData, setProfileData] = useState([]);

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
                        //console.log('Token information:', response);                        
                        let isAccessTokenValid = response.data.is_valid
                        if (isAccessTokenValid) {
                            //console.log('Access token is valid');
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
                fetch(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`)
                  .then(response => response.json())
                  .then(data => {
                    // Log the user information
                    //console.log('User Profile:', data);                    
                    setProfileData([data])                                
                  })
                  .catch(error => {
                    console.error('Error fetching user profile:', error);
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
    
    return (
        <div>{
                facebookAccess ? 
                <div>
                <Button style={{ "color": "#fff", "padding": "5px 20px"}} className="nfd-bg-green-600">Connected to Facebook</Button> 
                <div>                    
                {profileData?.map((dataObj,index) => {
                    return (
                        <>
                            <ul style={{"paddingTop": "20px"}}>
                                <li><p>{dataObj.id}</p></li>
                                <li><p>{dataObj.name}</p></li>
                                <li><p>{dataObj.email}</p></li>
                            </ul>
                            <img src= {dataObj.picture.data.url} height={dataObj.picture.height} width={dataObj.picture.width} />
                       </> 
                    );
                })}
                </div>
                </div>    
                : 
                <form action={ENDPOINTS.cf_worker.login_screen} enctype="application/x-www-form-urlencoded" method="post">
                    <input type="text" value={fieldValue} name="token_hiive" hidden />
                    <Button type="submit" variant="primary">Connect to Facebook</Button>
                </form>
            }
    </div>)
}

export default FacebookConnectButton;