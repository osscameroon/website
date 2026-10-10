# Contributing to the OSSCameroon Community Website

## Different ways to contribute
There are several ways to bring valuable contributions to OSSCameroon website

- Spotted a bug, [create an issue](https://github.com/osscameroon/website/issues/new) where you explain clearly the problem
- Want to contribute to code, browse the [issues](https://github.com/osscameroon/website/issues) and tackle any of them.
- Worked on an issue, create a PR, if it's relevant, we're going to merge it, otherwise we'll close it.
Yeah, it's simple as this !

### Fork the Repository on GitHub

A [fork](https://help.github.com/articles/about-forks) is your own copy of the codebase. You need one to contribute.

1. Open the [fork page](https://github.com/osscameroon/website/fork)
2. Check the details (you can provide a different name for your fork, e.g. `osscameroon-website`), then click Create fork.

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
<!-- TODO: Add rules for creating an issue, a PR... -->
