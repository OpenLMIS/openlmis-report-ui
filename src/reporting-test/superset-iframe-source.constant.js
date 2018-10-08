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

    angular
        .module('reporting-test')
        .constant(
            'SUPERSET_IFRAME_SOURCE',
            'https://superset.ona.io/superset/explore/?form_data=%7B%22datasource%22%3A%2292__table%22%2C%22viz_type%' +
            '22%3A%22table%22%2C%22slice_id%22%3A1578%2C%22granularity_sqla%22%3A%22r_created_date%22%2C%22time_grain' +
            '_sqla%22%3Anull%2C%22since%22%3A%2210+years+ago%22%2C%22until%22%3A%22now%22%2C%22groupby%22%3A%5B%22reg' +
            ' ion_name%22%2C%22district_name%22%2C%22processing_period_name%22%2C%22facility_name%22%2C%22full_produc' +
            't_name%22%2C%22stock_status%22%5D%2C%22metrics%22%3A%5B%5D%2C%22percent_metrics%22%3A%5B%5D%2C%22timeser' +
            'ies_limit_metric%22%3Anull%2C%22row_limit%22%3A250%2C%22include_time%22%3Afalse%2C%22order_desc%22%3Atru' +
            'e%2C%22all_columns%22%3A%5B%5D%2C%22order_by_cols%22%3A%5B%5D%2C%22adhoc_filters%22%3Anull%2C%22table_ti' +
            'mestamp_format%22%3A%22%25Y-%25m-%25d+%25H%3A%25M%3A%25S%22%2C%22page_length%22%3A0%2C%22include_search%' +
            '22%3Atrue%2C%22table_filter%22%3Atrue%2C%22align_pn%22%3Afalse%2C%22color_pn%22%3Atrue%2C%22url_params%2' +
            '2%3A%7B%7D%2C%22filters%22%3A%5B%5D%7D&standalone=true&height=400'
        );

})();