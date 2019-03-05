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
     * @name report.SUPERSET_REPORTS
     *
     * @description
     * This is constant defining available superset reports.
     */
    angular
        .module('report')
        .constant('SUPERSET_REPORTS', getReports());

    function getReports() {
        return {
            REPORTING_RATE_AND_TIMELINESS: createReport('reportingRateAndTimeliness',
                'https://superset.uat.openlmis.org/login/openlmis?redirect_url=/superset/dashboard/1/',
                'REPORTING_RATE_AND_TIMELINESS_REPORT_VIEW'),
            STOCK_STATUS: createReport('stockStatus',
                'https://superset.uat.openlmis.org/login/openlmis?redirect_url=/superset/dashboard/2/',
                'STOCK_STATUS_REPORT_VIEW'),
            STOCKOUTS: createReport('stockouts',
                'https://superset.uat.openlmis.org/login/openlmis?redirect_url=/superset/dashboard/3/',
                'STOCKOUTS_REPORT_VIEW'),
            CONSUMPTION: createReport('consumption',
                'https://superset.uat.openlmis.org/login/openlmis?redirect_url=/superset/dashboard/4/',
                'CONSUMPTION_REPORT_VIEW'),
            ORDERS: createReport('orders',
                'https://superset.uat.openlmis.org/login/openlmis?redirect_url=/superset/dashboard/5/',
                'ORDERS_REPORT_VIEW'),
            ADJUSTMENTS: createReport('adjustments',
                'https://superset.uat.openlmis.org/login/openlmis?redirect_url=/superset/dashboard/6/',
                'ADJUSTMENTS_REPORT_VIEW'),
            ADMINISTRATIVE: createReport('administrative',
                'https://superset.uat.openlmis.org/login/openlmis?redirect_url=/superset/dashboard/7/',
                'ADMINISTRATIVE_REPORT_VIEW')
        };
    }

    function createReport(code, url, right) {
        return {
            code: code,
            url: url,
            right: right
        };
    }

})();
