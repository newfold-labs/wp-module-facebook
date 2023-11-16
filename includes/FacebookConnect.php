<?php

namespace NewfoldLabs\WP\Module\Facebook;

use Facebook\Facebook;

session_start();

class FacebookConnect
{


    public static function getLoginUrl()
    {
        $fb = new Facebook([
            'app_id' => '1044556590124060',
            'app_secret' => '619b7e1d215af972ceb202eb0695dbf8',
            'default_graph_version' => 'v2.5',
        ]);
        $helper = $fb->getRedirectLoginHelper();

        // return $helper->getAccessToken();
        return $helper->getLoginUrl(get_admin_url());
    }

    public static function getAccessToken()
    {

        $fb = new Facebook([
            'app_id' => '1044556590124060',
            'app_secret' => '619b7e1d215af972ceb202eb0695dbf8',
            'default_graph_version' => 'v2.5',
        ]);
        $helper = $fb->getRedirectLoginHelper();

        try {

            if (isset($_SESSION['facebook_access_token'])) {
                $accessToken = $_SESSION['facebook_access_token'];
            } else {
                $accessToken = $helper->getAccessToken();
            }

        } catch (Facebook\Exceptions\facebookResponseException $e) {
            echo 'Graph returned an error: ' . $e->getMessage();
            exit;
        } catch (Facebook\Exceptions\FacebookSDKException $e) {
            echo 'Facebook SDK returned an error: ' . $e->getMessage();
            exit;
        }

        if (isset($accessToken)) {
            if (isset($_SESSION['facebook_access_token'])) {
                $fb->setDefaultAccessToken($_SESSION['facebook_access_token']);
                $profile_request = $fb->get('/me?fields=name,first_name,last_name,email');
                $profile = $profile_request->getGraphUser();
                $fbid = $profile->getProperty('id'); // To Get Facebook ID
                $fbfullname = $profile->getProperty('name'); // To Get Facebook full name
                $fbemail = $profile->getProperty('email');

                update_option( 'facebook_token', $accessToken );
            } else {
                $_SESSION['facebook_access_token'] = (string) $accessToken;
                $oAuth2Client = $fb->getOAuth2Client();
                $longLivedAccessToken = $oAuth2Client->getLongLivedAccessToken($_SESSION['facebook_access_token']);
                $_SESSION['facebook_access_token'] = (string) $longLivedAccessToken;
                $fb->setDefaultAccessToken($_SESSION['facebook_access_token']);
            }
        }
        
        ?>
        <script>
        window.close();
        </script>
        <?php

    }

    public function getProfileDetails()
    {
        $fb = new Facebook([
            'app_id' => '1044556590124060',
            'app_secret' => '619b7e1d215af972ceb202eb0695dbf8',
            'default_graph_version' => 'v2.5',
        ]);
        $helper = $fb->getRedirectLoginHelper();
        $profile_request = $fb->get('/me?fields=name,first_name,last_name,email');
        $requestPicture = $fb->get('/me/picture?redirect=false&height=200'); //getting user picture
        $picture = $requestPicture->getGraphUser();
        $profile = $profile_request->getGraphUser();
        $fbid = $profile->getProperty('id'); // To Get Facebook ID
        $fbfullname = $profile->getProperty('name'); // To Get Facebook full name
        $fbemail = $profile->getProperty('email');
        return array("id" => $fbid, "fullname" => $fbfullname, "email" => $fbemail);
    }
}
?>