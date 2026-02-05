<?php

namespace NewfoldLabs\WP\Module\Facebook;

/**
 * Module loading wpunit tests.
 *
 * @coversNothing
 */
class ModuleLoadingWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Verify WordPress factory is available.
	 *
	 * @return void
	 */
	public function test_wordpress_factory_available() {
		$this->assertTrue( function_exists( 'get_option' ) );
		$this->assertNotEmpty( get_option( 'blogname' ) );
	}

	/**
	 * Verify add_action exists (bootstrap uses it).
	 *
	 * @return void
	 */
	public function test_wordpress_hooks_available() {
		$this->assertTrue( function_exists( 'add_action' ) );
		$this->assertTrue( function_exists( 'add_filter' ) );
	}

	/**
	 * Verify Facebook class exists.
	 *
	 * @return void
	 */
	public function test_facebook_class_exists() {
		$this->assertTrue( class_exists( 'NewfoldLabs\WP\Module\Facebook\Facebook' ) );
	}

	/**
	 * Verify FacebookController class exists.
	 *
	 * @return void
	 */
	public function test_facebook_controller_class_exists() {
		$this->assertTrue( class_exists( 'NewfoldLabs\WP\Module\Facebook\RestApi\FacebookController' ) );
	}
}
