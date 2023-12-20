<?php
namespace NewfoldLabs\WP\Module\Facebook\RestApi;

use NewfoldLabs\WP\Module\Data\HiiveConnection;

class IntegrationsController {
    protected $namespace = 'newfold-ecommerce/v1';

    protected $rest_base = '/hiive';
    public function __construct() {
		add_action( 'rest_api_init', array($this, "register_routes"));
	}

    public function register_routes() {
        \register_rest_route(
            $this->namespace,
            $this->rest_base . '/token',
            array(
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_hiive_token' ),
                    'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
                ),
            )
        );
    }

    public function get_hiive_token() {
		$hiive_token = HiiveConnection::get_auth_token();

		return new \WP_REST_Response(
			array(
				'token' => $hiive_token ? $hiive_token : 'test2',
			),
			200
		);
	}
    
}
?>