<?php
namespace NewfoldLabs\WP\Module\Facebook;

/**
 * Class Facebook
 *
 * @package NewfoldLabs\WP\Module\Facebook
 */
class Facebook{

    /* Container loaded from the brand plugin.
    *
    * @var Container
    */
   protected $container;

   /**
    * Array map of API controllers.
    *
    * @var array
    */
   protected $controllers = array(
       'NewfoldLabs\\WP\\Module\\Facebook\\RestApi\\HiiveController',
   );

    public function __construct( Container $container ) {
        $this->container = $container;
        echo "<script>console.log('helloo')</scipt>";
        die();
    }
}

?>