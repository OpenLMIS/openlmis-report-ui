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
        module('openlmis-auth');

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

        inject(function($injector) {
            this.$controller = $injector.get('$controller');
            this.authorizationService = $injector.get('authorizationService');
            this.REPORT_RIGHTS = $injector.get('REPORT_RIGHTS');
        });

        this.vm = this.$controller('ReportListController', {
            reports: this.reports
        });

        spyOn(this.authorizationService, 'hasRight');
    });

    it('should set report list', function() {
        expect(this.vm.reports).toEqual(this.reports);
    });

    describe('hasRight', function() {

        it('should return true if permissionService returns true', function() {
            this.authorizationService.hasRight.andCallFake(function(rightName) {
                return rightName === 'rightName';
            });

            var result = this.vm.hasRight('rightName');

            expect(result).toBeTruthy();
            expect(this.authorizationService.hasRight).toHaveBeenCalledWith('rightName');
            expect(this.authorizationService.hasRight).toHaveBeenCalledWith(
                this.REPORT_RIGHTS.REPORTS_VIEW
            );
        });

        it('should return false if permissionService returns false', function() {
            this.authorizationService.hasRight.andReturn(false);
            var result = this.vm.hasRight('rightName');

            expect(result).toBeFalsy();
            expect(this.authorizationService.hasRight).toHaveBeenCalledWith('rightName');
            expect(this.authorizationService.hasRight).toHaveBeenCalledWith(
                this.REPORT_RIGHTS.REPORTS_VIEW
            );
        });

        it('should return true if user has REPORTS_VIEW right', function() {
            this.authorizationService.hasRight.andCallFake(function(rightName) {
                return rightName === 'REPORTS_VIEW';
            });
            var result = this.vm.hasRight('rightName');

            expect(result).toBeTruthy();
            expect(this.authorizationService.hasRight).toHaveBeenCalledWith(
                this.REPORT_RIGHTS.REPORTS_VIEW
            );
        });

    });

});
