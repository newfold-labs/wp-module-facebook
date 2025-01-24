import { NewfoldRuntime } from '@newfold/wp-module-runtime';

export default {
  facebook_module: {
    base_url: 'https://graph.facebook.com/v18.0',
    debug_token: '/debug_token',
    token_phrase: 'secret_token_phrase',
  },
  wordpress: {
    access: NewfoldRuntime.createApiUrl('/newfold-facebook/v1/facebook/hiive'),
    fb_token: NewfoldRuntime.createApiUrl(
      '/newfold-facebook/v1/facebook/get-token'
    ),
    post_token: NewfoldRuntime.createApiUrl(
      '/newfold-facebook/v1/facebook/post-token'
    ),
    facebook_details: NewfoldRuntime.createApiUrl(
      '/newfold-facebook/v1/facebook/details'
    ),
    facebook_logout: NewfoldRuntime.createApiUrl(
      '/newfold-facebook/v1/facebook/logout'
    ),
  },
  cf_worker: {
    base_url: 'https://hiive.cloud',
    login_screen: 'https://hiive.cloud/workers/facebook-connect/',
    get_token:
    'https://hiive.cloud/workers/facebook-connect/get/token?hiive_token=',
  delete_token:
    'https://hiive.cloud/workers/facebook-connect/delete/token?hiive_token=',
  },
};
