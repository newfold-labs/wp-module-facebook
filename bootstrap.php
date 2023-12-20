<?php

use NewfoldLabs\WP\ModuleLoader\Container;
use function NewfoldLabs\WP\ModuleLoader\register;
use  NewfoldLabs\WP\Module\Facebook;

if ( function_exists( 'add_action' ) ) {
	add_action(
		'plugins_loaded',
		function () {
            echo "<script>console.log('script')</script>";

			register(
				[
					'name'     => 'facebook',
					'label'    => __( 'Facebook', 'wp-module-facebook' ),
					'callback' => function ( Container $container ) {
						new Facebook( $container );
					},
					'isActive' => true,
					'isHidden' => true,
				]
			);

		}
	);

}
