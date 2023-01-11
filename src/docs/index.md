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

Competencies are derived from the set of questions collected during a recent review.

The original evidence is downloaded to the site as `src/_data/evidence.csv`.
This is automated as a GitHub action (in `.github/workflows/update-data.yml`) which runs
[at 45 minutes past every 3rd hour from 9 through 18 on Monday to Friday.](https://crontab.guru/#45_9-18/3_*_*_1-5).

Competencies are mapped to features to enable the calculation of answerability.
This is done in the `src/_data/competency/` folder, with each competency having a separate data file.
These are named per reference ID in the evidence CSV.

The following fields can be defined:

* `competency` Name of the competency - derived from the evidence file.
* `duplicate_of` List of other competencies that this duplicates.
  If this list has any entries, the competency is excluded from the state dashboard.
* `dependencies` A list of required features to be able to answer this competency.
  These are provided in namespaced form enabling them to be uniquely identified.
  Lists of features for each scope can be found on [the features pages](/features/).

#### Scope

Scopes distinguish between different contexts.
They exist in two places.

Firstly, they are the root namespace of the feature definition.
Practically, this means that they are the names of files in the `src/_data/features/` folder of the git repo.
Create a new file in this folder and define the features as key/value pairs to add a suite of features within a new scope.

Secondly, scopes are referenced in the state files (found in the `src/_data/states/` folder).
This defines the scope for the given state, and features in scope namespaces other than this are removed from consideration.
Scopes here must match the names of the scopes defined in the features folder.

#### Feature

Features are derived from current or potential attributes of the register.

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

#### State

States make features available (or by omission, not available).
Each state belongs to a scope, allowing irrelevant information (e.g. features from another scope) to be ommitted from consideration.

States are defined in the `src/_data/states/` folder, and contain the following properties:

* `name` A human intelligible name for the state
* `description` A brief description of the state
* `scope` The scope to which this applies
* `order` A numerical value to affect the order of state display
* `available` A list of the fully-qualified feature names that the state provides.
  Lists of currently defined features can be found on [the features pages](/features/).

<html>{{ comp.mermaid.script() | safe }}</html>
