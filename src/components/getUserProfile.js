
import { Button } from "@newfold/ui-component-library";
import React, { useEffect } from 'react';

// Function to get user profile information
const GetUserProfile = () => {
useEffect(() => {
    const loadFacebookSdk = () => {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: '696041252459517',
          cookie: true,
          xfbml: true,
          version: 'v18.0'
        });

        // Check the login status when the page is loaded
        window.FB.getLoginStatus(function (response) {
          console.log(response, "This is the login status response!!!")
          if (response.status === 'connected') {
            // User is logged into Facebook and has authorized your app
            console.log('User is logged in');
                // Make a call to the Graph API /me endpoint
                FB.api('/me', { fields: 'id,name,email' }, function(response) {
                  if (response && !response.error) {
                    // The response contains user profile information
                    console.log('User profile information:', response);
                    // You can access specific fields like response.id, response.name, response.email, etc.
                    //return (<div>`${ response.id }, ${response.name}, ${response.email}`</div>)
                  } else {
                    console.error(response.error);
                    //return (<div>Error fetching user profile:</div>)
                  }
                });
          } else {
            // User is either not logged into Facebook or has not authorized your app
            console.log('User is not logged in or not authorized');
          }
        });
      };

      // Load the Facebook SDK asynchronously
      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    };

    loadFacebookSdk();
  }, []); // Run the effect once when the component mounts

  // Function to trigger Facebook logout
  const performLogout = () => {
    window.FB.logout(function (response) {
      // This function will be called after the user is logged out
      console.log('User logged out');
      // Add additional logout handling as needed
    });
  };

  return (
    <Button style={{ "color": "#fff", "padding": "5px 20px"}} className="nfd-bg-red-600" onClick={performLogout}>Disconnect Facebook</Button>
  );  
}

export default GetUserProfile;