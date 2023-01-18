## Data from Parliamentary Digital Service

`evidence.csv` is downloaded directly from the
[Parliament library sheet](https://docs.google.com/spreadsheets/d/1iRsQBRPChMVFitSGBtNJFGNBvFT8XGKQYYqu40zy_OM/edit?usp=sharing).
The key columns are:

- ID
- Competency
- RMFI category

## Config files and directories

- `_data/dashboard/categories.yml` Categories to show on the dashboard, and in
  what order.
- `_data/competency/` Directory containing metadata relating to individual
  competencies. Available in lume build as the `competency` object.
- `_data/features/` Directory containing actual or potential data elements
  (don't even have to be possible!) that might be collected as part of the RMFI.
  Features are defined in a given scope, with a single file per scope in this folder.
  See the
  [Introduction to the Registers for the 2019
  Parliament](https://publications.parliament.uk/pa/cm/cmregmem/ForewordJanuary2020.pdf).
- `_data/rulesets/` A directory containing a yaml file per ruleset. Each ruleset is a
  list of available features defining a potential / proposed version of the data
  collected for the RMFI. These rulesets can be applied to the prototype to
  determine which competencies can be `answered`.
- `_data/scopes.yaml` A metadata file providing the public name of each of the scopes.
  For now...

## Useful links

- https://github.com/ukparliament/ontologies/tree/master/meta/relational/register-of-members-financial-interests
- The "ruleset" for the House of Commons register is here:
  https://publications.parliament.uk/pa/cm201719/cmcode/1882/188204.htm
- Same but for the Lords
  https://www.parliament.uk/globalassets/documents/lords-commissioner-for-standards/hl-code-of-conduct.pdf
- Combined Commons forms
  https://github.com/ukparliament/ontologies/tree/master/meta/relational/register-of-members-financial-interests/commons/forms
  (based on
  https://github.com/ukparliament/ontologies/tree/master/meta/relational/register-of-members-financial-interests/commons/categories)
