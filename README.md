## Accessing this Power-Up

This Power-Up's docs folder is published using Github Pages and can be accessed from this URL: https://emgoto.github.io/checklist/ You'll need to put that link in your Trello Power-ups admin page.

## Watch any js changes

`npm run build -- --watch`

## Tests


## Testing the power-up locally with Jekyll and ngrok

Github pages uses Jekyll so you'll need to do a few things to test this locally:

```
gem install github-pages
jekyll serve
./ngrok http 4000 #in another terminal window
```
[See a full explanation here](https://www.emgoto.com/testing-trello-power-ups-on-github-pages/)

## Pushing your changes

Make sure to run `npm run build` before pushing changes. This will use the settings in `webpack.config.js` and put your js files into the `docs/js` folder.

We use docs instead of public as this is a limitation of the way Github Pages works.