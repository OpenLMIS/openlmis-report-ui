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

describe('reportService', function() {

    beforeEach(function() {
        var that = this;

        that.baseUrl = 'http://localhost/superset';
        that.$stateProvider = jasmine.createSpyObj('$stateProvider', ['state']);

        module('report', function($provide) {
            $provide.constant('SUPERSET_URL', that.baseUrl);
        });

        inject(function($injector) {
            that.supersetReports = $injector.get('supersetReports');
        });

    });

    describe('addReporingPages', function() {

        it('should add reporting pages', function() {
            this.supersetReports.addReporingPages(this.$stateProvider);

            expect(this.$stateProvider.state).toHaveBeenCalledWith(
                'openlmis.reports.list.superset', jasmine.any(Object)
            );

            expect(this.$stateProvider.state).toHaveBeenCalledWith(
                'openlmis.reports.list.superset.reportingRateAndTimeliness', jasmine.any(Object)
            );

            expect(this.$stateProvider.state).toHaveBeenCalledWith(
                'openlmis.reports.list.superset.stockStatus', jasmine.any(Object)
            );

            expect(this.$stateProvider.state).toHaveBeenCalledWith(
                'openlmis.reports.list.superset.stockouts', jasmine.any(Object)
            );

            expect(this.$stateProvider.state).toHaveBeenCalledWith(
                'openlmis.reports.list.superset.consumption', jasmine.any(Object)
            );

            expect(this.$stateProvider.state).toHaveBeenCalledWith(
                'openlmis.reports.list.superset.orders', jasmine.any(Object)
            );

            expect(this.$stateProvider.state).toHaveBeenCalledWith(
                'openlmis.reports.list.superset.adjustments', jasmine.any(Object)
            );

            expect(this.$stateProvider.state).toHaveBeenCalledWith(
                'openlmis.reports.list.superset.administrative', jasmine.any(Object)
            );
        });

    });

});