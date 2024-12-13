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
     * @ngdoc service
     * @name report.reportDashboardService
     *
     * @description
     * Responsible for retrieving dashboard report information from server.
     */
    angular
        .module('report-category')
        .service('reportDashboardService', service);

    service.$inject = ['openlmisUrlFactory', '$resource'];

    function service(openlmisUrlFactory, $resource) {

        var resource = $resource(openlmisUrlFactory('/api/reports/reportDashboard'), {}, {
            get: {
                method: 'GET',
                url: openlmisUrlFactory('/api/reports/reportDashboard/:id')
            },
            getAll: {
                method: 'GET',
                url: openlmisUrlFactory('/api/reports/reportDashboard')
            },
            add: {
                method: 'POST',
                url: openlmisUrlFactory('/api/reports/reportDashboard')
            },
            edit: {
                method: 'PUT',
                url: openlmisUrlFactory('/api/reports/reportDashboard/:id')
            },
            remove: {
                method: 'DELETE',
                url: openlmisUrlFactory('/api/reports/reportDashboard/:id')
            },
            getAllByCategory: {
                method: 'POST',
                url: openlmisUrlFactory('/api/reports/reportDashboard/:categoryName')
            }
        });

        return {
            get: get,
            getAll: getAll,
            add: add,
            edit: edit,
            remove: remove,
            getAllByCategory: getAllByCategory
        };

        function getAll() {
            //return resource.getAll(searchParams).$promise;
            return [ {
                id: '5b8b1258-63d1-4e4a-bd03-93d932cd305d',
                name: 'Metabase',
                url: 'https://selv.app-next.net/public/dashboard/' +
                '1dbe2d1c-6d04-429a-baf7-a8aaa91a66fe?produto=&prov%25C3%25ADncia=',
                type: 'PowerBI',
                showOnHomePage: false,
                category: {
                    id: '1',
                    name: 'Administartion'
                },
                enabled: true
            }, {
                id: '3a792c67-1221-4d15-bbc9-cb3573b53e4c',
                name: 'Stock Status',
                url: 'https://superset-uat.openlmis.org/superset/dashboard/stock_status?standalone=true',
                type: 'Superset',
                showOnHomePage: true,
                category: {
                    id: '2',
                    name: 'Orders'
                },
                enabled: true
            }];
        }

        function get() {
            // return resource.get({
            //     id: id
            // }).$promise;
            return {
                id: '5b8b1258-63d1-4e4a-bd03-93d932cd305d',
                name: 'Metabase',
                url: 'https://selv.app-next.net/public/dashboard/' +
                '1dbe2d1c-6d04-429a-baf7-a8aaa91a66fe?produto=&prov%25C3%25ADncia=',
                type: 'PowerBI',
                showOnHomePage: false,
                category: {
                    id: '1',
                    name: 'Administartion'
                },
                enabled: true
            };
        }

        function add(report) {
            return resource.add(report).$promise;
        }

        function edit(report) {
            return resource.edit({
                id: report.id
            }, report).$promise;
        }

        function remove(id) {
            return resource.remove({
                id: id
            }).$promise;
        }

        function getAllByCategory(categoryName) {
            return resource.getAllByCategory({
                categoryName: categoryName
            }).$promise;
        }

    }
})();
