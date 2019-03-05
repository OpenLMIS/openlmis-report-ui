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

    var UserDataBuilder;

    beforeEach(function() {
        module('report');
        module('openlmis-permissions');

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
            this.permissionService = $injector.get('permissionService');
            this.authorizationService = $injector.get('authorizationService');
            UserDataBuilder = $injector.get('UserDataBuilder');
        });

        this.vm = this.$controller('ReportListController', {
            reports: this.reports
        });

        this.user = new UserDataBuilder().build();

        spyOn(this.permissionService, 'hasPermission');
        spyOn(this.authorizationService, 'getUser');
    });

    it('should set report list', function() {
        expect(this.vm.reports).toEqual(this.reports);
    });

    describe('hasRight', function() {

        it('should return true if permissionService returns true', function() {
            this.authorizationService.getUser.andReturn(this.user);
            this.permissionService.hasPermission.andReturn(true);
            var result = this.vm.hasRight('rightName');

            expect(result).toBeTruthy();
            expect(this.permissionService.hasPermission).toHaveBeenCalledWith(this.user.user_id, {
                right: 'rightName'
            });
        });

        it('should return false if permissionService returns false', function() {
            this.authorizationService.getUser.andReturn(this.user);
            this.permissionService.hasPermission.andReturn(false);
            var result = this.vm.hasRight('rightName');

            expect(result).toBeFalsy();
            expect(this.permissionService.hasPermission).toHaveBeenCalledWith(this.user.user_id, {
                right: 'rightName'
            });
        });

    });

});
