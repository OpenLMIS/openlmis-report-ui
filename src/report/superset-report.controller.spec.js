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

describe('SupersetReportController', function() {

    beforeEach(function() {
        module('report');

        inject(function($injector) {
            this.$controller = $injector.get('$controller');
        });

        this.reportCode = 'test';
        this.reportUrl = 'http://localhost';

        this.vm = this.$controller('SupersetReportController', {
            reportCode: this.reportCode,
            reportUrl: this.reportUrl
        });
    });

    describe('$onInit', function() {

        beforeEach(function() {
            this.vm.$onInit();
        });

        it('should expose Superset iFrame src', function() {
            expect(this.vm.reportUrl).toEqual(this.reportUrl);
        });

        it('should expose report code', function() {
            expect(this.vm.reportCode).toEqual(this.reportCode);
        });

    });

});
