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
     * @ngdoc controller
     * @name report.controller:ReportListController
     *
     * @description
     * Controller for report list view page.
     */
    angular
        .module('report')
        .controller('ReportListController', controller);

    controller.$inject = ['loadingModalService', 'reportCategories', 'jasperReports', 'dashboardReports'];

    function controller(loadingModalService, reportCategories, jasperReports, dashboardReports) {
        var vm = this;
        vm.result = {};
        vm.$onInit = onInit;

        /**
         * @ngdoc property
         * @propertyOf report.controller:ReportListController
         * @name reports
         * @type {Array}
         *
         * @description
         * The list of all available reportCategories.
         */
        vm.reportCategories = reportCategories;

        /**
         * @ngdoc property
         * @propertyOf report.controller:ReportListController
         * @name reports
         * @type {Array}
         *
         * @description
         * The list of all available jasper reports.
         */
        vm.jasperReports = jasperReports;

        /**
         * @ngdoc property
         * @propertyOf report.controller:ReportListController
         * @name reports
         * @type {Array}
         *
         * @description
         * The list of all available dashboard Reports.
         */
        vm.dashboardReports = dashboardReports;

        function onInit() {
            loadingModalService.open();
            sortReports();
        }

        function sortReports() {
            vm.reportCategories.forEach(function(category) {
                vm.result[category.name] = [];
            });

            vm.jasperReports.forEach(function(element) {
                // usunac po połączeniu z be
                element['category'] = {
                    name: 'Stock'
                };
                element['uisref'] = '.generate({module: report.$module, report: report.id})';
                vm.result[element.category.name].push(element);
            });

            vm.dashboardReports.forEach(function(element) {
                element['uisref'] = 'openlmis.reports.list.superset.' + element.id;
                vm.result[element.category.name].push(element);
            });

            loadingModalService.close();
        }
    }
})();
