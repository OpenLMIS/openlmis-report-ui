5.0.3 / Current Snapshot
==================

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
