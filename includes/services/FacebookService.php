<?php

namespace NewfoldLabs\WP\Module\Facebook\Services;

use NewfoldLabs\WP\Module\Data\HiiveConnection;
use NewfoldLabs\WP\Module\Facebook\Services\UtilityService; 
use NewfoldLabs\WP\Module\Facebook\Accessors\FacebookData;
use NewfoldLabs\WP\Module\Facebook\Services\FacebookHelperService;

class FacebookService {

    public static function get_hiive_token(){
        $hiive_token = HiiveConnection::get_auth_token() ? HiiveConnection::get_auth_token() :  'test6';
        return $hiive_token;
    }

    public static function get_token(){
        $hiive_token = HiiveConnection::get_auth_token() ? HiiveConnection::get_auth_token() :  'test6';
        $url = 'http://192.168.1.6:8787/get/token?hiive_token='. $hiive_token;
        $result = wp_remote_get($url, array(
            'headers' => array(
                'Content-Type'  => 'application/json',
                'Accept'        => 'application/json',
            ),
        ));
       $response = json_decode(wp_remote_retrieve_body( $result ));
        if($response->token){
            $details = array(
                "token" => UtilityService::encrypt_token($response->token),
                "expires_on" => $response->expiresIn
            );
            update_option('fb_token', $details);
            UtilityService::storeTokenInCookie($details);
        }
        return $response ? $response : null;
    }

    public static function delete_token(){
        $hiive_token = HiiveConnection::get_auth_token() ? HiiveConnection::get_auth_token() :  'test6';
        $url = 'http://192.168.1.6:8787/delete/token?hiive_token='. $hiive_token;
        $result = wp_remote_get($url, array(
            'headers' => array(
            'Content-Type'  => 'application/json',
            'Accept'        => 'application/json',
        ),
    ));
        UtilityService::deleteTokenFromCookie();
        return $result;
    }

    public static function get_fb_details(){
        
        $FacebookData = new FacebookData();
        $data = get_option('nfd_fb_details');
        if ($data){
            return array($data);
        }
        $fb_token = UtilityService::decrypt_token();
        if(!($fb_token)){
            $fb_token = FacebookService::get_token();
        }
        if(isset($fb_token) && $fb_token){     
        $url = 'https://graph.facebook.com/me?fields=id,name,email,picture&access_token='. $fb_token;
        $result = wp_remote_get($url, array(
                'headers' => array(
                'Content-Type'  => 'application/json',
                'Accept'        => 'application/json',
            ),
        ));
        $response = json_decode(wp_remote_retrieve_body( $result ));
        if ( $response && $response->id) {
            FacebookHelperService::get_fb_posts($response, $FacebookData, $fb_token);
            FacebookHelperService::get_fb_images($response, $FacebookData, $fb_token);
            FacebookHelperService::get_fb_business($response, $FacebookData, $fb_token);
            FacebookHelperService::get_fb_business_posts($response, $FacebookData, $fb_token);
            FacebookHelperService::get_fb_business_images($response, $FacebookData, $fb_token);
            
        }
        $FacebookData->set_source("facebook");
        $FacebookData->get_Users()->set_profile($response);
       
        //need to fetch and attach data for future 
        update_option('nfd_fb_details', $FacebookData);
        return array($FacebookData);
        }
        return "token not found!";
    }
}
?>