<?php
namespace NewfoldLabs\WP\Module\Facebook\Services;

use NewfoldLabs\WP\Module\Data\Helpers\Encryption;

class UtilityService
{
    public static function dateDiffInDays($date)
    {
        $expiryDate = date_create($date);
        $today = date_create();
        $interval = date_diff($expiryDate, $today);
        return $interval->format('%a');
    }

    /**
     * Decrypt Facebook token
     *
     *
     * @return string Decrypted value
     */
    public static function decrypt_token()
    {
        $fb_token = null;
        if ($_COOKIE['fb_access_token']) {
            $fb_token = json_decode(stripslashes($_COOKIE['fb_access_token']), true);
        } elseif (get_option('fb_token')) {
            $fb_token = get_option('fb_token');
            $details = array(
                'token' => $fb_token['token'],
                'expires_on' => $fb_token['expires_on']
            );
            UtilityService::storeTokenInCookie($details);
        }

        $encrpt = new Encryption();

        $decrypt_data = isset($fb_token) ? $encrpt->decrypt($fb_token['token']) : null;

        if ($fb_token && $fb_token['expires_on']) {
            $expiry = substr($fb_token['expires_on'], 0, 11);
            $days_left = UtilityService::dateDiffInDays($expiry);
            if ($days_left <= 4) {
                FacebookService::get_token();
            }
        }
        return $decrypt_data ? $decrypt_data : null;
    }

    /**
     * Encrypt Facebook token
     *
     * @param string $value
     *
     * @return string Encrypted value
     */
    public static function encrypt_token($value)
    {
        $encrpt = new Encryption();
        $encrypt_data = $value ? $encrpt->encrypt($value) : null;
        return $encrypt_data;
    }

    /**
     * Store the token in cookie
     * @param string  $token
     */
    public static function storeTokenInCookie($token)
    {
        $token = json_encode($token);
        // setting cookie for 2 months
        setcookie('fb_access_token', $token, time() + (60 * 60 * 24 * 30 * 2));
    }

    /**
     * Delete the token in cookie
     */
    public static function deleteTokenFromCookie()
    {
        setcookie('fb_access_token', '', time() - (60 * 60 * 24 * 30 * 2));
    }
}
