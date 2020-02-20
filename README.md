# carbon-addons-angular

## Common Addons for Carbon Angular projects

This repo represents a collection of useful components and patterns that aren't codified in the core Carbon Design System or Carbon Components Angular.

### Prefixes and folder structure

Largely TBD but in order to keep contributions sane there needs to be some logical organization of the folders and prefixes used in the components. Not all components and patterns will be common to each org, and some components may be duplicated with changes. There are a few ways to account for this.

```
|- src
  |- component // base implementation
  |- component-sterling // sterling specific implementation
  |- component-cloud // cloud specific implementation
```

```
|- src
  |- component // base implementation
    |- sterling // sterling specific implementation
    |- cloud // cloud specific implementation
```

This results in one package, with many entry points, and a lot of code that may not be needed by all consuming teams. There may also be some confusion around which components and modules are allowed to be used, since they're all available in one package. In some respects this is a positive, since it would encourage cross org code use, at the expense of potential incositencies.

There are several challenges associated with each approach presented:

- what is the "base implementation"?
	- who decides that?
- is there a "base implementation" at all?
	- Is that okay?
- what is the process when there is no existing "base implementation"?
- what is the process when one implementation should become the base?
- how should changes and updates be shared?
- how to breaking changes work?
	- if a org specific component needs to publish a breaking change, what should they do?
	- is there a specific timeline?
	- is consensus needed?
- how do updates to older major versions work?
	- we can likely use the same method as `carbon-components-angular`, since everything will share a major version
- how are issues handled?
	- who should respond?
	- how are they organized?
- how are PRs handled?
	- who needs to review for code to be safely merged?
	- can GitHub CODEOWNERS help here?
- how are new orgs and packages onboarded?
- how are new CODEOWNERS added?

Another option is to present the repo as a monorepo of related packages. This still achieves the goal of centralizing source changes, while also allowing teams the flexibility to publish breaking changes and other new versions as needed

```
|- packages
  |- addons
    |- src
	  |- component // base implementation
  |- addons-sterling
    |- src
	  |- component // sterling specific implementation
  |- addons-cloud
    |- src
	  |- component // cloud specific implementation
```

This results in multiple packages, but the consuming team will likely need to install two - `carbon-addons-angular` and `carbon-addons-[org name here]-angular`. Two dependencies instead of one, however this also reduces the amount of redundant code consumed, and potential confusion between different implementations (sterling teams should only use sterling or core, cloud teams should only use cloud or core). This does also increase the barriers to cross org code reuse, since a team would need to download another package, at the expense of stronger limits on which components can be used in the first place.

There are still some challenges with this approach:

- what is the "base implementation"?
	- who decides that?
- is there a "base implementation" at all?
	- Is that okay?
- what is the process when there is no existing "base implementation"?
- what is the process when one implementation should become the base?
- how should changes and updates be shared?
- how do updates to older major versions work?
	- in a lerna managed repo with independent versioning it seems like there isn't a great way other than manually bumping
	- a lerna repo with fixed versioning doesn't really seem to solve the core issue (allowing packages to be at different major and minor versions)
- how are issues handled?
	- who should respond?
	- how are they organized?
- how are PRs handled?
	- who needs to review for code to be safely merged?
	- can GitHub CODEOWNERS help here?
- how are new orgs and packages onboarded?
- how are new CODEOWNERS added?
- how are old updates to old versions handled?

### Contributing

#### Quickstart
- fork IBM/carbon-addons-angular and clone it locally
- run `npm install` to grab all the dependencies, then `npm run storybook` to start storybook
- **if you are adding a component**:
  - add a folder with your component code, styles, tests and story under `src`
  - export your module from `index.ts`
- **if you are contributing a fix**:
  - add your fix, update the documentation as needed
  - consider adding or modifying a test case to cover the fix
- follow the [Angular style guide](https://angular.io/styleguide)
- be sure to run `npm test` and `npm run lint` to make sure the tests and linter pass
- submit a PR

#### Pull request guidelines
- **Keep changes small and focused.**
- If you create a pull request and then realize it is not ready to be merged, prepend "WIP: " (For example,  WIP: Fixed text overflow in accordion headers.) and assign a WIP label.
- Include a description of changes
  - attach a screenshot (or a gif!) for design reference if needed
  - reference the related issue
  	- "closes #123" or "fixes #123" will close issue #123 once the PR is merged
  	- "issue #123" just references the issue. Only use this if you definitely need the issue to remain open.
  - @mention any specific other developers that need to be aware of the changes
- add the "needs review" label along with any other relevant labels
- [link to code review checklist goes here](#)

#### Issues submission guidelines
- **One issue per defect** - do not open an issue that spans multiple defects
- provide a descriptive title that mentions the component and version the issue covers
- provide
  - version(s) affected
  - a description of the issue
  - steps taken to produce the issue
  - expected behaviour
  - current behaviour
  - screenshots if needed
  - relevant code snippets
  - links to application source code or running demo ([Codesandbox is awesome for this!](https://codesandbox.io/s/angular)) (including connection/authentication information)
- add relevant labels (bug, accessibility, design, discussion, feature, etc)
- if you have a fix to contribute, assign yourself, otherwise leave unassigned

### Resources
 - [Style guide (WIP)](https://github.com/IBM/carbon-components-angular/wiki/Style-guide)
 - [General component API guidelines (WIP)](https://github.com/IBM/carbon-components-angular/wiki/Component-API-guidelines)
 - [Angular style guide](https://angular.io/styleguide)
 - I18N tooling
	- [I18N guide](https://angular.io/guide/i18n)
	- [ngx-translate](https://github.com/ngx-translate/core)
 - (Angular 2+ doesn't have anything like ngAria, instead here's [The A11Y Project](http://a11yproject.com/), [WAI-ARIA specs](https://www.w3.org/TR/wai-aria/), and [WAI-ARIA Authoring Practices](https://www.w3.org/TR/2016/WD-wai-aria-practices-1.1-20160317/))
 - [TypeScript docs](https://www.typescriptlang.org/docs/tutorial.html)

 ### Resources
 - [Style guide (WIP)](https://github.com/IBM/carbon-components-angular/wiki/Style-guide)
 - [General component API guidelines (WIP)](https://github.com/IBM/carbon-components-angular/wiki/Component-API-guidelines)
 - [Angular style guide](https://angular.io/styleguide)
 - I18N tooling
	- [I18N guide](https://angular.io/guide/i18n)
	- [ngx-translate](https://github.com/ngx-translate/core)
 - (Angular 2+ doesn't have anything like ngAria, instead here's [The A11Y Project](http://a11yproject.com/), [WAI-ARIA specs](https://www.w3.org/TR/wai-aria/), and [WAI-ARIA Authoring Practices](https://www.w3.org/TR/2016/WD-wai-aria-practices-1.1-20160317/))
 - [TypeScript docs](https://www.typescriptlang.org/docs/tutorial.html)
