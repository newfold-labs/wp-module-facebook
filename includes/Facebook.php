<?php
namespace NewfoldLabs\WP\Module\Facebook;

use NewfoldLabs\WP\ModuleLoader\Container;

/**
 * Class Facebook
 *
 * @package NewfoldLabs\WP\Module\Facebook
 */
class Facebook
{
  /*
   * Container loaded from the brand plugin.
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

  public function __construct(Container $container)
  {
    $this->container = $container;
    add_action('rest_api_init', array($this, 'register_routes'));
		\add_action( 'init', array( __CLASS__, 'load_text_domain' ), 100 );
  }

  public function register_routes()
  {
    foreach ($this->controllers as $controller) {
      $rest_api = new $controller();
      $rest_api->register_routes();
    }
  }

	/**
	 * Load text domain for Module
	 *
	 * @return void
	 */
	public static function load_text_domain() {

		\load_plugin_textdomain(
			'wp-module-facebook',
			false,
			NFD_FACEBOOK_DIR . '/languages'
		);
	}
}
