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
     * @name report-category.reportCategoryService
     *
     * @description
     * Responsible for retrieving report category information from server.
     */
    angular
        .module('report-category')
        .service('reportCategoryService', service);

    service.$inject = ['openlmisUrlFactory', '$resource'];

    function service(openlmisUrlFactory, $resource) {

        var resource = $resource(openlmisUrlFactory('/api/reports/reportCategories'), {}, {
            addReportCategory: {
                method: 'POST',
                url: openlmisUrlFactory('/api/reports/reportCategories')
            },
            editReportCategory: {
                method: 'PUT',
                url: openlmisUrlFactory('/api/reports/reportCategories/:id')
            },
            getReportCategories: {
                method: 'GET',
                url: openlmisUrlFactory('/api/reports/reportCategories')
            },
            getReportCategory: {
                method: 'GET',
                url: openlmisUrlFactory('/api/reports/reportCategories/:categoryId')
            },
            deleteReportCategory: {
                method: 'DELETE',
                url: openlmisUrlFactory('/api/reports/reportCategories/:categoryId')
            }
        });

        return {
            addReportCategory: addReportCategory,
            editReportCategory: editReportCategory,
            getReportCategories: getReportCategories,
            getReportCategory: getReportCategory,
            deleteReportCategory: deleteReportCategory
        };

        function addReportCategory(category) {
            return resource.addReportCategory(category).$promise;
        }

        function editReportCategory(category) {
            return resource.editReportCategory({
                id: category.id
            }, category).$promise;
        }

        function getReportCategories() {
            var categories = [
                {
                    id: '1',
                    name: 'Administartion'
                },
                {
                    id: '2',
                    name: 'Orders'
                },
                {
                    id: '3',
                    name: 'Stock'
                },
                {
                    id: '4',
                    name: 'Products'
                }
            ];

            return categories;
            //return resource.getReportCategories().$promise;
        }

        function getReportCategory(id) {
            return resource.getReportCategory({
                categoryId: id
            }).$promise;
        }

        function deleteReportCategory(categoryId) {
            return resource.deleteReportCategory({
                categoryId: categoryId
            }).$promise;
        }

    }
})();
