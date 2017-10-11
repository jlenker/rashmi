document.addEventListener("DOMContentLoaded", function () {
    /*
        Jacket
    */
    $.get('https://daks2k3a4ib2z.cloudfront.net/5973abd355f0c353c22f786d/59d6f376a7327a00016aaf73_Jacket-Configurator.svg', function(data) {
        var svg_jacket = document.querySelector('.embedded-design_jacket');
        svg_jacket.innerHTML = (new XMLSerializer).serializeToString(data.children[0]);

        var jacket = {
                breast:       'Single',
                buttons:      'Six',
                lapel:        'Notched',
                stitching:    'Yes',
                pockets:      'Three',
                pocket_angle: 'Straight',
                boutonniere:  'Yes',
                vent:         'Sides',
                canvassing:   'Half'

            },

            breast_single     = svg_jacket.querySelector('#Single_Body_-_Front'),
            breast_single_btn = document.querySelector('.js-single-buttons'),
            breast_double     = svg_jacket.querySelector('#Double_Body_-_Front'),
            breast_double_btn = document.querySelector('.js-double-buttons'),

            buttons_one       = svg_jacket.querySelector('#Single_Body_-_Front'),

            update_breast = function() {
                switch(jacket.breast) {
                    case 'Single':
                        // SVG
                        breast_double.style.display = 'none';
                        breast_single.style.display = 'block';
                        // Radio inputs
                        breast_single_btn.style.display = 'flex';
                        breast_double_btn.style.display = 'none';
                        // Default to two buttons
                        document.querySelector('#One').checked = true;
                        jacket.buttons = 'One';
                        break;
                    case 'Double':
                        // SVG
                        breast_double.style.display = 'block';
                        breast_single.style.display = 'none';
                        // Radio inputs
                        breast_single_btn.style.display = 'none';
                        breast_double_btn.style.display = 'flex';
                        // Default to six buttons
                        document.querySelector('#Six').checked = true;
                        jacket.buttons = 'Six';
                        break;
                }
            },

            update_buttons = function() {
                switch(jacket.buttons) {
                    case 'One':
                        breast_double.style.display = 'none';
                        breast_single.style.display = 'block';
                        break;
                    case 'Two':
                        breast_double.style.display = 'none';
                        breast_single.style.display = 'block';
                        break;
                    case 'Three':
                        breast_double.style.display = 'none';
                        breast_single.style.display = 'block';
                        break;
                    case 'Four':
                        breast_double.style.display = 'block';
                        breast_single.style.display = 'none';
                        break;
                    case 'Six':
                        breast_double.style.display = 'block';
                        breast_single.style.display = 'none';
                        break;
                }
            };


        // Initial State
        update_breast();


        document.querySelector('#form-design_jacket').addEventListener('click', function() {
            var lapel        = document.querySelector('input[name="Lapel-Jacket"]:checked').value,
                stitching    = document.querySelector('input[name="Stitching"]:checked').value,
                pockets      = document.querySelector('input[name="Pockets-Jacket"]:checked').value,
                pocket_angle = document.querySelector('input[name="Pockets-Jacket-Angle"]:checked').value,
                boutonniere  = document.querySelector('input[name="Boutonniere"]:checked').value,
                vent         = document.querySelector('input[name="Vent"]:checked').value,
                canvassing   = document.querySelector('input[name="Canvassing"]:checked').value;

            jacket.breast = document.querySelector('input[name="Breast"]:checked').value;
            update_breast();

            jacket.buttons = document.querySelector('input[name="Buttons-Jacket"]:checked').value;
            update_buttons();
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
});
