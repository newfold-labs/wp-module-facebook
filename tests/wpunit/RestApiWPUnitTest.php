<?php

namespace NewfoldLabs\WP\Module\Facebook;

use NewfoldLabs\WP\Module\Facebook\RestApi\FacebookController;

/**
 * REST API wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Facebook\RestApi\FacebookController
 */
class RestApiWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Verifies that rest_api_init registers newfold-facebook REST routes.
	 *
	 * Routes must be registered on rest_api_init. Register the controller
	 * inside that action so WordPress does not trigger an incorrect usage notice.
	 *
	 * @return void
	 */
	public function test_rest_api_init_registers_facebook_routes() {
		$controller = new FacebookController();
		add_action(
			'rest_api_init',
			function () use ( $controller ) {
				$controller->register_routes();
			}
		);
		do_action( 'rest_api_init' );
		$server = rest_get_server();
		$routes = $server->get_routes();
		$found  = array_filter(
			array_keys( $routes ),
			function ( $route ) {
				return strpos( $route, 'newfold-facebook' ) !== false;
			}
		);
		$this->assertNotEmpty( $found, 'Expected newfold-facebook routes to be registered' );
	}
}
