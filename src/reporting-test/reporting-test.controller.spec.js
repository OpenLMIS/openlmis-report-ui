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

describe('ReportingTestController', function() {

    var vm, SUPERSET_IFRAME_SOURCE, $sce, $controller, $sceResultMock;

    beforeEach(function() {
        module('reporting-test');

        inject(function($injector) {
            $controller = $injector.get('$controller');
            SUPERSET_IFRAME_SOURCE = $injector.get('SUPERSET_IFRAME_SOURCE');
            $sce = $injector.get('$sce');
        });

        $sceResultMock = jasmine.createSpy('$sceResult');

        spyOn($sce, 'trustAsResourceUrl').andReturn($sceResultMock);

        vm = $controller('ReportingTestController');
    });

    describe('$onInit', function() {

        beforeEach(function() {
            vm.$onInit();
        });

        it('should expose Superset iFrame src', function() {
            expect(vm.supersetIframeSource).toEqual($sceResultMock);
        });

        it('should register Superset iFrame src as trusted resource URL', function() {
            expect($sce.trustAsResourceUrl).toHaveBeenCalledWith(SUPERSET_IFRAME_SOURCE);
        });

    });

});