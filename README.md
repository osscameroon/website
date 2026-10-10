# OssCameroon

Our goal as a community is to improve the lives of individual members of the society. We hope to accomplish this by reinforcing Cameroonian developers to take up the habit of contributing to open source projects and technologies; especially projects with the potential to enhance the quality of life for our local communities. By promoting mentorship, collaboration and knowledge sharing, we ensure to provide a joyful environment for developers to put their best skill in the service of the society.

You can access the WebSite [here](https://www.osscameroon.com/).

## Community Chat

- Telegram : https://t.me/joinchat/UpKZh_T3W02LsGvQ
- Telegram channel: https://t.me/osscameroonchannel

## Application Layers

### The Frontend (`frontend`)

Here is the part responsible to serve the page the users will interact with. The main feature
- Browse the list of developers registered on GitHub
- Browse the list of projects on GitHub maintained by Cameroonian develop
- View the trending tweets on the hashtag #caparledev

### The API (`api`)

## The Scrapers (`scraper`)

On the scraper, we have :
- The Twitter scraper (For tweets containing a specific hashtag)
- The github scraper to scrap projects and developers list.
We're going to add other scrapers !

## Setting Up a Dev Environment

This guide sets up a development environment for OSSCameroon website. Work through it once, in order. All `cd` commands here assume you're on the project root folder.

### Prerequisites

Make sure you computer has all the required tools installed before attempting to run the project locally.

| Tool | Version | Notes |
| ---- | ------- | ----- |
| [Git](https://git-scm.com/) | `Latest` | The version bundled with your system (Linux or Mac) is often outdated. |
| [Node.js](http://nodejs.org/) | `20+` | The “Active LTS” version. See the [LTS schedule](https://nodejs.org/en/about/releases/). |
| [Yarn](https://yarnpkg.com/getting-started/install) | `1.21+` | Requires npm (bundled with Node.js) to be installed first |
| [Python](https://www.python.org/downloads/) | `3.x` | Pre-installed on Linux and Mac. |
| [Pip](https://pip.pypa.io/en/stable/installation/) | `18.1+` |  |
| Make | `GNU Make 4.2.1` | <ul><li>For Linux an Mac, use the system package manager to install, search the exact command online. e.g. "How to install make on Fedora"</li><li>For Windows, see [Make for Windows](https://gnuwin32.sourceforge.net/packages/make.htm)</li></ul> |
| [meilisearch](https://www.meilisearch.com/docs/resources/self_hosting/getting_started/install_locally) | `Latest` | 🧐 |

### Clone the Repository

```sh
git clone https://github.com/osscameroon/website.git
cd website
```

### Install the dependencies

1. Install global dependencies
```sh
yarn install # or simply yarn
```

2. Install frontend dependencies and create the `.env` file
```sh
cd frontend
yarn install
cp .env.example .env
```
The environment file uses the staging backend by default, you can stick with it if you're working on the frontend side of the app. Otherwise, if running the backend locally, then open the `.env` file and replace `https://api.stage.osscameroon.com` with `http://127.0.0.1:8811`

3. Install backend dependencies
```sh
cd api
make install-deps # The same command is for scrapers
```

### Start the App

1. Frontend
```sh
cd frontend
yarn dev
```
Access the application on `http://localhost:3000` or `http://127.0.0.1:3000`

2. Backend
``` sh
cd api
make run # The same command is used to run scrapers
```

The api runs on `http://127.0.0.1:8811`

## How to contribute
The OSSCameroon community is possible thanks to kind volunteers like you. We welcome all contributions to the community and are excited to welcome you aboard.
> Please follow [Contribution guidelines](./CONTRIBUTING.md) to contribute


## LICENSE

- [GPL](./LICENSE)
