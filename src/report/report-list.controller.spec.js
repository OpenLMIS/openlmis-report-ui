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

        this.jasperReports = [
            {
                id: 'id-one',
                name: 'Report 1',
                category: {
                    name: 'Administartion'
                }
            },
            {
                id: 'id-two',
                name: 'Report 2',
                category: {
                    name: 'Orders'
                }
            }
        ];

        this.reportCategories = [
            {
                name: 'Administartion'
            },
            {
                name: 'Orders'
            }
        ];

        this.dashboardReportsList = [
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
        ];

        inject(function($injector) {
            this.$controller = $injector.get('$controller');
        });

        this.vm = this.$controller('ReportListController', {
            jasperReports: this.jasperReports,
            reportCategories: this.reportCategories,
            dashboardReportsList: this.dashboardReportsList
        });

    });

    it('should set report list', function() {
        expect(this.vm.jasperReports).toEqual(this.jasperReports);

        expect(this.vm.reportCategories).toEqual(this.reportCategories);

        expect(this.vm.dashboardReportsList).toEqual(this.dashboardReportsList);
    });

});
