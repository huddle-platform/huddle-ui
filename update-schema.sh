rm -Rf graph
git archive --remote git@gitlab.lrz.de:projecthub/gql-api.git HEAD graph/schema/* | tar -x
yarn generate-gql