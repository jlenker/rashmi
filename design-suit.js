document.addEventListener("DOMContentLoaded", function () {
    /*
        Fabric
    */
    (function() {
        var base_api_url   = 'https://api.airtable.com/v0/appur8GNl81ghwpSy/Fabric?maxRecords=10&view=Grid%20view',
            formula        = '&filterByFormula=',
            records        = [],
            records_length = 0,
            base_color_query = '',
            pattern_query    = '',
            price_tier_query = '',
            brand_query      = '',

            api = function() {
                var url         = base_api_url,
                    local_extra = "";

                if (base_color_query + pattern_query + price_tier_query + brand_query) {
                    if (base_color_query) {
                        local_extra += base_color_query;
                    }
                    if (pattern_query) {
                        local_extra += (local_extra ? ',' : '') + pattern_query;
                    }
                    if (price_tier_query) {
                        local_extra += (local_extra ? ',' : '') + price_tier_query;
                    }
                    if (brand_query) {
                        local_extra += (local_extra ? ',' : '') + brand_query;
                    }
                    local_extra = "AND(" + local_extra +  ")";
                    url += formula + encodeURIComponent(local_extra);
                }


                $.ajax({
                    method:  'GET',
                    url:     url,
                    headers: { 'Authorization': 'Bearer keyKXU2q4rXvyv4Vp'},
                    success: function(data) {
                        var string  = '';
                        records        = data.records;
                        records_length = records.length;

                        for(var i = 0, len = records.length; i < len; i++) {
                            string +=   '<div class="fabric-holder">';
                            string +=       '<div class="fabric-swatch" deluminate_imagetype="png">';
                            string +=           '<div class="text-block-5">' + records[i].fields['Fabric No.'] + '</div>';
                            string +=       '</div>';
                            string +=   '</div>';
                        }
                        document.querySelector('.js-fabrics').innerHTML = string;

                        pagination();
                    }
                });
            },

            pagination = function() {
                document.querySelector('.js-fabric-pagination').innerHTML = records_length + ' items';
            };



        /*
            Initial data
        */
        api();




        // .js-fabric-base-color
        var base_color = {},
            i = 0, len = 0,
            base_color_btns = document.querySelectorAll('.js-fabric-base-color .w-checkbox');

        for (i = 0, len = base_color_btns.length; i < len; i++) {
            (function() {
                var input = base_color_btns[i].querySelector('.w-checkbox-input');
                base_color[input.getAttribute('data-name')] = false;
                input.addEventListener('change', function(e) {
                    base_color[input.getAttribute('data-name')] = input.checked ? true : false;
                }, false);
            })();
        }

        document.querySelector('.js-fabric-base-color .apply-button').addEventListener('click', function(e) {
            var index = 0;

            base_color_query = "OR(";

            for (var property in base_color) {
                if (base_color.hasOwnProperty(property) && base_color[property]) {
                    base_color_query += (index > 0 ? ',' : '') + "{Base Color}='" + property + "'";
                    index++;
                }
            }
            base_color_query = index ? (base_color_query + ")") : '';

            api();

            e.preventDefault();
        }, false);



        // .js-fabric-pattern
        var pattern      = {},
            pattern_btns = document.querySelectorAll('.js-fabric-pattern .w-checkbox');

        for (i = 0, len = pattern_btns.length; i < len; i++) {
            (function() {
                var input = pattern_btns[i].querySelector('.w-checkbox-input');
                pattern[input.getAttribute('data-name')] = false;
                input.addEventListener('change', function(e) {
                    pattern[input.getAttribute('data-name')] = input.checked ? true : false;
                }, false);
            })();
        }

        document.querySelector('.js-fabric-pattern .apply-button').addEventListener('click', function(e) {
            var index = 0;

            pattern_query = "OR(";

            for (var property in pattern) {
                if (pattern.hasOwnProperty(property) && pattern[property]) {
                    pattern_query += (index > 0 ? ',' : '') + "{Pattern}='" + property + "'";
                    index++;
                }
            }
            pattern_query = index ? (pattern_query + ")") : '';

            api();

            e.preventDefault();
        }, false);



        // .js-fabric-price-tier
        var price_tier      = {},
            price_tier_btns = document.querySelectorAll('.js-fabric-price-tier .w-checkbox');

        for (i = 0, len = price_tier_btns.length; i < len; i++) {
            (function() {
                var input = price_tier_btns[i].querySelector('.w-checkbox-input');
                price_tier[input.getAttribute('data-name')] = false;
                input.addEventListener('change', function(e) {
                    price_tier[input.getAttribute('data-name')] = input.checked ? true : false;
                }, false);
            })();
        }

        document.querySelector('.js-fabric-price-tier .apply-button').addEventListener('click', function(e) {
            var index = 0;

            price_tier_query = "OR(";

            for (var property in price_tier) {
                if (price_tier.hasOwnProperty(property) && price_tier[property]) {
                    price_tier_query += (index > 0 ? ',' : '') + "{Price Tier}='" + property + "'";
                    index++;
                }
            }
            price_tier_query = index ? (price_tier_query + ")") : '';

            api();

            e.preventDefault();
        }, false);



        // .js-fabric-brand
        var brand      = {},
            brand_btns = document.querySelectorAll('.js-fabric-brand .w-checkbox');

        for (i = 0, len = brand_btns.length; i < len; i++) {
            (function() {
                var input = brand_btns[i].querySelector('.w-checkbox-input');
                brand[input.getAttribute('data-name')] = false;
                input.addEventListener('change', function(e) {
                    brand[input.getAttribute('data-name')] = input.checked ? true : false;
                }, false);
            })();
        }

        document.querySelector('.js-fabric-brand .apply-button').addEventListener('click', function(e) {
            var index = 0;

            brand_query = "OR(";

            for (var property in brand) {
                if (brand.hasOwnProperty(property) && brand[property]) {
                    brand_query += (index > 0 ? ',' : '') + "{Brand}='" + property + "'";
                    index++;
                }
            }
            brand_query = index ? (brand_query + ")") : '';

            api();

            e.preventDefault();
        }, false);

    })();



    /*
        Jacket
    */
    $.get('https://daks2k3a4ib2z.cloudfront.net/5973abd355f0c353c22f786d/59d6f376a7327a00016aaf73_Jacket-Configurator.svg', function(data) {
        var svg_jacket = document.querySelector('.embedded-design_jacket');
        svg_jacket.innerHTML = (new XMLSerializer).serializeToString(data.children[0]);

        var jacket = {
                breast:       'Single',
                buttons:      'One',
                lapel:        'Notched',
                lapel_width:  'Standard',
                stitching:    'Yes',
                pockets:      'Three',
                pocket_angle: 'Straight',
                boutonniere:  'Yes',
                vent:         'Sides',
                canvassing:   'Half',

                back_visible: false
            },

            breast_single     = svg_jacket.querySelector('#Single_Body_-_Front'),
            breast_single_btn = document.querySelector('.js-single-buttons'),
            breast_double     = svg_jacket.querySelector('#Double_Body_-_Front'),
            breast_double_btn = document.querySelector('.js-double-buttons'),


            update_side = function() {
                if (jacket.back_visible) {
                    svg_jacket.querySelector('#Back').style.display                = 'block';
                    svg_jacket.querySelector('#Single_Body_-_Front').style.display = 'none';
                    svg_jacket.querySelector('#Double_Body_-_Front').style.display = 'none';
                    if (jacket.stitching === 'Yes') {
                        svg_jacket.querySelector('#Stitching_18_').style.display = 'block';
                    } else {
                        svg_jacket.querySelector('#Stitching_18_').style.display = 'none';
                    }
                    update_vents();

                    document.querySelector('.js-jacket-fronside').style.display    = 'none';
                    document.querySelector('.js-jacket-backside').style.display    = 'flex';
                    document.querySelector('.js-jacket-otherside-btn').innerHTML   = 'See FrontSide';

                } else {
                    svg_jacket.querySelector('#Back').style.display                = 'none';
                    update_breast();
                    document.querySelector('.js-jacket-fronside').style.display    = 'block';
                    document.querySelector('.js-jacket-backside').style.display    = 'none';
                    document.querySelector('.js-jacket-otherside-btn').innerHTML   = 'See BackSide';
                }
            },

            update_breast = function() {
                switch (jacket.breast) {
                    case 'Single':
                        update_breast_single();
                        break;
                    case 'Double':
                        update_breast_double();
                        break;
                    default:
                }
            },

            update_breast_single = function() {
                // SVG
                breast_single.style.display = 'block';
                breast_double.style.display = 'none';
                // Radio inputs
                breast_single_btn.style.display = 'flex';
                breast_double_btn.style.display = 'none';
                document.querySelector('.js-lapel-notched').style.display = 'flex';
                // Default to two buttons
                document.querySelector('#One').checked = true;
                jacket.buttons = 'One';
                // Default to Notched
                document.querySelector('#Notched').checked = true;
                jacket.lapel = 'Notched';

                update_buttons();// Buttons have change and we need to reflect it
                update_pockets();// Pockets have change and we need to reflect it
            },

            update_breast_double = function() {
                // SVG
                breast_double.style.display = 'block';
                breast_single.style.display = 'none';
                // Radio inputs
                breast_single_btn.style.display = 'none';
                breast_double_btn.style.display = 'flex';
                document.querySelector('.js-lapel-notched').style.display = 'none';
                // Default to six buttons
                document.querySelector('#Six').checked = true;
                jacket.buttons = 'Six';
                // Default to Peaked
                document.querySelector('#Peaked').checked = true;
                jacket.lapel = 'Peaked';

                update_buttons();// Buttons have change and we need to reflect it
                update_pockets();// Pockets have change and we need to reflect it
            },

            update_buttons = function() {
                switch (jacket.buttons) {
                    case 'One':
                        update_button_one();
                        break;
                    case 'Two':
                        update_button_two();
                        break;
                    case 'Three':
                        update_button_three();
                        break;
                    case 'Four':
                        update_button_four();
                        break;
                    case 'Six':
                        update_button_six();
                        break;
                    default:
                }
            },

            update_button_one = function() {
                svg_jacket.querySelector('#One_Buttons').style.display  = 'block';
                svg_jacket.querySelector('#Two_Buttons').style.display  = 'none';
                svg_jacket.querySelector('#Three_Button').style.display = 'none';

                if (jacket.lapel === 'Notched') {
                    svg_jacket.querySelector('#Noteched_-_One_Button').style.display = 'block';
                    svg_jacket.querySelector('#Peaked_-_One_Button').style.display  = 'none';
                    svg_jacket.querySelector('#Shawl_-_One_Button').style.display    = 'none';

                    if (jacket.lapel_width === 'Standard') {
                        svg_jacket.querySelector('#Notched_-_One_Button_-_Wide').style.display   = 'block';
                        svg_jacket.querySelector('#Notched_-_One_Button_-_Narrow').style.display = 'none';

                        if (jacket.stitching === 'Yes') {
                            svg_jacket.querySelector('#Stitching').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Stitching').style.display   = 'none';
                        }

                        if (jacket.boutonniere === 'Yes') {
                            svg_jacket.querySelector('#Boutonniere_19_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Boutonniere_19_').style.display   = 'none';
                        }

                    } else {
                        svg_jacket.querySelector('#Notched_-_One_Button_-_Wide').style.display   = 'none';
                        svg_jacket.querySelector('#Notched_-_One_Button_-_Narrow').style.display = 'block';

                        if (jacket.stitching === 'Yes') {
                            svg_jacket.querySelector('#Stitching_1_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Stitching_1_').style.display   = 'none';
                        }

                        if (jacket.boutonniere === 'Yes') {
                            svg_jacket.querySelector('#Boutonniere_20_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Boutonniere_20_').style.display   = 'none';
                        }
                    }

                } else if (jacket.lapel === 'Peaked') {
                    svg_jacket.querySelector('#Noteched_-_One_Button').style.display = 'none';
                    svg_jacket.querySelector('#Peaked_-_One_Button').style.display  = 'block';
                    svg_jacket.querySelector('#Shawl_-_One_Button').style.display    = 'none';

                    if (jacket.lapel_width === 'Standard') {
                        svg_jacket.querySelector('#Peaked_-_One_Button_-_Wide').style.display   = 'block';
                        svg_jacket.querySelector('#Peaked_-_One_Button_-_Narrow').style.display = 'none';

                        if (jacket.stitching === 'Yes') {
                            svg_jacket.querySelector('#Stitching_2_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Stitching_2_').style.display   = 'none';
                        }

                        if (jacket.boutonniere === 'Yes') {
                            svg_jacket.querySelector('#Boutonniere_1_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Boutonniere_1_').style.display   = 'none';
                        }

                    } else {
                        svg_jacket.querySelector('#Peaked_-_One_Button_-_Wide').style.display   = 'none';
                        svg_jacket.querySelector('#Peaked_-_One_Button_-_Narrow').style.display = 'block';

                        if (jacket.stitching === 'Yes') {
                            svg_jacket.querySelector('#Stitching_3_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Stitching_3_').style.display   = 'none';
                        }

                        if (jacket.boutonniere === 'Yes') {
                            svg_jacket.querySelector('#Boutonniere_18_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Boutonniere_18_').style.display   = 'none';
                        }
                    }

                } else {
                    svg_jacket.querySelector('#Noteched_-_One_Button').style.display = 'none';
                    svg_jacket.querySelector('#Peaked_-_One_Button').style.display  = 'none';
                    svg_jacket.querySelector('#Shawl_-_One_Button').style.display    = 'block';

                    if (jacket.lapel_width === 'Standard') {
                        svg_jacket.querySelector('#Shawl_-_One_Button_-_Wide').style.display   = 'block';
                        svg_jacket.querySelector('#Shawl_-_One_Button_-_Narrow').style.display = 'none';

                        if (jacket.stitching === 'Yes') {
                            svg_jacket.querySelector('#Stitching_4_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Stitching_4_').style.display   = 'none';
                        }

                        if (jacket.boutonniere === 'Yes') {
                            svg_jacket.querySelector('#Boutonniere_16_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Boutonniere_16_').style.display   = 'none';
                        }

                    } else {
                        svg_jacket.querySelector('#Shawl_-_One_Button_-_Wide').style.display   = 'none';
                        svg_jacket.querySelector('#Shawl_-_One_Button_-_Narrow').style.display = 'block';

                        if (jacket.stitching === 'Yes') {
                            svg_jacket.querySelector('#Stitching_5_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Stitching_5_').style.display   = 'none';
                        }

                        if (jacket.boutonniere === 'Yes') {
                            svg_jacket.querySelector('#Boutonniere_17_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Boutonniere_17_').style.display   = 'none';
                        }
                    }
                }
            },

            update_button_two = function() {
                svg_jacket.querySelector('#One_Buttons').style.display  = 'none';
                svg_jacket.querySelector('#Two_Buttons').style.display  = 'block';
                svg_jacket.querySelector('#Three_Button').style.display = 'none';

                if (jacket.lapel === 'Notched') {
                    svg_jacket.querySelector('#Notched_-_Two_Button').style.display = 'block';
                    svg_jacket.querySelector('#Peaked_-_Two_Button').style.display  = 'none';
                    svg_jacket.querySelector('#Shawl_-_Two_Button').style.display    = 'none';

                    if (jacket.lapel_width === 'Standard') {
                        svg_jacket.querySelector('#Notched_-_Two_Button_-_Wide').style.display   = 'block';
                        svg_jacket.querySelector('#Notched_-_Two_Button_-_Narrow').style.display = 'none';

                        if (jacket.stitching === 'Yes') {
                            svg_jacket.querySelector('#Stitching_6_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Stitching_6_').style.display   = 'none';
                        }

                        if (jacket.boutonniere === 'Yes') {
                            svg_jacket.querySelector('#Boutonniere_10_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Boutonniere_10_').style.display   = 'none';
                        }

                    } else {
                        svg_jacket.querySelector('#Notched_-_Two_Button_-_Wide').style.display   = 'none';
                        svg_jacket.querySelector('#Notched_-_Two_Button_-_Narrow').style.display = 'block';

                        if (jacket.stitching === 'Yes') {
                            svg_jacket.querySelector('#Stitching_7_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Stitching_7_').style.display   = 'none';
                        }

                        if (jacket.boutonniere === 'Yes') {
                            svg_jacket.querySelector('#Boutonniere_11_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Boutonniere_11_').style.display   = 'none';
                        }
                    }

                } else if (jacket.lapel === 'Peaked') {
                    svg_jacket.querySelector('#Notched_-_Two_Button').style.display = 'none';
                    svg_jacket.querySelector('#Peaked_-_Two_Button').style.display  = 'block';
                    svg_jacket.querySelector('#Shawl_-_Two_Button').style.display    = 'none';

                    if (jacket.lapel_width === 'Standard') {
                        svg_jacket.querySelector('#Peaked_-_Two_Button_-_Wide').style.display   = 'block';
                        svg_jacket.querySelector('#Peaked_-_Two_Button_-_Narrow').style.display = 'none';

                        if (jacket.stitching === 'Yes') {
                            svg_jacket.querySelector('#Stitching_8_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Stitching_8_').style.display   = 'none';
                        }

                        if (jacket.boutonniere === 'Yes') {
                            svg_jacket.querySelector('#Boutonniere_12_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Boutonniere_12_').style.display   = 'none';
                        }

                    } else {
                        svg_jacket.querySelector('#Peaked_-_Two_Button_-_Wide').style.display   = 'none';
                        svg_jacket.querySelector('#Peaked_-_Two_Button_-_Narrow').style.display = 'block';

                        if (jacket.stitching === 'Yes') {
                            svg_jacket.querySelector('#Stitching_9_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Stitching_9_').style.display   = 'none';
                        }

                        if (jacket.boutonniere === 'Yes') {
                            svg_jacket.querySelector('#Boutonniere_13_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Boutonniere_13_').style.display   = 'none';
                        }
                    }

                } else {
                    svg_jacket.querySelector('#Notched_-_Two_Button').style.display = 'none';
                    svg_jacket.querySelector('#Peaked_-_Two_Button').style.display  = 'none';
                    svg_jacket.querySelector('#Shawl_-_Two_Button').style.display    = 'block';

                    if (jacket.lapel_width === 'Standard') {
                        svg_jacket.querySelector('#Shawl_-_Two_Button_-_Wide').style.display   = 'block';
                        svg_jacket.querySelector('#Shawl_-_Two_Button_-_Narrow').style.display = 'none';

                        if (jacket.stitching === 'Yes') {
                            svg_jacket.querySelector('#Stitching_10_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Stitching_10_').style.display   = 'none';
                        }

                        if (jacket.boutonniere === 'Yes') {
                            svg_jacket.querySelector('#Boutonniere_14_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Boutonniere_14_').style.display   = 'none';
                        }

                    } else {
                        svg_jacket.querySelector('#Shawl_-_Two_Button_-_Wide').style.display   = 'none';
                        svg_jacket.querySelector('#Shawl_-_Two_Button_-_Narrow').style.display = 'block';

                        if (jacket.stitching === 'Yes') {
                            svg_jacket.querySelector('#Stitching_11_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Stitching_11_').style.display   = 'none';
                        }

                        if (jacket.boutonniere === 'Yes') {
                            svg_jacket.querySelector('#Boutonniere_15_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Boutonniere_15_').style.display   = 'none';
                        }
                    }
                }
            },

            update_button_three = function() {
                svg_jacket.querySelector('#One_Buttons').style.display  = 'none';
                svg_jacket.querySelector('#Two_Buttons').style.display  = 'none';
                svg_jacket.querySelector('#Three_Button').style.display = 'block';

                if (jacket.lapel === 'Notched') {
                    svg_jacket.querySelector('#Notched_-_Three_Button_1_').style.display = 'block';
                    svg_jacket.querySelector('#Peaked_-_Three_Button').style.display  = 'none';
                    svg_jacket.querySelector('#Shawl_-_Three_Button').style.display    = 'none';

                    if (jacket.lapel_width === 'Standard') {
                        svg_jacket.querySelector('#Notched_-_Three_Button_-_Wide').style.display   = 'block';
                        svg_jacket.querySelector('#Notched_-_Three_Button_-_Narrow').style.display = 'none';

                        if (jacket.stitching === 'Yes') {
                            svg_jacket.querySelector('#Stitching_12_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Stitching_12_').style.display   = 'none';
                        }

                        if (jacket.boutonniere === 'Yes') {
                            svg_jacket.querySelector('#Boutonniere_5_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Boutonniere_5_').style.display   = 'none';
                        }

                    } else {
                        svg_jacket.querySelector('#Notched_-_Three_Button_-_Wide').style.display   = 'none';
                        svg_jacket.querySelector('#Notched_-_Three_Button_-_Narrow').style.display = 'block';

                        if (jacket.stitching === 'Yes') {
                            svg_jacket.querySelector('#Stitching_13_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Stitching_13_').style.display   = 'none';
                        }

                        if (jacket.boutonniere === 'Yes') {
                            svg_jacket.querySelector('#Boutonniere_6_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Boutonniere_6_').style.display   = 'none';
                        }
                    }

                } else if (jacket.lapel === 'Peaked') {
                    svg_jacket.querySelector('#Notched_-_Three_Button_1_').style.display = 'none';
                    svg_jacket.querySelector('#Peaked_-_Three_Button').style.display  = 'block';
                    svg_jacket.querySelector('#Shawl_-_Three_Button').style.display    = 'none';

                    if (jacket.lapel_width === 'Standard') {
                        svg_jacket.querySelector('#Peaked_-_Three_Button_-_Wide').style.display   = 'block';
                        svg_jacket.querySelector('#Peaked_-_Three_Button_-_Narrow').style.display = 'none';

                        if (jacket.stitching === 'Yes') {
                            svg_jacket.querySelector('#Stitching_14_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Stitching_14_').style.display   = 'none';
                        }

                        if (jacket.boutonniere === 'Yes') {
                            svg_jacket.querySelector('#Boutonniere_3_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Boutonniere_3_').style.display   = 'none';
                        }

                    } else {
                        svg_jacket.querySelector('#Peaked_-_Three_Button_-_Wide').style.display   = 'none';
                        svg_jacket.querySelector('#Peaked_-_Three_Button_-_Narrow').style.display = 'block';

                        if (jacket.stitching === 'Yes') {
                            svg_jacket.querySelector('#Stitching_15_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Stitching_15_').style.display   = 'none';
                        }

                        if (jacket.boutonniere === 'Yes') {
                            svg_jacket.querySelector('#Boutonniere_4_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Boutonniere_4_').style.display   = 'none';
                        }
                    }

                } else {
                    svg_jacket.querySelector('#Notched_-_Three_Button_1_').style.display = 'none';
                    svg_jacket.querySelector('#Peaked_-_Three_Button').style.display  = 'none';
                    svg_jacket.querySelector('#Shawl_-_Three_Button').style.display    = 'block';

                    if (jacket.lapel_width === 'Standard') {
                        svg_jacket.querySelector('#Shawl_-_Three_Button_-_Wide').style.display   = 'block';
                        svg_jacket.querySelector('#Shawl_-_Three_Button_-_Narrow').style.display = 'none';

                        if (jacket.stitching === 'Yes') {
                            svg_jacket.querySelector('#Stitching_16_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Stitching_16_').style.display   = 'none';
                        }

                        if (jacket.boutonniere === 'Yes') {
                            svg_jacket.querySelector('#Boutonniere_8_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Boutonniere_8_').style.display   = 'none';
                        }

                    } else {
                        svg_jacket.querySelector('#Shawl_-_Three_Button_-_Wide').style.display   = 'none';
                        svg_jacket.querySelector('#Shawl_-_Three_Button_-_Narrow').style.display = 'block';

                        if (jacket.stitching === 'Yes') {
                            svg_jacket.querySelector('#Stitching_17_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Stitching_17_').style.display   = 'none';
                        }

                        if (jacket.boutonniere === 'Yes') {
                            svg_jacket.querySelector('#Boutonniere_9_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Boutonniere_9_').style.display   = 'none';
                        }
                    }
                }
            },

            update_button_four = function() {
                svg_jacket.querySelector('#Four_Button').style.display = 'block';
                svg_jacket.querySelector('#Six_Button').style.display  = 'none';

                if (jacket.lapel === 'Peaked') {
                    svg_jacket.querySelector('#Peaked_-_Four_Button').style.display  = 'block';
                    svg_jacket.querySelector('#Shawl_-_Four_Button_1_').style.display    = 'none';

                    if (jacket.lapel_width === 'Standard') {
                        svg_jacket.querySelector('#Peaked_-_Four_Button_-_Wide').style.display   = 'block';
                        svg_jacket.querySelector('#Peaked_-_Four_Button_-_Narrow').style.display = 'none';

                        if (jacket.stitching === 'Yes') {
                            svg_jacket.querySelector('#Stitching_19_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Stitching_19_').style.display   = 'none';
                        }

                        if (jacket.boutonniere === 'Yes') {
                            svg_jacket.querySelector('#Boutonniere_2_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Boutonniere_2_').style.display   = 'none';
                        }

                    } else {
                        svg_jacket.querySelector('#Peaked_-_Four_Button_-_Wide').style.display   = 'none';
                        svg_jacket.querySelector('#Peaked_-_Four_Button_-_Narrow').style.display = 'block';

                        if (jacket.stitching === 'Yes') {
                            svg_jacket.querySelector('#Stitching_20_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Stitching_20_').style.display   = 'none';
                        }

                        if (jacket.boutonniere === 'Yes') {
                            svg_jacket.querySelector('#Boutonniere_7_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Boutonniere_7_').style.display   = 'none';
                        }
                    }

                } else {
                    svg_jacket.querySelector('#Peaked_-_Four_Button').style.display  = 'none';
                    svg_jacket.querySelector('#Shawl_-_Four_Button_1_').style.display    = 'block';

                    if (jacket.lapel_width === 'Standard') {
                        svg_jacket.querySelector('#Shawl_-_Four_Button_-_Wide_1_').style.display   = 'block';
                        svg_jacket.querySelector('#Shawl_-_Four_Button_Narrow_1_').style.display = 'none';

                        if (jacket.stitching === 'Yes') {
                            svg_jacket.querySelector('#Stitching_25_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Stitching_25_').style.display   = 'none';
                        }

                        if (jacket.boutonniere === 'Yes') {
                            svg_jacket.querySelector('#Boutonniere_25_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Boutonniere_25_').style.display   = 'none';
                        }

                    } else {
                        svg_jacket.querySelector('#Shawl_-_Four_Button_-_Wide_1_').style.display   = 'none';
                        svg_jacket.querySelector('#Shawl_-_Four_Button_Narrow_1_').style.display = 'block';

                        if (jacket.stitching === 'Yes') {
                            svg_jacket.querySelector('#Stitching_26_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Stitching_26_').style.display   = 'none';
                        }

                        if (jacket.boutonniere === 'Yes') {
                            svg_jacket.querySelector('#Boutonniere_26_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Boutonniere_26_').style.display   = 'none';
                        }
                    }
                }
            },

            update_button_six = function() {
                svg_jacket.querySelector('#Four_Button').style.display = 'none';
                svg_jacket.querySelector('#Six_Button').style.display  = 'block';

                if (jacket.lapel === 'Peaked') {
                    svg_jacket.querySelector('#Peaked_-_Six_Button').style.display  = 'block';
                    svg_jacket.querySelector('#Shawl_-_Six_Button').style.display    = 'none';

                    if (jacket.lapel_width === 'Standard') {
                        svg_jacket.querySelector('#Peaked_-_Six_Button_-_Wide_2_').style.display   = 'block';
                        svg_jacket.querySelector('#Peaked_-_Six_Button_-_Narrow_2_').style.display = 'none';

                        if (jacket.stitching === 'Yes') {
                            svg_jacket.querySelector('#Stitching_23_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Stitching_23_').style.display   = 'none';
                        }

                        if (jacket.boutonniere === 'Yes') {
                            svg_jacket.querySelector('#Boutonniere_23_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Boutonniere_23_').style.display   = 'none';
                        }

                    } else {
                        svg_jacket.querySelector('#Peaked_-_Six_Button_-_Wide_2_').style.display   = 'none';
                        svg_jacket.querySelector('#Peaked_-_Six_Button_-_Narrow_2_').style.display = 'block';

                        if (jacket.stitching === 'Yes') {
                            svg_jacket.querySelector('#Stitching_24_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Stitching_24_').style.display   = 'none';
                        }

                        if (jacket.boutonniere === 'Yes') {
                            svg_jacket.querySelector('#Boutonniere_24_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Boutonniere_24_').style.display   = 'none';
                        }
                    }

                } else {
                    svg_jacket.querySelector('#Peaked_-_Six_Button').style.display  = 'none';
                    svg_jacket.querySelector('#Shawl_-_Six_Button').style.display    = 'block';

                    if (jacket.lapel_width === 'Standard') {
                        svg_jacket.querySelector('#Shawl_-_Six_Button_-_Wide').style.display   = 'block';
                        svg_jacket.querySelector('#Shawl_-_Six_Button_Narrow').style.display = 'none';

                        if (jacket.stitching === 'Yes') {
                            svg_jacket.querySelector('#Stitching_21_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Stitching_21_').style.display   = 'none';
                        }

                        if (jacket.boutonniere === 'Yes') {
                            svg_jacket.querySelector('#Boutonniere_22_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Boutonniere_22_').style.display   = 'none';
                        }

                    } else {
                        svg_jacket.querySelector('#Shawl_-_Six_Button_-_Wide').style.display   = 'none';
                        svg_jacket.querySelector('#Shawl_-_Six_Button_Narrow').style.display = 'block';

                        if (jacket.stitching === 'Yes') {
                            svg_jacket.querySelector('#Stitching_22_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Stitching_22_').style.display   = 'none';
                        }

                        if (jacket.boutonniere === 'Yes') {
                            svg_jacket.querySelector('#Boutonniere_21_').style.display   = 'block';
                        } else {
                            svg_jacket.querySelector('#Boutonniere_21_').style.display   = 'none';
                        }
                    }
                }
            },

            update_pockets = function() {
                if (jacket.breast === 'Single') {
                    if (jacket.pocket_angle === 'Straight') {
                        svg_jacket.querySelector('#Pockets_-_Straight').style.display = 'block';
                        svg_jacket.querySelector('#Pockets_-_Slanted').style.display  = 'none';

                        if (jacket.pockets === 'Three') {
                            svg_jacket.querySelector('#Pocket_-_04_-_Ticket_-_Straight').style.display = 'none';
                        } else {
                            svg_jacket.querySelector('#Pocket_-_04_-_Ticket_-_Straight').style.display = 'block';
                        }

                    } else {
                        svg_jacket.querySelector('#Pockets_-_Straight').style.display = 'none';
                        svg_jacket.querySelector('#Pockets_-_Slanted').style.display  = 'block';

                        if (jacket.pockets === 'Three') {
                            svg_jacket.querySelector('#Pocket_-_04_-_Ticket_-_Straight_1_').style.display = 'none';
                        } else {
                            svg_jacket.querySelector('#Pocket_-_04_-_Ticket_-_Straight_1_').style.display = 'block';
                        }
                    }

                } else {
                    if (jacket.pocket_angle === 'Straight') {
                        svg_jacket.querySelector('#Pockets_-_Straight_1_').style.display = 'block';
                        svg_jacket.querySelector('#Pockets_-_Slanted_1_').style.display  = 'none';

                        if (jacket.pockets === 'Three') {
                            svg_jacket.querySelector('#Pocket_-_04_-_Ticket_-_Straight_2_').style.display = 'none';
                        } else {
                            svg_jacket.querySelector('#Pocket_-_04_-_Ticket_-_Straight_2_').style.display = 'block';
                        }

                    } else {
                        svg_jacket.querySelector('#Pockets_-_Straight_1_').style.display = 'none';
                        svg_jacket.querySelector('#Pockets_-_Slanted_1_').style.display  = 'block';

                        if (jacket.pockets === 'Three') {
                            svg_jacket.querySelector('#Pocket_-_04_-_Ticket_-_Straight_3_').style.display = 'none';
                        } else {
                            svg_jacket.querySelector('#Pocket_-_04_-_Ticket_-_Straight_3_').style.display = 'block';
                        }
                    }
                }
            },

            update_vents = function() {
                if (jacket.vent === 'Center') {
                    svg_jacket.querySelector('#Vents_-_Center').style.display = 'block';
                    svg_jacket.querySelector('#Vents_-_Sides').style.display  = 'none';
                    svg_jacket.querySelector('#Vents_-_None').style.display   = 'none';
                } else if (jacket.vent === 'Sides') {
                    svg_jacket.querySelector('#Vents_-_Center').style.display = 'none';
                    svg_jacket.querySelector('#Vents_-_Sides').style.display  = 'block';
                    svg_jacket.querySelector('#Vents_-_None').style.display   = 'none';
                } else {
                    svg_jacket.querySelector('#Vents_-_Center').style.display = 'none';
                    svg_jacket.querySelector('#Vents_-_Sides').style.display  = 'none';
                    svg_jacket.querySelector('#Vents_-_None').style.display   = 'block';
                }
            };



        // Initial State
        update_side();
        update_breast();
        update_buttons();
        update_pockets();


        // Single Breast
        document.querySelector('#Single').addEventListener('change', function(e) {
            jacket.breast = 'Single';
            update_breast();
        }, false);

        // Double Breast
        document.querySelector('#Double').addEventListener('change', function(e) {
            jacket.breast = 'Double';
            update_breast();
        }, false);

        // One button
        document.querySelector('#One').addEventListener('change', function(e) {
            jacket.buttons = 'One';
            update_button_one();
        }, false);

        // Two button
        document.querySelector('#Two').addEventListener('change', function(e) {
            jacket.buttons = 'Two';
            update_button_two();
        }, false);

        // Three button
        document.querySelector('#Three').addEventListener('change', function(e) {
            jacket.buttons = 'Three';
            update_button_three();
        }, false);

        // Four button
        document.querySelector('#Four-5').addEventListener('change', function(e) {
            jacket.buttons = 'Four';
            update_button_four();
        }, false);

        // Six button
        document.querySelector('#Six').addEventListener('change', function(e) {
            jacket.buttons = 'Six';
            update_button_six();
        }, false);

        // Lapel Notched
        document.querySelector('#Notched').addEventListener('change', function(e) {
            jacket.lapel = 'Notched';
             update_buttons();
        }, false);

        // Lapel Peaked
        document.querySelector('#Peaked').addEventListener('change', function(e) {
            jacket.lapel = 'Peaked';
             update_buttons();
        }, false);

        // Lapel Shawl
        document.querySelector('#Shawl').addEventListener('change', function(e) {
            jacket.lapel = 'Shawl';
            update_buttons();
        }, false);

        // Lapel width Standard
        document.querySelector('#Standard-3').addEventListener('change', function(e) {
            jacket.lapel_width = 'Standard';
            update_buttons();
        }, false);

        // Lapel width Narrow
        document.querySelector('#Narrow').addEventListener('change', function(e) {
            jacket.lapel_width = 'Narrow';
            update_buttons();
        }, false);

        // Lapel Stitch Yes
        document.querySelector('#Yes-3').addEventListener('change', function(e) {
            jacket.stitching = 'Yes';
            update_buttons();
        }, false);

        // Lapel Stitch No
        document.querySelector('#No-3').addEventListener('change', function(e) {
            jacket.stitching = 'No';
            update_buttons();
        }, false);

        // Pockets Three
        document.querySelector('#Three-3').addEventListener('change', function(e) {
            jacket.pockets = 'Three';
            update_pockets();
        }, false);

        // Pockets Four
        document.querySelector('#Four-2').addEventListener('change', function(e) {
            jacket.pockets = 'Four';
            update_pockets();
        }, false);

        // Pockets angle Straight
        document.querySelector('#Straight').addEventListener('change', function(e) {
            jacket.pocket_angle = 'Straight';
            update_pockets();
        }, false);

        // Pockets angle Slanted
        document.querySelector('#Slanted').addEventListener('change', function(e) {
            jacket.pocket_angle = 'Slanted';
            update_pockets();
        }, false);

        // Boutonniere Yes
        document.querySelector('#Yes-4').addEventListener('change', function(e) {
            jacket.boutonniere = 'Yes';
            update_buttons();
        }, false);

        // Boutonniere No
        document.querySelector('#No-4').addEventListener('change', function(e) {
            jacket.boutonniere = 'No';
            update_buttons();
        }, false);

        // Vent Center
        document.querySelector('#Center').addEventListener('change', function(e) {
            jacket.vent = 'Center';
            update_vents();
        }, false);

        // Vent Sides
        document.querySelector('#Sides').addEventListener('change', function(e) {
            jacket.vent = 'Sides';
            update_vents();
        }, false);

        // Vent None
        document.querySelector('#None-2').addEventListener('change', function(e) {
            jacket.vent = 'None';
            update_vents();
        }, false);


        document.querySelector('.js-jacket-otherside-btn').addEventListener('click', function(e) {
            jacket.back_visible = !jacket.back_visible;
            update_side();
            e.preventDefault();
            return false;
        }, false);
    });



    /*
        Vest
    */
    $.get('https://daks2k3a4ib2z.cloudfront.net/5973abd355f0c353c22f786d/59cbd682899ef1000105ef53_Vest-Configurator.svg', function(data) {
        var svg_vest = document.querySelector('.embedded-design_vest');
        svg_vest.innerHTML = (new XMLSerializer).serializeToString(data.children[0]);

        var vest = {
                back_visible: false,
                lapel:        'None',
                buttons:      'Four',
                pockets:      'Two',
                back:         'Lining'
            },

            btn_other_side = document.querySelector('.btn-other-side'),
            front          = svg_vest.querySelector('#Front-Vest'),
            back           = svg_vest.querySelector('#Back-Vest'),
            back_lapel     = svg_vest.querySelector('#Lapel-Back'),

            pocket_top_left     = svg_vest.querySelector('#_x30_3-Pocket-Left-Top'),
            pocket_top_right    = svg_vest.querySelector('#_x30_4-Pocket-Right-Top'),
            pocket_bottom_left  = svg_vest.querySelector('#_x30_1-Pocket-Left-Bottom'),
            pocket_bottom_right = svg_vest.querySelector('#_x30_2-Pocket-Right-Bottom'),

            buttons_three       = svg_vest.querySelector('#Three-Button-Group'),
                buttons_three_lapel_notched = svg_vest.querySelector('#Lapel-Notched'),
                buttons_three_lapel_peaked  = svg_vest.querySelector('#Lapel-Peaked'),
            buttons_four        = svg_vest.querySelector('#Four-Button-Group_1_'),
                buttons_four_lapel_notched  = svg_vest.querySelector('#Lapel-Notched_2_'),
                buttons_four_lapel_peaked   = svg_vest.querySelector('#Lapel-Peaked_2_'),
            buttons_five        = svg_vest.querySelector('#Five-Button-Group'),
                buttons_five_lapel_notched  = svg_vest.querySelector('#Lapel-Notched_1_'),
                buttons_five_lapel_peaked   = svg_vest.querySelector('#Lapel-Peaked_1_'),

            update_pockets = function() {
                switch(vest.pockets) {
                    case 'Two':
                        pocket_top_left.style.display  = 'none';
                        pocket_top_right.style.display = 'none';
                        break;
                    case 'Three':
                        pocket_top_left.style.display  = 'block';
                        pocket_top_right.style.display = 'none';
                        break;
                    case 'Four':
                        pocket_top_left.style.display  = 'block';
                        pocket_top_right.style.display = 'block';
                        break;
                }
            },

            update_buttons_lapel = function() {
                switch(vest.buttons) {
                    case 'Three':
                        buttons_three.style.display = 'block';
                        buttons_four.style.display = 'none';
                        buttons_five.style.display = 'none';
                        switch(vest.lapel) {
                            case 'None':
                                buttons_three_lapel_notched.style.display = 'none';
                                buttons_three_lapel_peaked.style.display  = 'none';
                                back_lapel.style.display                  = 'none';
                                break;
                            case 'Notched':
                                buttons_three_lapel_notched.style.display = 'block';
                                buttons_three_lapel_peaked.style.display  = 'none';
                                back_lapel.style.display                  = 'block';
                                break;
                            case 'Peaked':
                                buttons_three_lapel_notched.style.display = 'none';
                                buttons_three_lapel_peaked.style.display  = 'block';
                                back_lapel.style.display                  = 'block';
                                break;
                        }
                        break;

                    case 'Four':
                        buttons_three.style.display = 'none';
                        buttons_four.style.display = 'block';
                        buttons_five.style.display = 'none';
                        switch(vest.lapel) {
                            case 'None':
                                buttons_four_lapel_notched.style.display = 'none';
                                buttons_four_lapel_peaked.style.display  = 'none';
                                back_lapel.style.display                 = 'none';
                                break;
                            case 'Notched':
                                buttons_four_lapel_notched.style.display = 'block';
                                buttons_four_lapel_peaked.style.display  = 'none';
                                back_lapel.style.display                 = 'block';
                                break;
                            case 'Peaked':
                                buttons_four_lapel_notched.style.display = 'none';
                                buttons_four_lapel_peaked.style.display  = 'block';
                                back_lapel.style.display                 = 'block';
                                break;
                        }
                        break;

                    case 'Five':
                        buttons_three.style.display = 'none';
                        buttons_four.style.display = 'none';
                        buttons_five.style.display = 'block';
                        switch(vest.lapel) {
                            case 'None':
                                buttons_five_lapel_notched.style.display = 'none';
                                buttons_five_lapel_peaked.style.display  = 'none';
                                back_lapel.style.display                 = 'none';
                                break;
                            case 'Notched':
                                buttons_five_lapel_notched.style.display = 'block';
                                buttons_five_lapel_peaked.style.display  = 'none';
                                back_lapel.style.display                 = 'block';
                                break;
                            case 'Peaked':
                                buttons_five_lapel_notched.style.display = 'none';
                                buttons_five_lapel_peaked.style.display  = 'block';
                                back_lapel.style.display                 = 'block';
                                break;
                        }
                        break;
                }
            };


        // Initial State
        update_buttons_lapel();
        update_pockets();


        document.querySelector('#form-design_vest').addEventListener('click', function() {
            var lapel   = document.querySelector('input[name="Lapel-Vest"]:checked').value,
                buttons = document.querySelector('input[name="Buttons-Vest"]:checked').value,
                pockets = document.querySelector('input[name="Pockets-Vest"]:checked').value,
                back    = document.querySelector('input[name="Back-Vest"]:checked').value;

            if (vest.lapel !== lapel) {
                vest.lapel = lapel;
                update_buttons_lapel();
            }

            if (vest.buttons !== buttons) {
                vest.buttons = buttons;
                update_buttons_lapel();
            }

            if (vest.pockets !== pockets) {
                vest.pockets = pockets;
                        update_pockets();
            }

            if (vest.back !== back) {
                vest.back = back;
            }
        }, false);

        btn_other_side.addEventListener('click', function() {
            if (vest.back_visible) {
                vest.back_visible = false;
                front.style.display = 'block';
                back.style.display  = 'none';
                btn_other_side.innerHTML = 'See BackSide';

            } else {
                vest.back_visible = true;
                front.style.display = 'none';
                back.style.display  = 'block';
                btn_other_side.innerHTML = 'See FrontSide';
            }
        }, false);
    });



    /*
        Pants
    */
    $.get('https://daks2k3a4ib2z.cloudfront.net/5973abd355f0c353c22f786d/59df81d614d0c5000131219e_Pants.svg', function(data) {
        var svg_pants = document.querySelector('.embedded-design_pants');
        svg_pants.innerHTML = (new XMLSerializer).serializeToString(data.children[0]);

        var pants = {
                fit:        'Slim',
                pleats:     'None',
                //break:      'Standard',
                cuffs:      'No',
                bottons:    'Normal',
                pockets:    'Angled',
                beltloops:  'Yes',
                fasteners:  'Buttons',
                //suspenders: 'Yes',

                back_visible: false
            },


            update_side = function() {
                if (pants.back_visible) {
                    svg_pants.querySelector('#Fronts').style.display = 'none';
                    svg_pants.querySelector('#Backs').style.display  = 'block';
                    update_fit_back();
                    document.querySelector('.js-btn-pants-other-side').innerHTML = 'See FrontSide';

                } else {
                    svg_pants.querySelector('#Fronts').style.display = 'block';
                    svg_pants.querySelector('#Backs').style.display  = 'none';
                    update_fit();
                    document.querySelector('.js-btn-pants-other-side').innerHTML = 'See BackSide';
                }
            },


            update_fit = function() {
                if (pants.fit === 'Slim') {
                    document.querySelector('#Pants_-_Front_-_Slim').style.display    = 'block';
                    document.querySelector('#Pants_-_Front_-_Relaxed').style.display = 'none';
                    if(pants.bottoms === 'Normal') {
                        document.querySelector('#Front_-_Slim_-_Normal_1_').style.display = 'block';
                        document.querySelector('#Front_-_Slim_-_Tappered').style.display  = 'none';

                    } else {
                        document.querySelector('#Front_-_Slim_-_Normal_1_').style.display = 'none';
                        document.querySelector('#Front_-_Slim_-_Tappered').style.display  = 'block';
                    }

                } else {
                    document.querySelector('#Pants_-_Front_-_Slim').style.display    = 'none';
                    document.querySelector('#Pants_-_Front_-_Relaxed').style.display = 'block';
                    if(pants.bottoms === 'Normal') {
                        document.querySelector('#Pants_-_Front_-_Relaxed_-_Normal').style.display   = 'block';
                        document.querySelector('#Pants_-_Front_-_Relaxed_-_Tappered').style.display = 'none';

                    } else {
                        document.querySelector('#Pants_-_Front_-_Relaxed_-_Normal').style.display   = 'none';
                        document.querySelector('#Pants_-_Front_-_Relaxed_-_Tappered').style.display = 'block';
                    }
                }
            },


            update_fit_back = function() {
                if (pants.fit === 'Slim') {
                    document.querySelector('#Pants_-_Back_-_Slim').style.display    = 'block';
                    document.querySelector('#Pants_-_Back_-_Relaxed').style.display = 'none';
                    if(pants.bottoms === 'Normal') {
                        document.querySelector('#Back_-_Slim_-_Normal').style.display = 'block';
                        document.querySelector('#Back_-_Slim_-_Tappered').style.display  = 'none';

                    } else {
                        document.querySelector('#Back_-_Slim_-_Normal').style.display = 'none';
                        document.querySelector('#Back_-_Slim_-_Tappered').style.display  = 'block';
                    }

                } else {
                    document.querySelector('#Pants_-_Back_-_Slim').style.display    = 'none';
                    document.querySelector('#Pants_-_Back_-_Relaxed').style.display = 'block';
                    if(pants.bottoms === 'Normal') {
                        document.querySelector('#Back_-_Relaxed_-_Normal').style.display   = 'block';
                        document.querySelector('#Back_-_Relaxed_-_Tappered').style.display = 'none';

                    } else {
                        document.querySelector('#Back_-_Relaxed_-_Normal').style.display   = 'none';
                        document.querySelector('#Back_-_Relaxed_-_Tappered').style.display = 'block';
                    }
                }
            },


            update_pleats = function() {
                if (pants.pleats === 'None') {
                    document.querySelector('#Pleats_-_Single').style.display = 'none';
                    document.querySelector('#Pleats_-_Double').style.display = 'none';

                } else if (pants.pleats === 'Single') {
                    document.querySelector('#Pleats_-_Single').style.display = 'block';
                    document.querySelector('#Pleats_-_Double').style.display = 'none';

                } else {
                    document.querySelector('#Pleats_-_Single').style.display = 'none';
                    document.querySelector('#Pleats_-_Double').style.display = 'block';
                }
            },


            update_cuffs = function() {
                if (pants.cuffs === 'No') {
                    document.querySelector('#Pants_-_Cuffs').style.display    = 'none';
                    document.querySelector('#Pants_-_Cuffs_1_').style.display = 'none';
                    document.querySelector('#Pants_-_Cuffs_2_').style.display = 'none';
                    document.querySelector('#Pants_-_Cuffs_3_').style.display = 'none';
                    document.querySelector('#Pants_-_Cuffs_4_').style.display = 'none';
                    document.querySelector('#Pants_-_Cuffs_5_').style.display = 'none';
                    document.querySelector('#Pants_-_Cuffs_6_').style.display = 'none';
                    document.querySelector('#Pants_-_Cuffs_7_').style.display = 'none';
                } else {
                    document.querySelector('#Pants_-_Cuffs').style.display    = 'block';
                    document.querySelector('#Pants_-_Cuffs_1_').style.display = 'block';
                    document.querySelector('#Pants_-_Cuffs_2_').style.display = 'block';
                    document.querySelector('#Pants_-_Cuffs_3_').style.display = 'block';
                    document.querySelector('#Pants_-_Cuffs_4_').style.display = 'block';
                    document.querySelector('#Pants_-_Cuffs_5_').style.display = 'block';
                    document.querySelector('#Pants_-_Cuffs_6_').style.display = 'block';
                    document.querySelector('#Pants_-_Cuffs_7_').style.display = 'block';
                }
            },


            update_pockets = function() {
                if (pants.pockets === 'Angled') {
                    document.querySelector('#Pants_-_Pockets_-_Angled').style.display   = 'block';
                    document.querySelector('#Pants_-_Pockets_-_Straight').style.display = 'none';

                } else {
                    document.querySelector('#Pants_-_Pockets_-_Angled').style.display   = 'none';
                    document.querySelector('#Pants_-_Pockets_-_Straight').style.display = 'block';
                }
            },


            update_beltloops = function() {
                if (pants.beltloops === 'Yes') {
                    document.querySelector('#Pants_-_Beltloops_-_Front').style.display = 'block';
                    document.querySelector('#Pants_-_Beltloops_-_Back').style.display  = 'block';

                } else {
                    document.querySelector('#Pants_-_Beltloops_-_Front').style.display = 'none';
                    document.querySelector('#Pants_-_Beltloops_-_Back').style.display  = 'none';
                }
            },


            update_fasteners = function() {
                if (pants.fasteners === 'Buttons') {
                    document.querySelector('#Pants_-_Fasteners_-_Buttons').style.display = 'block';
                    document.querySelector('#Pants_-_Fasteners_-_Buckles').style.display = 'none';

                } else {
                    document.querySelector('#Pants_-_Fasteners_-_Buttons').style.display = 'none';
                    document.querySelector('#Pants_-_Fasteners_-_Buckles').style.display = 'block';
                }
            };


        // Initial State
        update_side();
        update_pleats();
        update_cuffs();
        update_pockets();
        update_beltloops();
        update_fasteners();



        // Fit Slim
        document.querySelector('#Slim').addEventListener('change', function(e) {
            pants.fit = 'Slim';
            update_side();
        }, false);

        // Fit Relaxed
        document.querySelector('#Relaxed').addEventListener('change', function(e) {
            pants.fit = 'Relaxed';
            update_side();
        }, false);

        // Pleats None
        document.querySelector('#None-4').addEventListener('change', function(e) {
            pants.pleats = 'None';
            update_pleats();
        }, false);

        // Pleats Single
        document.querySelector('#Single-2').addEventListener('change', function(e) {
            pants.pleats = 'Single';
            update_pleats();
        }, false);

        // Pleats Double
        document.querySelector('#Double-2').addEventListener('change', function(e) {
            pants.pleats = 'Double';
            update_pleats();
        }, false);

        // Cuffs No
        document.querySelector('#No-5').addEventListener('change', function(e) {
            pants.cuffs = 'No';
            update_cuffs();
        }, false);

        // Cuffs Yes
        document.querySelector('#Yes-5').addEventListener('change', function(e) {
            pants.cuffs = 'Yes';
            update_cuffs();
        }, false);

        // Bottoms Normal
        document.querySelector('#Normal').addEventListener('change', function(e) {
            pants.bottoms = 'Normal';
            update_side();
        }, false);

        // Bottoms Tappered
        document.querySelector('#Tappered').addEventListener('change', function(e) {
            pants.bottoms = 'Tappered';
            update_side();
        }, false);

        // Pockets Angled
        document.querySelector('#Angled').addEventListener('change', function(e) {
            pants.pockets = 'Angled';
            update_pockets();
        }, false);

        // Pockets Horizontal
        document.querySelector('#Horizontal').addEventListener('change', function(e) {
            pants.pockets = 'Horizontal';
            update_pockets();
        }, false);

        // Beltloops Yes
        document.querySelector('#Yes').addEventListener('change', function(e) {
            pants.beltloops = 'Yes';
            update_beltloops();
        }, false);

        // Beltloops No
        document.querySelector('#No').addEventListener('change', function(e) {
            pants.beltloops = 'No';
            update_beltloops();
        }, false);

        // Fasteners Buttons
        document.querySelector('#Buttons').addEventListener('change', function(e) {
            pants.fasteners = 'Buttons';
            update_fasteners();
        }, false);

        // Fasteners Buckles
        document.querySelector('#Buckles').addEventListener('change', function(e) {
            pants.fasteners = 'Buckles';
            update_fasteners();
        }, false);


        document.querySelector('.js-btn-pants-other-side').addEventListener('click', function(e) {
            pants.back_visible = !pants.back_visible;
            update_side();
            e.preventDefault();
            return false;
        }, false);
    });
});
