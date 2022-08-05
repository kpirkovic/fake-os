set -env

npm run build
npm run backend

cd dist

git init 
ait add -add
git commit -m 'New Deploy'
git push -f git@github.com:kpirkovic/fake-os-first-vue-app.git master:gh-pages

cd-
