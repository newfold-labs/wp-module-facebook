<?php
namespace NewfoldLabs\WP\Module\Facebook;

use NewfoldLabs\WP\ModuleLoader\Container;
use NewfoldLabs\WP\Module\Data\Helpers\Encryption;

/**
 * Class Facebook
 *
 * @package NewfoldLabs\WP\Module\Facebook
 */
class Facebook{

    /* Container loaded from the brand plugin.
    *
    * @var Container
    */
   protected $container;

   /**
    * Array map of API controllers.
    *
    * @var array
    */
   protected $controllers = array(
       'NewfoldLabs\\WP\\Module\\Facebook\\RestApi\\FacebookController',
   );

    public function __construct( Container $container ) {
        $this->container = $container;
        add_action( 'rest_api_init', array( $this, 'register_routes' ) );
        add_action('pre_update_option_fb_token', array($this, 'encrypt_token'));
    }

    public function register_routes(){
      foreach($this->controllers as $controller){
        $rest_api = new $controller();
        $rest_api->register_routes();
      }
    }

  /**
	 * Encrypt Facebook token
	 *
	 * @param string $value 
	 *
	 * @return string encrypted value
	 */
	public function encrypt_token( $value ) {
        $encrpt = new Encryption();
        $encrypt_data = $encrpt->encrypt($value);
        return $encrypt_data;
	}

}

?>