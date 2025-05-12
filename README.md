# facebook-module-connect

## How it works?

1. This module will pull user information from Facebook for site generation.
2. It will facilitate the OAuth flow and handle the storage of the token in WP.

## What it does?

1. When connection does not exist, then facebook-module-connect will display a FB connect CTA to customer.
2. When connection is successfully established, module will provide utility functions with access to the facebook APIs, which can be utilized by other newfold lab modules.

## Releases

Run the `Newfold Prepare Release` github action to automatically bump the version (either patch, minor or major version), and update build and language files all at once. It will create a PR with changed files for review. Using this workflow, we can skip all the manual steps below (1-5).

### Manual Release 

1. Update the version number in the folling files:
- package.json
- bootstrap.php

2. Update build files.

3. Update language files.

4. Push changes to a release branch.

5. Create a release PR for review.

6. Finally, merge release PR (after approved) and issue a release via github release.

7. Workflows will publish the release in the appropriate places.
