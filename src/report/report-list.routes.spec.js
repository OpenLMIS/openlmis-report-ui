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

describe('openlmis.reports.list state', function() {

    beforeEach(function() {
        module('report');

        inject(function($injector) {
            this.$state = $injector.get('$state');
            this.$rootScope = $injector.get('$rootScope');
            this.$q = $injector.get('$q');
            this.reportFactory = $injector.get('reportFactory');
            this.reportCategoryService = $injector.get('reportCategoryService');
            this.reportDashboardService = $injector.get('reportDashboardService');
            this.dashboardReports = $injector.get('dashboardReports');
            this.$location = $injector.get('$location');
            this.REPORT_RIGHTS = $injector.get('REPORT_RIGHTS');
        });

        this.jasperReports = [
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

        this.reportCategories = {
            content: [
                {
                    name: 'Administartion'
                },
                {
                    name: 'Orders'
                }
            ]
        };

        this.dashboardReportsList = {
            content: [
                {
                    id: 'id-three',
                    name: 'Report 3',
                    category: {
                        name: 'Administartion'
                    }
                },
                {
                    id: 'id-four',
                    name: 'Report 4',
                    category: {
                        name: 'Orders'
                    }
                }
            ]
        };

        spyOn(this.reportFactory, 'getAllReports').andReturn(this.$q.resolve(this.jasperReports));
        spyOn(this.reportCategoryService, 'getAll').andReturn(this.$q.resolve(this.reportCategories));
        spyOn(this.reportDashboardService, 'getAllForUser').andReturn(this.$q.resolve(this.dashboardReportsList));
        spyOn(this.dashboardReports, 'addReporingPages').andReturn(true);

        this.goToUrl = goToUrl;
        this.getResolvedValue = getResolvedValue;

        this.state = this.$state.get('openlmis.reports.list');
    });

    it('should be available under "/reports/list" URI', function() {
        expect(this.$state.current.name).not.toEqual('openlmis.reports.list');

        this.goToUrl('/reports/list');

        expect(this.$state.current.name).toEqual('openlmis.reports.list');
    });

    it('should fetch reports', function() {
        this.goToUrl('/reports/list');

        expect(this.getResolvedValue('jasperReports')).toEqual(this.jasperReports);
        expect(this.getResolvedValue('reportCategories')).toEqual(this.reportCategories.content);
        expect(this.getResolvedValue('dashboardReportsList')).toEqual(this.dashboardReportsList.content);
    });

    function goToUrl(url) {
        this.$location.url(url);
        this.$rootScope.$apply();
    }

    function getResolvedValue(name) {
        return this.$state.$current.locals.globals[name];
    }

});