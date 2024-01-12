<?php
namespace NewfoldLabs\WP\Module\Facebook\Accessors;

use NewfoldLabs\WP\Module\Facebook\Accessors\Users;
use NewfoldLabs\WP\Module\Facebook\Accessors\Business;

class FacebookData {
  // Properties
  public $source ="";
  public $Users;
  public $Business;
  public function __construct ()
  {
      $this->Users = new Users();
      $this->Business = new Business();

  }

  // Methods
  function set_source($source) {
    $this->source = $source;
  }
  function get_source() {
    return $this->source;
  }

  function set_Users($Users) {
    $this->Users = $Users;
  }
  function get_Users() {
    return $this->Users;
  }

  function set_Business($Business) {
    $this->Business = $Business;
  }
  function get_Business() {
    return $this->Business;
  }

}
?>