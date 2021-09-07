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

    var that = this;

    beforeEach(function() {
        that.SUPERSET_URL = 'http://localhost/superset';
        that.reportCode = 'reportCode';
        that.reportUrl = that.SUPERSET_URL + '/theReport';

        module('report', function($provide) {
            $provide.constant('SUPERSET_URL', that.SUPERSET_URL);
        });

        inject(function($injector) {
            that.$controller = $injector.get('$controller');
            that.$q = $injector.get('$q');
            that.$rootScope = $injector.get('$rootScope');

            that.supersetLocaleService = $injector.get('supersetLocaleService');
        });

        spyOn(that.supersetLocaleService, 'changeLocale').and.returnValue(that.$q.resolve());

        that.vm = that.$controller('SupersetReportController', {
            reportCode: that.reportCode,
            reportUrl: that.reportUrl
        });
    });

    describe('onInit', function() {

        beforeEach(function() {
            that.vm.$onInit();
        });

        it('should expose Superset iFrame src', function() {
            expect(that.vm.reportUrl).toEqual(that.reportUrl);
        });

        it('should expose report code', function() {
            expect(that.vm.reportCode).toEqual(that.reportCode);
        });

        it('should expose authUrl', function() {
            expect(that.vm.authUrl).not.toBeUndefined();
        });

        it('should expose isReady', function() {
            expect(that.vm.isReady).toEqual(false);
        });

        it('should adjust language in Superset and change isReady flag', function() {
            that.$rootScope.$apply();

            expect(that.supersetLocaleService.changeLocale).toHaveBeenCalled();
            expect(that.vm.isReady).toBe(true);
        });
    });
});
