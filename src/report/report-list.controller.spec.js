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

describe('ReportListController', function() {

    beforeEach(function() {
        module('report');

        this.reports = [
            {
                id: 'id-one',
                name: 'Report 1',
                $module: 'moduleOne'
            },
            {
                id: 'id-two',
                name: 'Report 2',
                $module: 'moduleTwo'
            }
        ];

        this.permissions = {
            REPORTS_VIEW: false,
            REPORTING_RATE_AND_TIMELINESS_REPORT_VIEW: true,
            STOCK_STATUS_REPORT_VIEW: false,
            STOCKOUTS_REPORT_VIEW: false,
            CONSUMPTION_REPORT_VIEW: false,
            ORDERS_REPORT_VIEW: false,
            ADJUSTMENTS_REPORT_VIEW: false,
            ADMINISTRATIVE_REPORT_VIEW: false
        };

        inject(function($injector) {
            this.$controller = $injector.get('$controller');
            this.REPORT_RIGHTS = $injector.get('REPORT_RIGHTS');
        });

        this.vm = this.$controller('ReportListController', {
            reports: this.reports,
            permissions: this.permissions
        });
    });

    it('should set report list', function() {
        expect(this.vm.reports).toEqual(this.reports);
    });

    describe('hasRight', function() {

        it('should return true if permissionService returns true', function() {
            var result = this.vm.hasRight('REPORTING_RATE_AND_TIMELINESS_REPORT_VIEW');

            expect(result).toBeTruthy();
        });

        it('should return false if permissionService returns false', function() {
            var result = this.vm.hasRight('ADMINISTRATIVE_REPORT_VIEW');

            expect(result).toBeFalsy();
        });

        it('should return true if user has REPORTS_VIEW right', function() {
            this.vm.permissions['REPORTS_VIEW'] = true;
            var result = this.vm.hasRight('ADMINISTRATIVE_REPORT_VIEW');

            expect(result).toBeTruthy();
        });

    });

});
