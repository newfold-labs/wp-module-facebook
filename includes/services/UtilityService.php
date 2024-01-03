<?php 
namespace NewfoldLabs\WP\Module\Facebook\Services;

use NewfoldLabs\WP\Module\Facebook\Services\ExternalApiService;
use NewfoldLabs\WP\Module\Data\Helpers\Encryption;
use NewfoldLabs\WP\Module\Data\HiiveConnection;

class UtilityService{
    public static function get_token(){
        $hiive_token = HiiveConnection::get_auth_token() ? HiiveConnection::get_auth_token() :  'test2';
        $url = 'http://192.168.1.6:8787/get/token?hiive_token='. $hiive_token;
        $result = ExternalApiService::CallAPI('GET', $url);
        return $result ? $result->token : null;
     }

    /**
	 * Decrypt Facebook token
	 *
	 *
	 * @return string Decrypted value
	 */
	public static function decrypt_token() {
        $fb_token = get_option('fb_token', false);
        $encrpt = new Encryption();
        $decrypt_data = $fb_token ? $encrpt->decrypt($fb_token) : null;
        return $decrypt_data;
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
}
?>