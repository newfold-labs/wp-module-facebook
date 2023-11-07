<?php

namespace NewfoldLabs\WP\Module\Facebook;

use Facebook\Facebook; 

class FacebookConnect{


public static function getAccessToken() {
    $fb = new Facebook([
        'app_id' => '1044556590124060',
        'app_secret' => '619b7e1d215af972ceb202eb0695dbf8',
        'default_graph_version' => 'v2.5',
    ]);
    $helper = $fb->getRedirectLoginHelper();
    
    // return $helper->getAccessToken();
    return $helper->getLoginUrl('local');
    }

// public function getProfileDetails() {
//     return $helper->getAccessToken();
// }
}
?>