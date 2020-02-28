#!/usr/bin/env bash

set -e # exit with nonzero exit code if anything fails

# exit with an error if the build fails
if [[ ${TRAVIS_TEST_RESULT=0} == 1 ]]; then
  exit 1;
fi

# run the build
npm run build
#deploy with semantic-release
npm run semantic-release

# deploy to gh pages
if [[ $TRAVIS_BRANCH == "master" ]]; then
	mkdir -p pages
	cd pages

	git init

	git config user.name "carbon-bot"
	git config user.email "carbon@us.ibm.com"

	git pull "https://git:${GH_TOKEN}@github.com/IBM/carbon-addons-angular.git" gh-pages

	# TODO: uncomment when we have documentation generation
	# mkdir -p documentation
	# cp -R ../dist/docs/documentation/* ./documentation
	cp -R ../dist/docs/storybook/* ./

	version=$(node -e 'const package = require("./../dist/package.json"); console.log(package.version);')
	mkdir -p $version
	# TODO: uncomment when we have documentation generation
	# mkdir -p $version/documentation
	# cp -R ../dist/docs/documentation/* $version/documentation
	cp -R ../dist/docs/storybook/* $version

	echo "addons-angular.carbondesignsystem.com" > CNAME

	# in this case we want the script to keep running, so we can actually check the $? (status) var
	set +e
	# Commit all the things into the repo
	git add .
	git commit -m "Deploy to GitHub Pages"

	# Force push to gh-pages if there was something to commit
	if [ $? -eq 0 ]; then
		git push --force "https://git:${GH_TOKEN}@github.com/IBM/carbon-addons-angular.git" master:gh-pages > /dev/null 2>&1
	fi
fi
# just to be sure we exit cleanly
exit 0;
