<?php

namespace NewfoldLabs\WP\Module\Includes\Facebook;


class FacebookController{
    /**
	 * REST namespace
	 *
	 * @var string
	 */
	protected $namespace = 'newfold-ecommerce/v1';

	/**
	 * REST base
	 *
	 * @var string
	 */
	protected $rest_base = '/facebook';


    // public function __construct(  ) {
	// }

	/**
	 * Registers rest routes for PluginsController class.
	 *
	 * @return void
	 */
	public function register_routes() {
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/login',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_facebook_login' ),
					// 'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
	}

    public function get_facebook_login() {
		// $integration = array(
		// 	'captive' => null,
		// 	'plugin' => $this->get_plugin_details( 'nfd_slug_woo_razorpay' ),
		// );
		// $is_captive_flow_complete = \get_option( 'nfd-ecommerce-captive-flow-razorpay', 'false' );
		// $razorpay_settings = \get_option( 'woocommerce_razorpay_settings', null );
		// $details = array (
		// 	'settings' => $razorpay_settings
		// );
		// if ($is_captive_flow_complete === 'true') {
		// 	$environment = '';
		// 	if ( $razorpay_settings !== null && isset( $razorpay_settings['key_id'] ) ) {
		// 		$environment = str_starts_with( $razorpay_settings['key_id'], 'rzp_test_' ) ? 'sandbox' : 'live';
		// 	}
		// 	$details['environment'] = $environment;
		// }
		// echo FacebookConnect::getAccessToken();
		return new \WP_REST_Response(
			array(
				'complete'    => "testing", 
			),
			200
		);
			
	}
}
?>