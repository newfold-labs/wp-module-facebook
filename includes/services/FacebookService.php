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

    public static function delete_token(){
        $hiive_token = HiiveConnection::get_auth_token() ? HiiveConnection::get_auth_token() :  'test2';
        $url = 'http://192.168.1.6:8787/delete/token?hiive_token='. $hiive_token;
        $result = ExternalApiService::CallAPI('GET', $url);
        return $result;
     }

    public static function get_fb_details(){
        $fb_token = UtilityService::decrypt_token();
        if(!isset($fb_token)){
            $fb_token = UtilityService::get_token();
            if(isset($fb_token)){
                update_option("fb_token", $fb_token);
            }
         }  
         if(isset($fb_token)){      
         $url = 'https://graph.facebook.com/me?fields=id,name,email,picture&access_token='. $fb_token;
         $result = ExternalApiService::CallAPI('GET', $url);
         return $result;
         }
         return "token not found!";
    }
}
?>