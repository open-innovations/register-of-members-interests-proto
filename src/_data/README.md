## Data from Parliamentary Digital Service

`evidence.csv` is downloaded directly from the Parliament library sheet **TODO ADD LINK**.
The key columns are:

* ID
* Competency
* RMFI category

## Config files and directories

* `_data/dashboard/categories.yml` Categories to show on the dashboard, and in
  what order.
* `_data/competency/` Directory containing metadata relating to individual
  competencies. Available in lume build as the `competency` object.
* `_data/features/` Directory containing actual or potential data elements
  (don't even have to be possible!) that might be collected as part of the RMFI.
  By convention, prefixed with the category of interest from the legislation.
  See the [Introduction to the Registers for the 2019
  Parliament](https://publications.parliament.uk/pa/cm/cmregmem/ForewordJanuary2020.pdf).
* `_data/states/` A directory containing a yaml file per state. Each state is a
  list of available features defining a potential / proposed version of the data
  collected for the RMFI. These states can be applied to the prototype to
  determine which competencies can be `answered`.

## Useful links

* https://github.com/ukparliament/ontologies/tree/master/meta/relational/register-of-members-financial-interests
