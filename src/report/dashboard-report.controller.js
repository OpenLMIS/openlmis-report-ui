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
     * Controller for dashboard report view. For Superset reports, uses the
     * Superset Embedded SDK to render the dashboard via a guest token.
     */
    angular
        .module('report')
        .controller('DashboardReportController', DashboardReportController);

    DashboardReportController.$inject = ['reportName', 'isSupersetReport', 'reportUrl',
        'embeddedUuid', '$http', '$q', '$element', '$scope', 'SUPERSET_URL', 'openlmisUrlFactory'];

    function DashboardReportController(reportName, isSupersetReport, reportUrl,
                                       embeddedUuid, $http, $q, $element, $scope, SUPERSET_URL,
                                       openlmisUrlFactory) {
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
         * The report URL (used for non-Superset reports).
         */
        vm.reportUrl = undefined;

        /**
         * @ngdoc property
         * @propertyOf report.controller:DashboardReportController
         * @name isSupersetReport
         * @type {boolean}
         *
         * @description
         * Whether this is a Superset embedded report.
         */
        vm.isSupersetReport = false;

        /**
         * @ngdoc property
         * @propertyOf report.controller:DashboardReportController
         * @name isReady
         * @type {boolean}
         *
         * @description
         * Indicates if the Superset embedded dashboard has been initialized.
         */
        vm.isReady = false;

        /**
         * @ngdoc property
         * @propertyOf report.controller:DashboardReportController
         * @name error
         * @type {string}
         *
         * @description
         * Error message to display if embedding fails.
         */
        vm.error = undefined;

        function onInit() {
            vm.reportName = reportName;
            vm.reportUrl = reportUrl;
            vm.isSupersetReport = isSupersetReport;

            if (vm.isSupersetReport && embeddedUuid) {
                initSupersetEmbed();
            } else if (vm.isSupersetReport) {
                vm.error = 'This dashboard has no embedded UUID configured.';
            }
        }

        function initSupersetEmbed() {
            loadSupersetSdk().then(function(sdk) {
                const container = $element[0].querySelector('#superset-embed-container');
                if (!container) {
                    vm.error = 'Embed container not found.';
                    $scope.$applyAsync();
                    return;
                }
                sdk.embedDashboard({
                    id: embeddedUuid,
                    supersetDomain: SUPERSET_URL,
                    mountPoint: container,
                    fetchGuestToken: fetchGuestToken,
                    dashboardUiConfig: {
                        hideTitle: true,
                        hideChartControls: false,
                        hideTab: false,
                        filters: {
                            visible: true,
                            expanded: false
                        }
                    }
                }).then(function() {
                    vm.isReady = true;
                    $scope.$applyAsync();
                })
                    .catch(function(err) {
                        vm.error = 'Failed to embed dashboard: ' + err.message;
                        $scope.$applyAsync();
                    });
            })
                .catch(function(err) {
                    vm.error = 'Failed to load Superset SDK: ' + err.message;
                    $scope.$applyAsync();
                });
        }

        function loadSupersetSdk() {
            if (window.supersetEmbeddedSdk) {
                return $q.resolve(window.supersetEmbeddedSdk);
            }
            return $http.get(SUPERSET_URL + '/static/superset-embedded-sdk.js', {
                transformResponse: function(data) {
                    return data;
                }
            }).then(function(response) {
                new Function(response.data)();
                if (window.supersetEmbeddedSdk) {
                    return window.supersetEmbeddedSdk;
                }
                throw new Error('Superset Embedded SDK failed to initialize');
            });
        }

        function fetchGuestToken() {
            const url = openlmisUrlFactory(
                '/api/reports/superset/guest-token?embeddedUuid=' + embeddedUuid
            );
            return $http.get(url)
                .then(function(response) {
                    return response.data.token;
                });
        }
    }

})();
