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
     * @ngdoc object
     * @name report.REPORT_TYPES
     *
     * @description
     * This is constant for report types.
     */
    angular
        .module('report')
        .constant('REPORT_TYPES', types());

    function types() {
        var REPORT_TYPES = {
            SUPERSET: 'SUPERSET',
            POWERBI: 'POWERBI',
            getTypes: getTypes
        };
        return REPORT_TYPES;

        /**
         * @ngdoc method
         * @methodOf report.REPORT_TYPES
         * @name getTypes
         *
         * @description
         * Returns all available report types as a list.
         *
         * @return  {Array} the list of available report types
         */
        function getTypes() {
            return [
                REPORT_TYPES.SUPERSET,
                REPORT_TYPES.POWERBI
            ];
        }
    }

})();
