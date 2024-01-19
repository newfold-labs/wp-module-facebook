<?php
namespace NewfoldLabs\WP\Module\Facebook\Accessors;

use NewfoldLabs\WP\Module\Facebook\Accessors\User;
use NewfoldLabs\WP\Module\Facebook\Accessors\Business;

class SocialData {
  // Properties
  public $source ="";
  public $User;
  public $Business;
  public function __construct ()
  {
      $this->User = new User();
      $this->Business = new User();

  }

  // Methods
  function set_source($source) {
    $this->source = $source;
  }
  function get_source() {
    return $this->source;
  }

  function set_User($User) {
    $this->User = $User;
  }
  function get_User() {
    return $this->User;
  }

  function set_Business($Business) {
    $this->Business = $Business;
  }
  function get_Business() {
    return $this->Business;
  }

}
?>