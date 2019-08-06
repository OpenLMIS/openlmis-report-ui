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
     * @name report.supersetReports
     *
     * @description
     * This is constant defining available superset reports.
     */
    angular
        .module('report')
        .factory('supersetReports', supersetReports);

    supersetReports.$inject = ['SUPERSET_URL'];

    function supersetReports(SUPERSET_URL) {
        var reports = {};

        if (SUPERSET_URL.substr(0, 2) !== '${') {
            reports = {
                REPORTING_RATE_AND_TIMELINESS: createReport('reportingRateAndTimeliness',
                    SUPERSET_URL + '/superset/dashboard/1/',
                    'REPORTING_RATE_AND_TIMELINESS_REPORT_VIEW'),
                STOCK_STATUS: createReport('stockStatus',
                    SUPERSET_URL + '/superset/dashboard/6/',
                    'STOCK_STATUS_REPORT_VIEW'),
                STOCKOUTS: createReport('stockouts',
                    SUPERSET_URL + '/superset/dashboard/2/',
                    'STOCKOUTS_REPORT_VIEW'),
                CONSUMPTION: createReport('consumption',
                    SUPERSET_URL + '/superset/dashboard/3/',
                    'CONSUMPTION_REPORT_VIEW'),
                ORDERS: createReport('orders',
                    SUPERSET_URL + '/superset/dashboard/4/',
                    'ORDERS_REPORT_VIEW'),
                ADJUSTMENTS: createReport('adjustments',
                    SUPERSET_URL + '/superset/dashboard/5/',
                    'ADJUSTMENTS_REPORT_VIEW'),
                ADMINISTRATIVE: createReport('administrative',
                    SUPERSET_URL + '/superset/dashboard/7/',
                    'ADMINISTRATIVE_REPORT_VIEW')
            };
        }

        return {
            getReports: getReports,
            addReporingPages: addReporingPages
        };

        function addReporingPages($stateProvider) {
            if (angular.equals(reports, {})) {
                // nothing to do here
                return;
            }

            $stateProvider.state('openlmis.reports.list.superset', {
                abstract: true,
                url: '/superset',
                views: {
                    // we need the main page to flex to the window size
                    '@': {
                        templateUrl: 'openlmis-main-state/flex-page.html'
                    }
                }
            });

            Object.values(reports).forEach(function(report) {
                addReporingPage($stateProvider, report);
            });
        }

        function addReporingPage($stateProvider, report) {
            $stateProvider.state('openlmis.reports.list.superset.' + report.code, {
                url: '/' + report.code,
                label: 'report.superset.' + report.code,
                controller: 'SupersetReportController',
                templateUrl: 'report/superset-report.html',
                controllerAs: 'vm',
                resolve: {
                    reportUrl: function($sce) {
                        return $sce.trustAsResourceUrl(report.url);
                    },
                    reportCode: function() {
                        return report.code;
                    }
                }
            });
        }

        function getReports() {
            return reports;
        }

        function createReport(code, url, right) {
            return {
                code: code,
                url: url,
                right: right
            };
        }

    }

})();