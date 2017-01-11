(function() {

    'use strict';

    angular
        .module('requisition-convert-to-order')
        .config(routes);

    routes.$inject = ['$stateProvider', 'RequisitionRights'];

    function routes($stateProvider, RequisitionRights) {

        $stateProvider.state('requisitions.convertToOrder', {
            showInNavigation: true,
            label: 'link.requisitions.convertToOrder',
            url: '/convertToOrder?filterBy&filterValue&sortBy&descending',
            controller: 'ConvertToOrderCtrl',
            controllerAs: 'vm',
            templateUrl: 'requisition-convert-to-order/convert-to-order.html',
            accessRights: [RequisitionRights.REQUISITION_CONVERT_TO_ORDER],
            params: {
                filterBy: 'all',
                filterValue: ''
            },
            resolve: {
                requisitions: requisitionsResolve
            }
        });

        function requisitionsResolve($stateParams, requisitionService) {
            return requisitionService.forConvert({
                filterBy: $stateParams.filterBy,
                filterValue: $stateParams.filterValue,
                sortBy: $stateParams.sortBy,
                descending: $stateParams.descending
            });
        }

    }

})();
