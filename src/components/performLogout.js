export default function performLogout(){
  
  console.log("I am here!!!")
  
  window.fbAsyncInit = function() {
      FB.init({
      appId: '696041252459517',
      cookie: true,
      xfbml: true,
      version: 'v18.0'
      });

      // Subscribe to the auth.logout event
      // FB.Event.subscribe('auth.logout', function(response) {
      //     // This function will be called when the user logs out
      //     console.log('User logged out');
      //     // Add additional logout handling as needed
      //     document.cookie = "fblo_696041252459517=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";      
      // });

      FB.logout(function(response) {
        // This function will be called after the user is logged out
        console.log('User logged out', response);
        // Add additional logout handling as needed
        let name = "fblo_696041252459517";
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      });
  };

  // Load the Facebook SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}
