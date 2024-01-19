<?php

use NewfoldLabs\WP\ModuleLoader\Container;
use function NewfoldLabs\WP\ModuleLoader\register;
use  NewfoldLabs\WP\Module\Facebook\Facebook;

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	return;
}

if ( function_exists( 'add_action' ) ) {
	add_action(
		'plugins_loaded',
		function () {
           register(
				[
					'name'     => 'facebook',
					'label'    => __( 'Facebook', 'wp-module-facebook' ),
					'callback' => function ( Container $container ) {
						if ( ! defined( 'NFD_FACECBOOK_WORKER' ) ) {
							define( 'NFD_FACECBOOK_WORKER', 'https://facebook-connect.bluehost.workers.dev' );
						}
						if ( ! defined( 'NFD_FACECBOOK_GRAPH_BASE' ) ) {
							define( 'NFD_FACECBOOK_GRAPH_BASE', 'https://graph.facebook.com' );
						}
						new Facebook( $container );
					},
					'isActive' => true,
					'isHidden' => true,
				]
			);

		}
	);

}
