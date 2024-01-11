<?php 
namespace NewfoldLabs\WP\Module\Facebook\Services;

use NewfoldLabs\WP\Module\Facebook\Services\ExternalApiService;
use NewfoldLabs\WP\Module\Data\Helpers\Encryption;

class UtilityService{

    public static function dateDiffInDays($date) { 
        $expiryDate = date_create($date); 
        $today = date_create(); 
        $interval = date_diff($expiryDate, $today);
        return $interval->format('%a') - 54;
    } 

    /**
    * Decrypt Facebook token
    *
    *
    * @return string Decrypted value
    */
    public static function decrypt_token() {
        $fb_token = $_COOKIE['fb_access_token'] ?? get_option('fb_token');
        $encrpt = new Encryption();
       
        $decrypt_data = isset($fb_token) ? $encrpt->decrypt($fb_token['token']) : null;
        
        if($fb_token['expires_on']){
            
            $expiry = substr($decrypt_data->expires_on, 0, 11);
            $days_left = UtilityService::dateDiffInDays($expiry);
            if($days_left <= 4){
                FacebookService::get_token();
            }
        }
        return $decrypt_data ? $decrypt_data->token : null;
    }

    /**
    * Encrypt Facebook token
    *
    * @param string $value 
    *
    * @return string Encrypted value
    */
    public static function encrypt_token($value) {
        $encrpt = new Encryption();
        $encrypt_data = $value ? $encrpt->encrypt($value) : null;
        return $encrypt_data;
    }

     /**
     * Store the token in cookie
     * @param string  $token
     * 
     */    
    public static function storeTokenInCookie($token) {
        $encryptedToken = isset($token) ? encrypt_token($token) : null;
        // setting cookie for 2 months
        setcookie('fb_access_token', $encryptedToken, time() + (60 * 60 * 24 *30 *2), '/', $_SERVER['HTTP_HOST'], false, false);
    }

    /**
     * Delete the token in cookie
     */
    public static function deleteTokenFromCookie() {
        setcookie('fb_access_token', '', time() - (60 * 60 * 24 *30 *2), '/', $_SERVER['HTTP_HOST'], false, false);
    }
}
?>