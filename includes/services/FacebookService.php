<?php

namespace NewfoldLabs\WP\Module\Facebook\Services;

use NewfoldLabs\WP\Module\Data\HiiveConnection;
use NewfoldLabs\WP\Module\Facebook\Services\ExternalApiService;
use NewfoldLabs\WP\Module\Facebook\Services\UtilityService; 
use NewfoldLabs\WP\Module\Facebook\Accessors\SocialData;

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
            UtilityService::storeTokenInCookie($details);
        }
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
        
        $FacebookData = new SocialData();
        $data = get_option('nfd_fb_details');
        if ($data){
            return $data;
        }
        $fb_token = UtilityService::decrypt_token();
        if(!($fb_token)){
            $fb_token = FacebookService::get_token();
        }
        if(isset($fb_token) && $fb_token){     
        $url = 'https://graph.facebook.com/me?fields=id,name,email,picture&access_token='. $fb_token;
        $result = ExternalApiService::CallAPI('GET', $url);

        if ( $result && $result->id) {
            $posturl = "https://graph.facebook.com/".$result->id."/posts?fields=id,name,message,story,created_time,link,description,caption,attachments{media,type,subattachments}&limit=10&access_token=".$fb_token."&format=json";
            $postresults = ExternalApiService::CallAPI('GET', $posturl);
            if($postresults && $postresults->data)
            {
                $FacebookData->get_User()->set_posts($postresults->data);
            }
            $imageurl="https://graph.facebook.com/me/photos/uploaded?fields=link,picture,alt_text,created_time,id&limit=10&access_token=".$fb_token."&format=json";
            $imageresults = ExternalApiService::CallAPI('GET', $imageurl);
            if($imageresults && $postresults->data)
            {
                $FacebookData->get_User()->set_images($imageresults->data);
            }
            $businessurl = "https://graph.facebook.com/me/accounts?fields=category%2Ccategory_list%2Cname%2Cid%2Ctasks&access_token=".$fb_token."&format=json";
            $businessresults = ExternalApiService::CallAPI('GET', $businessurl);
            if($businessresults && $businessresults->data)
            {
                $FacebookData->get_Business()->set_profile($businessresults->data);
            }
            $businessposttoken ="https://graph.facebook.com/".$FacebookData->get_Business()->get_profile()[0]->id."?fields=access_token&access_token=".$fb_token."&format=json";
            $businessposttokenresult = ExternalApiService::CallAPI('GET', $businessposttoken);
            if($businessposttokenresult)
            {
                $businessPosts ="https://graph.facebook.com/".$FacebookData->get_Business()->get_profile()[0]->id."/feed?access_token=".$businessposttokenresult->access_token."&format=json";         
                $businessPostsResults =ExternalApiService::CallAPI('GET', $businessPosts);
                if($businessPostsResults && $businessPostsResults->data) {
                    $FacebookData->get_Business()->set_posts($businessPostsResults->data);
                }
            }
            $businessImages = "https://graph.facebook.com/".$FacebookData->get_Business()->get_profile()[0]->id."/photos?fields=created_time,alt_text,picture,id&limit=10&access_token=".$fb_token."&format=json";
            $businessImagesResults= ExternalApiService::CallAPI('GET', $businessImages);
            if ($businessImagesResults && $businessImagesResults->data){
                $FacebookData->get_Business()->set_images($businessImagesResults->data);
            }
        }
        $FacebookData->set_source("facebook");
        $FacebookData->get_User()->set_profile($result);
        $FacebookData->get_Business();
        //need to fetch and attach data for future 
        update_option('nfd_fb_details', $FacebookData);
        return array($FacebookData);
        }
        return "token not found!";
    }
}
?>