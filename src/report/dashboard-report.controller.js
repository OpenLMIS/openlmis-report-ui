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
     * @name report.controller:DashboardReportController
     *
     * @description
     * Controller for dashboard report view.
     */
    angular
        .module('report')
        .controller('DashboardReportController', DashboardReportController);

    DashboardReportController.inject = ['reportName', 'isSupersetReport', 'reportUrl', 'loadingModalService',
        'messageService', 'supersetLocaleService', 'SUPERSET_URL'];

    function DashboardReportController(reportName, isSupersetReport, reportUrl, loadingModalService, messageService,
                                       supersetLocaleService, SUPERSET_URL) {
        var vm = this;
        vm.$onInit = onInit;

        /**
         * @ngdoc property
         * @propertyOf report.controller:DashboardReportController
         * @name reportName
         * @type {string}
         *
         * @description
         * The report name.
         */
        vm.reportName = undefined;

        /**
         * @ngdoc property
         * @propertyOf report.controller:DashboardReportController
         * @name reportUrl
         * @type {string}
         *
         * @description
         * The report URL.
         */
        vm.reportUrl = undefined;

        /**
         * @ngdoc property
         * @propertyOf report.controller:DashboardReportController
         * @name authUrl
         * @type {string}
         *
         * @description
         * The superset authorization URL.
         */
        vm.authUrl = undefined;

        /**
         * @ngdoc property
         * @propertyOf report.controller:DashboardReportController
         * @name isReady
         * @type {boolean}
         *
         * @description
         * Indicates if the controller is ready for displaying the Superset iframe.
         */
        vm.isReady = false;

        function onInit() {
            vm.reportName = reportName;
            vm.reportUrl = reportUrl;
            vm.isSupersetReport = isSupersetReport;
            vm.authUrl = SUPERSET_URL + '/login/openlmis';

            if (vm.isSupersetReport) {
                adjustSupersetLanguage();
            }
        }

        function adjustSupersetLanguage() {
            loadingModalService.open();

            var locale = messageService.getCurrentLocale();
            supersetLocaleService.changeLocale(locale)
                .then(function() {
                    vm.isReady = true;
                })
                .finally(function() {
                    loadingModalService.close();
                });
        }
    }

})();
