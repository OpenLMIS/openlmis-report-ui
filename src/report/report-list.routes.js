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

    angular
        .module('report')
        .config(config);

    config.$inject = ['$stateProvider', 'REPORT_RIGHTS'];

    function config($stateProvider, REPORT_RIGHTS) {

        $stateProvider.state('openlmis.reports.list', {
            controller: 'ReportListController',
            controllerAs: 'vm',
            label: 'report.viewReports',
            showInNavigation: true,
            templateUrl: 'report/report-list.html',
            url: '/list',
            accessRights: [
                REPORT_RIGHTS.REPORTS_VIEW
            ],
            resolve: {
                reportCategories: function(reportCategoryService) {
                    return reportCategoryService.getAll().then(function(categories) {
                        return categories.content;
                    });
                },
                jasperReports: function(reportFactory) {
                    return reportFactory.getAllReports();
                },
                dashboardReportsList: function(dashboardReports, reportDashboardService) {
                    return reportDashboardService.getAllForUser().then(function(response) {
                        dashboardReports.addReporingPages($stateProvider);
                        return response.content;
                    });
                }
            }
        });
    }
})();
