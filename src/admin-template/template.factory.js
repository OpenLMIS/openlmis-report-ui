/*
 * This program is part of the OpenLMIS logistics management information system platform software.
 * Copyright © 2017 VillageReach
 *
 * This program is free software: you can redistribute it and/or modify it under the terms
 * of the GNU Affero General Public License as published by the Free Software Foundation, either
 * version 3 of the License, or (at your option) any later version.
 *  
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
 * See the GNU Affero General Public License for more details. You should have received a copy of
 * the GNU Affero General Public License along with this program. If not, see
 * http://www.gnu.org/licenses.  For additional information contact info@OpenLMIS.org. 
 */

(function() {

    'use strict';

    /**
     * @ngdoc service
     * @name admin-template.templateFactory
     *
     * @description
     * Communicates with templateDataService.
     */
    angular.module('admin-template').factory('templateFactory', templateFactory);

    templateFactory.$inject = ['$q', '$filter', 'requisitionTemplateService', 'RequisitionColumn', 'COLUMN_SOURCES', 'TEMPLATE_COLUMNS', 'MAX_COLUMN_DESCRIPTION_LENGTH', 'ALPHA_NUMERIC_REGEX'];

    function templateFactory($q, $filter, requisitionTemplateService, RequisitionColumn, COLUMN_SOURCES, TEMPLATE_COLUMNS, MAX_COLUMN_DESCRIPTION_LENGTH, ALPHA_NUMERIC_REGEX) {

        var factory = {
            get: get,
            getAll: getAll,
            getByProgram: getByProgram
        };

        return factory;

        /**
         * @ngdoc method
         * @methodOf admin-template.templateFactory
         * @name get
         *
         * @description
         * Gets requisition template by id and adds validation and column sorting methods.
         *
         * @param  {String}  id Template UUID
         * @return {Promise}    Template
         */
        function get(id) {
            var deferred = $q.defer();
            requisitionTemplateService.get(id).then(function(template) {
                template.$save = save;
                template.$moveColumn = moveColumn;
                template.$findCircularCalculatedDependencies = findCircularCalculatedDependencies;

                angular.forEach(template.columnsMap, function(column) {
                    addDependentColumnValidation(column, template.columnsMap);
                    fixColumnOptionModelReference(column);
                });

                deferred.resolve(template);
            }, function() {
                deferred.reject();
            });
            return deferred.promise;
        }

        /**
         * @ngdoc method
         * @methodOf admin-template.templateFactory
         * @name getAll
         *
         * @description
         * Gets all requisition templates from templateDataService.
         *
         * @return {Promise} Array of requisition templates
         */
        function getAll() {
            return requisitionTemplateService.getAll();
        }

        /**
         * @ngdoc method
         * @methodOf admin-template.templateFactory
         * @name getByProgram
         *
         * @description
         * Gets requisition template for given program UUID.
         *
         * @param  {String}  programId Program UUID
         * @return {Promise}           Template for given program
         */
        function getByProgram(programId) {
            return requisitionTemplateService.search(programId);
        }

        // Saves template
        function save() {
            return requisitionTemplateService.save(this);
        }

        // Creates a array with dependent column names.
        function addDependentColumnValidation(column, columns) {
            var dependencies = RequisitionColumn.columnDependencies(column);
            if(dependencies && dependencies.length > 0) {
                angular.forEach(dependencies, function(dependency) {
                    if(!columns[dependency].$dependentOn) columns[dependency].$dependentOn = [];
                    columns[dependency].$dependentOn.push(column.name);
                });
            }
        }

        // Checks if column can be dropped in area and if so,
        // changes display order of columns between old and new position of dropped column.
        function moveColumn(droppedItem, dropSpotIndex) {
            var maxNumber = 999999999999999,
                pinnedColumns = [], // columns that position can't be changed
                columns = [],       // all columns
                newDisplayOrder,
                min,                // the lowest column displayOrder value in droppable area
                max,                // the highest column displayOrder value in droppable area
                isMovingUpTheList;  // indicates if column is going down or up the list

            convertListToArray(this.columnsMap);
            isMovingUpTheList = getArrayIndexForColumn(droppedItem) > dropSpotIndex;

            if(isMovingUpTheList) newDisplayOrder = columns[dropSpotIndex].displayOrder;    // new displayOrder value depends on if column was dropped below or above
            else newDisplayOrder = columns[dropSpotIndex - 1].displayOrder;

            setMinMaxDisplayOrder(droppedItem.displayOrder);

            if(isInDroppableArea(newDisplayOrder) && droppedItem.columnDefinition.canChangeOrder) {
                angular.forEach(columns, function(column) {
                    if(isInDroppableArea(column.displayOrder) && column.columnDefinition.canChangeOrder) {
                        if(droppedItem.name === column.name) column.displayOrder = newDisplayOrder; // setting new displayOrder for dropped column
                        else if(isMovingUpTheList && column.displayOrder >= newDisplayOrder && column.displayOrder < droppedItem.displayOrder) column.displayOrder++;  // columns between old and new position must be
                        else if(column.displayOrder <= newDisplayOrder && column.displayOrder > droppedItem.displayOrder) column.displayOrder--;                       // incremented or decremented
                    }
                });
                return true;
            } else {
                return false;
            }

            // Converts list of columns to array, copies "pinned" columns to another array and sorts both.
            function convertListToArray(list) {
                angular.forEach(list, function(column) {
                    if(!column.columnDefinition.canChangeOrder) pinnedColumns.push(column);
                    columns.push(column);
                });

                pinnedColumns.sort(sort);
                columns.sort(sort);
            }

            // Sorting function for column arrays
            function sort(a, b) {
                a = parseInt(a.displayOrder);
                b = parseInt(b.displayOrder);
                return a - b;
            }

            // Returns current index in array of given column.
            function getArrayIndexForColumn(column) {
                var index;

                angular.forEach(columns, function(item, idx) {
                    if(column.name === item.name) index = idx;
                });

                return index;
            }

            // Sets min and max display order value.
            // In other words it tells you between which "pinned" columns was our dropped column located.
            // This column can be dropped only in this area.
            function setMinMaxDisplayOrder(displayOrder) {
                min = 0;
                max = undefined;
                angular.forEach(pinnedColumns, function(pinnedColumn) {
                    if(displayOrder > pinnedColumn.displayOrder) min = pinnedColumn.displayOrder;
                    if(!max && displayOrder < pinnedColumn.displayOrder) max = pinnedColumn.displayOrder;
                });
                if(!max) max = maxNumber;
            }

            // Based on mix and max from function above checks if column was dropped in proper area
            function isInDroppableArea(displayOrder) {
                return displayOrder > min && displayOrder < max;
            }
        }

        // check if a column has a calculated dependency that is dependent on this columns
        function findCircularCalculatedDependencies(columnName) {
            var circularDependencies = [];
            checkForCircularCalculatedDependencies(null, columnName, [], null,
                                                   this.columnsMap, circularDependencies);
            return circularDependencies;
        }

        function checkForCircularCalculatedDependencies(columnNameToCheck, columnNameToFind, columnsVisited,
                                                directParent, columnsMap, circularDependencies) {
            // already visited this column in a different dependency chain, skip
            if (columnsVisited.indexOf(columnNameToCheck) > -1) {
                return;
            }

            if (columnNameToCheck === columnNameToFind) {
                // bingo, this is in the dependency chain and depends on the original column
                // the direct parent has the dependency, since this is the original column
                circularDependencies.push(directParent);
                return;
            }

            var currentColumnName;
            if (columnNameToCheck) {
                // mark column as already visited
                // we won't get here for the original column
                columnsVisited.push(columnNameToCheck);
                currentColumnName = columnNameToCheck;
            } else {
                // first run, start at our column

                currentColumnName = columnNameToFind;
            }

            var column = columnsMap[currentColumnName];
            // ignore if doesn't exist
            if (!column) {
                return;
            }

            // check all dependencies recursively
            var dependencies = RequisitionColumn.columnDependencies(column);
            if (dependencies) {
                angular.forEach(dependencies, function(dependency) {
                    // only check calculated dependencies
                    var dependencyColumn = columnsMap[dependency];
                    if (dependencyColumn && dependencyColumn.source === COLUMN_SOURCES.CALCULATED) {
                        checkForCircularCalculatedDependencies(dependency, columnNameToFind, columnsVisited,
                                                   currentColumnName, columnsMap, circularDependencies);
                    }
                });
            }
        }

        function isAverageConsumptionInvalid(numberOfPeriods) {
            return !numberOfPeriods ||
                !numberOfPeriods.toString().trim() ||
                numberOfPeriods < 2;
        }

        //this fixes setting initial value of the select on the admin-template screen
        function fixColumnOptionModelReference(column) {
            if (column.option ) {
                column.option = $filter('filter')(column.columnDefinition.options, {
                    id: column.option.id
                })[0];
            }
        }
    }

})();
