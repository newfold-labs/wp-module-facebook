<?php

namespace NewfoldLabs\WP\Module\Facebook\Services;

use NewfoldLabs\WP\Module\Data\HiiveConnection;
use NewfoldLabs\WP\Module\Facebook\Services\ExternalApiService;
use NewfoldLabs\WP\Module\Facebook\Services\UtilityService; 

class FacebookService {

    public static function get_hiive_token(){
        $hiive_token = HiiveConnection::get_auth_token() ? HiiveConnection::get_auth_token() :  'test2';
        return $hiive_token;
    }

    public static function get_token(){
        $hiive_token = HiiveConnection::get_auth_token() ? HiiveConnection::get_auth_token() :  'test2';
        $url = 'http://192.168.1.6:8787/get/token?hiive_token='. $hiive_token;
        $result = ExternalApiService::CallAPI('GET', $url);
        if($result->token){
            $details = array(
                "token" => UtilityService::encrypt_token($result->token),
                "expires_on" => $result->expiresIn
            );
            update_option('fb_token', $details);
        }
        // return $result ? encrypt_token($result->token) : null;
        return $result ? $result->token : null;
    }

    public static function delete_token(){
        $hiive_token = HiiveConnection::get_auth_token() ? HiiveConnection::get_auth_token() :  'test2';
        $url = 'http://192.168.1.6:8787/delete/token?hiive_token='. $hiive_token;
        $result = ExternalApiService::CallAPI('GET', $url);
        UtilityService::deleteTokenFromCookie();
        return $result;
    }

    public static function get_fb_details(){
        $fb_token = UtilityService::decrypt_token();
        if(!($fb_token)){
            $fb_token = FacebookService::get_token();
            if(isset($fb_token)){
                // $fb_token = $fb_token ? UtilityService::encrypt_token($fb_token) : null;

                UtilityService::storeTokenInCookie($fb_token);
            }
        }
        // if (!isset($_COOKIE['fb_access_token'])) {
        //     UtilityService::storeTokenInCookie($fb_token);  
        // }
        if(isset($fb_token) && $fb_token){     
        $url = 'https://graph.facebook.com/me?fields=id,name,email,picture&access_token='. $fb_token;
        $result = ExternalApiService::CallAPI('GET', $url);
        return $result;
        }
        return "token not found!";
    }
}
?>