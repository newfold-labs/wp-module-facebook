<?php
namespace NewfoldLabs\WP\Module\Facebook\RestApi;


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
    }

    public function logout() {
		delete_option('fb_token');
        return new \WP_REST_Response(
			array(
				'status'    => 'logged out', 
				'login'     => false
			),200
		);
	}
    
}
?>