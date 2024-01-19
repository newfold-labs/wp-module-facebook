<?php
namespace NewfoldLabs\WP\Module\Facebook\RestApi;

use NewfoldLabs\WP\Module\Data\HiiveConnection;

use NewfoldLabs\WP\Module\Facebook\Services\FacebookService;
use NewfoldLabs\WP\Module\Facebook\Services\UtilityService;
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
					'permission_callback'  => array($this, 'rest_is_authorized_admin')
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
                    'permission_callback'  => array($this, 'rest_is_authorized_admin')
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
                    'permission_callback'  => array($this, 'rest_is_authorized_admin')
                ),
            )
        );

        register_rest_route(
            $this->namespace,
            $this->rest_base . '/fb_token',
            array(
                array(
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => array( $this, 'post_fb_token' ),
                    'permission_callback'  => array($this, 'rest_is_authorized_admin')
                ),
            )
        );

        register_rest_route(
            $this->namespace,
            $this->rest_base . '/fb_token',
            array(
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_fb_token' ),
                    'permission_callback'  => array($this, 'rest_is_authorized_admin')
                ),
            )
        );
    }
    
    public function get_hiive_token() {
	    $hiive_token = HiiveConnection::get_auth_token();
		if ( ! $hiive_token ) {}
		return new \WP_REST_Response(
			array(
				'token' => $hiive_token ? $hiive_token : 'test6',
			),
			200
		);
	}

    public function logout() {
		delete_option('fb_token');
        delete_option("nfd_fb_details");
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
        if(!empty($fb_details->error) || !empty($fb_details["error"])){
            return new \WP_Error(
                'Bad request', $fb_details["error"], array('status' => 400)
            ); 
        }
        return new \WP_REST_Response(
			array(
				'status'    => 'success', 
				'details'     => $fb_details
			),200
		);
	}

    public function post_fb_token($request) {
        $fb_token = FacebookService::get_token();
        return new \WP_REST_Response(
			array(
				'status'    => 'success', 
				'message'     => 'updated successfully!'
			),200
		);
	}

    public function get_fb_token() {
        $fb_token = UtilityService::decrypt_token();
        if(!isset($fb_token)){
            $fb_token = FacebookService::get_token();
        }
        // if (!isset($_COOKIE['fb_access_token'])) {
        //     UtilityService::storeTokenInCookie($fb_token);
        // }
        return new \WP_REST_Response(
			array(
				'status'    => 'success', 
				'fb_token'     => $fb_token
			),200
		);
	}

    public static function rest_is_authorized_admin() {
        $admin = 'manage_options';
		return \is_user_logged_in() && \current_user_can( $admin );
	}
    
}
?>