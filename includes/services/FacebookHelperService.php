<?php
namespace NewfoldLabs\WP\Module\Facebook\Services;

class FacebookHelperService{
    public static function get_fb_posts($result, $FacebookData, $fb_token){
        $posturl = NFD_FACECBOOK_GRAPH_BASE . "/".$result->id."/posts?fields=id,name,message,story,created_time,link,description,caption,attachments{media,type,subattachments}&limit=10&access_token=".$fb_token."&format=json";
        $postresults = wp_remote_get($posturl,  array(
            'headers' => array(
            'Content-Type'  => 'application/json',
            'Accept'        => 'application/json',
        ),
    ));
    $postsResponse = json_decode(wp_remote_retrieve_body($postresults));
        if($postsResponse && $postsResponse->data)
        {
            $FacebookData->get_User()->set_posts($postsResponse->data);
        }
    }

    public static function get_fb_images($result, $FacebookData, $fb_token){
        $imageurl= NFD_FACECBOOK_GRAPH_BASE."/v18.0/me/photos?fields=link,picture,alt_text,created_time,id&limit=10&access_token=".$fb_token."&format=json";
            $imageresults = wp_remote_get($imageurl,  array(
                'headers' => array(
                'Content-Type'  => 'application/json',
                'Accept'        => 'application/json',
            ),
        ));
        $imagesResponse = json_decode(wp_remote_retrieve_body($imageresults));
            if($imagesResponse && $imagesResponse->data)
            {
                $FacebookData->get_User()->set_images($imagesResponse->data);
            }
    }

    public static function get_fb_business($result, $FacebookData, $fb_token){
        $businessurl = NFD_FACECBOOK_GRAPH_BASE."/v18.0/me/accounts?fields=category%2Ccategory_list%2Cname%2Cid%2Ctasks&access_token=".$fb_token."&format=json";
        $businessresults = wp_remote_get($businessurl,  array(
            'headers' => array(
            'Content-Type'  => 'application/json',
            'Accept'        => 'application/json',
        ),
    ));
    $businessResponse = json_decode(wp_remote_retrieve_body($businessresults));

        if($businessResponse && $businessResponse->data)
        {
            $FacebookData->get_Business()->set_profile($businessResponse->data);
        }
    }

    public static function get_fb_business_posts($result, $FacebookData, $fb_token){
        $businessposttoken = NFD_FACECBOOK_GRAPH_BASE . "/".$FacebookData->get_Business()->get_profile()[0]->id."?fields=access_token&access_token=".$fb_token."&format=json";
        $businessposttokenresult = wp_remote_get($businessposttoken,  array(
            'headers' => array(
            'Content-Type'  => 'application/json',
            'Accept'        => 'application/json',
        ),
    ));
        if($businessposttokenresult)
        {
            $businessPosts = NFD_FACECBOOK_GRAPH_BASE . "/".$FacebookData->get_Business()->get_profile()[0]->id."/feed?access_token=".$businessposttokenresult->access_token."&format=json";         
            $businessPostResponse =wp_remote_get($businessPosts);
            $businessPostsResults = json_decode(wp_remote_retrieve_body($businessPostResponse));

            if($businessPostsResults && $businessPostsResults->data) {
                $FacebookData->get_Business()->set_posts($businessPostsResults->data);
            }
        }
    }

    public static function get_fb_business_images($result, $FacebookData, $fb_token){
        $businessImages = NFD_FACECBOOK_GRAPH_BASE."/".$FacebookData->get_Business()->get_profile()[0]->id."/photos?fields=created_time,alt_text,picture,id&limit=10&access_token=".$fb_token."&format=json";
        $businessImagesResponse= wp_remote_get($businessImages,  array(
            'headers' => array(
            'Content-Type'  => 'application/json',
            'Accept'        => 'application/json',
        ),
    ));
    $businessImagesResults = json_decode(wp_remote_retrieve_body($businessImagesResponse));

        if ($businessImagesResults && $businessImagesResults->data){
            $FacebookData->get_Business()->set_images($businessImagesResults->data);
        }
    }
}

?>
