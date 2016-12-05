
(function(){
    "use strict";

    /**
    *@ngdoc directive
    *@name openlmis-core.directive:select
    *@restrict E
    *@description directive for simple implementing <ui-select> element.
    *
    */

    angular.module("openlmis-core").directive('select', select);

    select.$inject = ['$parse'];
    function select($parse) {
        return {
            restrict: 'E',
            replace: false,
            require: ['ngModel', 'select'],
            priority: 111, // Runs after ngSelect, ngOptions, and ngOption
            link: function(scope, element, attrs, ctrls){
                var ngModelCtrl = ctrls[0];
                var selectCtrl = ctrls[1];

                ngModelCtrl.$render = setSelectState;

                function setSelectState(){
                    var select2Options = {
                        placeholder: false,
                        allowClear: true
                    };


                    selectCtrl.renderUnknownOption = function(){};
                    selectCtrl.removeOption = function(){};
                    // Remove unknown option from ngOptions
                    jQuery(element).children('option[value="?"]').remove();

                    // Add empty option, if not already there
                    var emptyOption = element.children('option[value=""]');
                    if(!emptyOption.length){
                        element.prepend('<option value=""></option>');
                    }

                    if(attrs.placeholder){
                        select2Options.placeholder = attrs.placeholder;
                        // check if there is an empty option already and update it's text
                        element.children('option[value=""]').text(attrs.placeholder);
                    }

                    if(!ngModelCtrl.$viewValue || ngModelCtrl.$viewValue == ""){
                        ngModelCtrl.$setViewValue("", false);
                        element.val("");
                    }

                    var options = element.children('option:not(option[value=""]):not(option[value="?"])');

                    if(options.length <= 1){
                        element.attr("disabled", true);
                    } else {
                        element.attr("disabled", false);
                    }
                    
                    if(options.length == 1){
                        var firstValue = options[0].value;
                        setViewValue(firstValue);
                    }

                    jQuery(element).select2(select2Options)
                    .on('change', function(e){
                        setViewValue(e.val);
                    });
                }

                function setViewValue(value){
                    element.val(value);
                    var viewValue = selectCtrl.readValue();
                    ngModelCtrl.$setViewValue(viewValue);
                }
            }
        };
    }
})();