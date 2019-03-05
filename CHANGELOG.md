5.2.0 / WIP
===========

New functionality added in a backwards-compatible manner:
* [OLMIS-6055](https://openlmis.atlassian.net/browse/OLMIS-6055): Restricted displaying superset report on the list by checking rights per report.

5.1.0 / 2018-12-12
==================

New functionality added in a backwards-compatible manner:
* [OLMIS-5501](https://openlmis.atlassian.net/browse/OLMIS-5501): Added superset reports

Improvements:
* [OLMIS-5409](https://openlmis.atlassian.net/browse/OLMIS-5409): Updated ui-components to version 7.0.0.
* [OLMIS-3696](https://openlmis.atlassian.net/browse/OLMIS-3696): Added dependency and development dependency locking.

5.0.6 / 2018-08-16
==================

Improvements:
* [OLMIS-4741](https://openlmis.atlassian.net/browse/OLMIS-4741): Added Jenkinsfile.
* [OLMIS-4795](https://openlmis.atlassian.net/browse/OLMIS-4795): Updated dev-ui to version 8.
* [OLMIS-4813](https://openlmis.atlassian.net/browse/OLMIS-4813): Updated ui-components to version 6.0.0.
* [OLMIS-3288](https://openlmis.atlassian.net/browse/OLMIS-3288): Fix report filters dependecy placeholder name to be flexibly named based on data from db

5.0.5 / 2018-04-24
==================

New features:
* [OLMIS-3108:](https://openlmis.atlassian.net/browse/OLMIS-3108) Updated to use dev-ui v7 transifex build process

5.0.4 / 2017-11-09
==================

Improvements:
* Updated dev-ui version to 6.

5.0.3 / 2017-09-01
==================

Big fixes:
* [OLMIS-2911](https://openlmis.atlassian.net/browse/OLMIS-2911): Added http method and body to jasper template paramter

5.0.2 / 2017-06-22
==================

Bug fixes:
* [MW-134](https://openlmis.atlassian.net/browse/MW-134): Added missing message


5.0.1 / 2017-05-26
==================

Bug fixes
* [OLMIS-2445](https://openlmis.atlassian.net/browse/OLMIS-2445) - Button and title capitalization are consistent.

5.0.0 / 2017-05-08
==================

Compatibility breaking changes:
* [OLMIS-2107](https://openlmis.atlassian.net/browse/OLMIS-2107): Add breadcrumbs to top of page navigation
  * All states have been modified to be descendants of the main state.

New functionality added in a backwards-compatible manner:
* Added support for multiple reporting services.
* Added support for predefined filter options in Jasper template parameters.
* Added support for report parameter dependencies.

Dev and tooling updates made in a backwards-compatible manner:
* [OLMIS-1609](https://openlmis.atlassian.net/browse/OLMIS-1609): UI i18N message strings are not standardized
* [OLMIS-1853](https://openlmis.atlassian.net/browse/OLMIS-1853): Separate push and pull Transifex tasks in build
  * Migrated to dev-ui v3.
* [OLMIS-2204](https://openlmis.atlassian.net/browse/OLMIS-2204): The administration menu item should always be the last menu item
  * Priority of all main navigation states have been changed to 10.
