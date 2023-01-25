# Worldiesle

## Tech Overview

Worldiesle is a NextJS app deployed using Vercel.

It relies on Static Site Generation using NextJS's [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching/get-static-props), meaning that page content is generated at build time, and returned from the server pre-rendered.

The site is revalidated daily, at 00:00:00 UTC, meaning that the `getStaticProps` is run at this time, which updates the pre-rendered site with a new set of images/answers for each new daily quiz. The revalidation is triggered by a github action (`github/workflows/revalidate.yml`), which hits a custom endpoint (see `pages/api/revalidate.ts`) to trigger the revalidation.

The details for each new daily goal come from a JSON file called `goals.json` stored in an AWS S3 bucket. Likewise, images used for each quiz are stored in said bucket, with signed urls being returned for the day's images whenever `getStaticProps` is run. These files are not included in this repo, because although we want to code to be public, the data wants to be hidden from anyone accessing this repo.

## Getting Started

First, install the required dependencies with `npm install` or `yarn install`.

Second, you will need to get environment variables for a `.env` file from the author or fellow developers.

You can then run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
