<?php
namespace NewfoldLabs\WP\Module\Facebook\RestApi;

use NewfoldLabs\WP\Module\Facebook\Services\FacebookService;
class FacebookController {
    protected $namespace = 'newfold-facebook/v1';

    protected $rest_base = '/facebook';
   

    public function register_routes() {
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