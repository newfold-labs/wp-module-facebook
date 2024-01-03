<?php
namespace NewfoldLabs\WP\Module\Facebook\RestApi;

use NewfoldLabs\WP\Module\ECommerce\Permissions;
use NewfoldLabs\WP\ModuleLoader\Container;
use NewfoldLabs\WP\Module\Data\HiiveConnection;

use NewfoldLabs\WP\Module\Facebook\Services\FacebookService;
class FacebookController {
    protected $namespace = 'newfold-facebook/v1';

    protected $rest_base = '/facebook';
   

    public function register_routes() {
        register_rest_route(
			$this->namespace,
			$this->rest_base . '/hiive',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_hiive_token' ),
					//'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
        register_rest_route(
            $this->namespace,
            $this->rest_base . '/logout',
            array(
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'logout' ),
                    'permission_callback'  => null
                ),
            )
        );

        register_rest_route(
            $this->namespace,
            $this->rest_base . '/details',
            array(
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_fb_details' ),
                    'permission_callback'  => null
                ),
            )
        );
    }
    
    public function get_hiive_token() {
	    $hiive_token = HiiveConnection::get_auth_token();
		if ( ! $hiive_token ) {}
		return new \WP_REST_Response(
			array(
				'token' => $hiive_token ? $hiive_token : 'test2',
			),
			200
		);
	}

    public function logout() {
		delete_option('fb_token');
        $fb = FacebookService::delete_token();
        return new \WP_REST_Response(
			array(
				'status'    => 'success', 
				'loggedIn'     => false
			),200
		);
	}

    public function get_fb_details() {
        $fb_details = FacebookService::get_fb_details();
        return new \WP_REST_Response(
			array(
				'status'    => 'success', 
				'details'     => $fb_details
			),200
		);
	}
    
}
?>