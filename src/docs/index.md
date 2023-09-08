---
templateEngine: md,njk
---

This is the documentation for the Competency Answerability Dashboard prototype tool created by
[Open Innovations](https://open-innovations.org) on behalf of the UK Parliamentary Digital Services.

Using this tool you can explore whether or not given competencies are answerable given the current and
potential future designs of the Register(s) of Members' Financial Interests.

<html>{% include "fragments/caveat.njk" %}</html>

## Tool Design

<html>{% include "fragments/overview.njk" %}</html>

### Data Model

<html>{{ comp.mermaid.diagram({ content: erDiagram }) | safe }}</html>

#### Competency

Competencies are derived from the
[**evidence** collected during a recent review](https://docs.google.com/spreadsheets/d/1iRsQBRPChMVFitSGBtNJFGNBvFT8XGKQYYqu40zy_OM/edit?usp=sharing).

The original evidence is downloaded to the site as `src/_data/evidence.csv`.
This is automated as a GitHub action (in `.github/workflows/update-data.yml`) which runs
[at 45 minutes past every 3rd hour from 9 through 18 on Monday to Friday.](https://crontab.guru/#45_9-18/3_*_*_1-5).

The `ID`, `Duplicates` and `Competency` fields are used to populate the files in `src/_data/comptency/`
with core reference data.
The `scripts/create_all_the_competencies.py` script is used to populate or update the local references.

Competencies are mapped to features to enable the calculation of answerability.
This is done in the `src/_data/competency/` folder, with each competency having a separate data file.
These are named per reference ID in the evidence CSV.

The following fields can be defined:

* `competency` Name of the competency - derived from the evidence file.
* `duplicate_of` List of other competencies that this duplicates.
  If this list has any entries, the competency is excluded from the ruleset dashboard.
* `dependencies` A list of required features to be able to answer this competency.
  These are provided in namespaced form enabling them to be uniquely identified.
  Lists of features for each scope can be found on [the features pages](/features/).

#### Categories

The `RMFI Category` field from the `src/_data/evidence.csv` file is used to create dashboard sections. The order of these
sections is defined in the `src/_data/dashboard/categories.yml` file.

#### Scope

Scopes distinguish between different contexts.
They exist in two places.

Firstly, they are the root namespace of the feature definition.
Practically, this means that they are the names of files in the `src/_data/features/` folder of the git repo.
Create a new file in this folder and define the features as key/value pairs to add a suite of features within a new scope.

Secondly, scopes are referenced in the ruleset files (found in the `src/_data/rulesets/` folder).
This defines the scope for the given ruleset, and features in scope namespaces other than this are removed from consideration.
Scopes here must match the names of the scopes defined in the features folder.

In addition, the details of the scopes is held in `src/_data/scopes.yaml`. At present, this is limited to the name.

#### Feature

Features are derived from current or potential attributes of the register.
These could be simple field definitions or they could be capabilites such as field-level validation.
The concept is kept vague to allow for incorporation of as yet unforseen edge cases.

They are defined in the `src/_data/features/` folder, with a separate file per scope, as described above.
Internally these files are object trees, with structure governed by the scope.
The Commons scope, for example, has some features at the top level (e.g. `commons.members_name`)
and others nested by category and section (e.g. `commons.category_1.section_1.amount_or_value`).

Lists of currently defined features can be found on [the features pages](/features/).

No content is required within the feature definition, as the presence of the key is sufficient to define the feature.
The commonly defined properties of the feature object are:

* `description`
* `type`
* `format`
* `notes`
* `units`
* `enables` A feature may enable zero or more other features. As an example, a field which provided
  a unique and validated identifier for a company could theoretically enable the automatic filling of
  company name and address. This is enabled, and supports full of indirection:
  `a -enables-> b -enables-> c` will result in `a`, `b` and `c` being enabled!

#### Ruleset

Rulesets make features available (or by omission, not available).
Each ruleset belongs to a scope, allowing irrelevant information (e.g. features from another scope) to be ommitted from consideration.

Rulesets are defined in the `src/_data/rulesets/` folder, and contain the following properties:

* `name` A human intelligible name for the ruleset
* `description` A brief description of the ruleset
* `scope` The scope to which this applies
* `order` A numerical value to affect the order of ruleset display
* `available` A list of the fully-qualified feature names that the ruleset provides.
  Lists of currently defined features can be found on [the features pages](/features/).

<html>{{ comp.mermaid.script() | safe }}</html>


### Site build

This section outlines some of the critical parts of the site build.

#### Ruleset

Each ruleset is emitted as a page using the `src/features/list.tmpl.ts` page file.

This constructs page data of the following form:

* `layout` (all pages): `layouts/ruleset.njk` The page template
* `tags` (all pages): `[ 'ruleset' ]`
* `scope`: The 'scope' of the ruleset
* `name`: A human readable ruleset name
* `description`: A brief description of the ruleset
* `order`: The order in which to render the ruleset
* `available`: Calculated directly and transitively enabled features
* `scope_name`: A human readable scope name
* `title`: A title
* `current_ruleset`: The key for the ruleset
* `url`: The ruleset url

The values of the can be modified in the `tmpl.js` file.

The code to calculate features available in a given ruleset is defined in the generator.
The function `calculateFeatures` takes a list of features and works out those that are
transitively enabled, based of the value of the 'enables' key of the feature set.

The `ruleset` layout calls the `dashboard.njk` component to render the dashboard.

`dashboard.njk` renders the categories and then a styled unordered list to create the
dashboard "lights". Each competency is rendered using the `competency.njk` component.
This in turn calls the `dependencies.js` component which is responsible for providing
the `data-required-features`, `data-score` and `aria-label` properties.

The "lights" are styled by `css` provided by the `comptency.njk` component.