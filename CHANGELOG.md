5.2.7 / WIP
==================

Improvements:
* [OLMIS-7314](https://openlmis.atlassian.net/browse/OLMIS-7314): Update scss files to enable webpack build.

Bug fixes:
* [OLMIS-7314](https://openlmis.atlassian.net/browse/OLMIS-7314): Fix tests after karma upgrade.

5.2.6 / 2021-05-27
==================

Improvements:
* Updated dev-ui version to 9.0.2.
* Updated ui-components version to 7.2.5.
* Updated auth-ui version to 6.2.6.
* Updated ui-layout version to 5.1.9.
* Updated referencedata-ui version to 5.6.5.

5.2.5 / 2020-11-17
==================

Improvements:
* Updated ui-components version to 7.2.4.
* Updated auth-ui version to 6.2.5.
* Updated referencedata-ui version to 5.6.4.
* Updated ui-layout version to 5.1.8.

5.2.4 / 2020-05-12
==================

Improvements:
* Updated ui-components version to 7.2.3.
* Updated auth-ui version to 6.2.4.
* Updated referencedata-ui version to 5.6.3.
* Updated ui-layout version to 5.1.7.

5.2.3 / 2020-04-14
==================

Improvements:
* Updated ui-components version to 7.2.2.
* Updated auth-ui version to 6.2.3.
* Updated referencedata-ui version to 5.6.2.
* Updated ui-layout version to 5.1.6.

5.2.2 / 2019-12-19
==================

Improvements:
* [OLMIS-6589](https://openlmis.atlassian.net/browse/OLMIS-6589): Hide Superset's Header

5.2.1 / 2019-10-17
==================

Improvements:
* [OLMIS-6478](https://openlmis.atlassian.net/browse/OLMIS-6478): Made Superset Server URL Configurable
* [OLMIS-6504](https://openlmis.atlassian.net/browse/OLMIS-6504): Replaced OAuth Approval page for Superset by a user-friendly modal.

5.2.0 / 2019-05-27
==================

New functionality added in a backwards-compatible manner:
* [OLMIS-6055](https://openlmis.atlassian.net/browse/OLMIS-6055): Restricted displaying superset report on the list by checking rights per report.

Improvements:
* [OLMIS-6143](https://openlmis.atlassian.net/browse/OLMIS-6143): Updated Reporting Pages to reflect Superset Dashboards.

Bug fixes:
* [OLMIS-6330](https://openlmis.atlassian.net/browse/OLMIS-6330): fixed trigerring reference-ui build.

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
