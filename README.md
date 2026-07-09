# WTWR — What to Wear?

An app that tells you what to wear based on the weather. Pulls live conditions from OpenWeather, sorts them into hot/warm/cold, and suggests clothing accordingly. You can sign up, add your own items, like things in the shared catalog, and edit your profile.

Backend repo: https://github.com/jasssingh191/se_project_express

## Stack

React + Vite on the front end, Express/MongoDB on the back end, JWT for auth.

## Running it locally

You'll need Mongo running plus both servers up at the same time.

```bash
# terminal 1
mongod

# terminal 2 (se_project_express)
npm run dev      # localhost:3001

# terminal 3 (this repo)
npm run dev       # localhost:3000
```

## Temperature cutoffs

- Hot: 86°F and up — light stuff
- Warm: 66-85°F — casual
- Cold: under 66°F — layer up

## Pitch video

[Here's a walkthrough](https://drive.google.com/file/d/1ZPrl44adUbryscwPxmeRDKwomLMZC-rI/view?usp=drive_link) of the project and some of the challenges I ran into building it.
