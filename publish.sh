PACKAGE_VERSION=$(node -p "require('./package.json').version")
./update-schema.sh
yarn build
docker build -t olepetersen/huddle-ui:$PACKAGE_VERSION .
docker push olepetersen/huddle-ui:$PACKAGE_VERSION