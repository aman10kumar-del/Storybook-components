
# Snapshot deploy
1. Checkout ultra-beta
2. Merge your branch to ultra-beta branch locally via `git merge` command
3. Modify version in package.json to be of the format 1.2.0-beta1
4. http://ci.paytmdgt.io/job/miniapps/job/staging/job/paytm-common-ui/ use this job



# Prod deploy
1. Merge all changes to master
2. Raise a PR like this https://bitbucket.org/paytmteam/paytm-common-ui/pull-requests/161/diff from ultra/release-prep  branch for version upgrade
3. Deploy http://ci.paytmdgt.io/job/miniapps/job/production/job/paytm-common-ui/