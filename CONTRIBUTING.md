# Contributing to the OSSCameroon Community Website

## Different ways to contribute
There are several ways to bring valuable contributions to OSSCameroon website

- Spotted a bug, [create an issue](https://github.com/osscameroon/website/issues/new) where you explain clearly the problem
- Want to contribute to code, browse the [issues](https://github.com/osscameroon/website/issues) and tackle any of them.
- Worked on an issue, create a PR, if it's relevant, we're going to merge it, otherwise we'll close it.
Yeah, it's simple as this !

## Setting Up a Dev Environment for OSSCameroon Website

This guide sets up a development environment for OSSCameroon website. Work through it once, in order. All `cd` commands here assume you're on the project root folder.

### Fork the Repository on GitHub

A [fork](https://help.github.com/articles/about-forks) is your own copy of the codebase. You need one to contribute.

1. Open the [fork page](https://github.com/osscameroon/website/fork)
2. Check the details (you can provide a different name for your fork, e.g. `osscameroon-website`), then click Create fork.
3. GitHub redirects you to your fork at https://github.com/YOUR_USER_NAME/YOUR_FORK_NAME

In this guide, `origin` means your fork and `upstream` means the main repository. You can delete your fork at any time and start again if anything goes wrong or you simply want to master the process.

### Get the Code Into Your Computer

1. Clone your fork, replacing YOUR_USER_NAME with your GitHub username and YOUR_FORK_NAME with the name you gave to your fork:
```sh
git clone https://github.com/YOUR_USER_NAME/YOUR_FORK_NAME.git
cd YOUR_FORK_NAME
```

2. Add a remote named `upstream` that points at the main repository, so you can sync later:

```sh
git remote add upstream https://github.com/osscameroon/website.git
```
Run `git remote -v` to confirm. You should see `origin` on your fork and `upstream` on `osscameroon/website`.

Example output:
```sh
origin  https://github.com/tem-ctrl/osscameroon-website.git (fetch)
origin  https://github.com/tem-ctrl/osscameroon-website.git (push)
upstream        https://github.com/osscameroon/website.git (fetch)
upstream        https://github.com/osscameroon/website.git (push)
```

## Setup and Run OSSCameroon Website

### Prerequisites

Make sure you computer has all the required tools installed before attempting to run the project locally.

| Tool | Version | Notes |
| ---- | ------- | ----- |
| [Git](https://git-scm.com/) | `Latest` | The version bundled with your system (Linux or Mac) is often outdated. |
| [Node.js](http://nodejs.org/) | `20+` | The “Active LTS” version. See the [LTS schedule](https://nodejs.org/en/about/releases/). |
| [Yarn](https://yarnpkg.com/getting-started/install) | `1.21+` | Requires npm (bundled with Node.js) to be installed first |
| [Python](https://www.python.org/downloads/) | `3.10+` | Pre-installed on Linux and Mac. |
| [Pip](https://pip.pypa.io/en/stable/installation/) | `18.1+` |  |
| Make | `GNU Make 4.2.1` | <ul><li>For Linux an Mac, use the system package manager to install, search the exact command online. e.g. "How to install make on Fedora"</li><li>For Windows, see [Make for Windows](https://gnuwin32.sourceforge.net/packages/make.htm)</li></ul> |
| [meilisearch](https://www.meilisearch.com/docs/resources/self_hosting/getting_started/install_locally) | `Latest` | 🧐 |

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
make install-deps
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
make run
```

The api runs on `http://127.0.0.1:8811`

<!-- TODO: Add local setup guides for scraper -->