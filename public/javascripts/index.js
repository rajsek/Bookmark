var timeout;
var is_editing = false;
var id = null;
var address = null;
var name = null;
var node = null;

function showForm() {

    is_editing = false;
    $('#form_container input[type="text"]').val('');
    $('.form-group').removeClass('has-error');
    $('#user_action').html('Add');
    $('#form_modal').modal('show');
}

function showError(msg) {
    if (typeof timeout != 'undefined')
        clearTimeout(timeout);

    $('#error_msg').html(msg).css('visibility', 'visible');
    timeout = setTimeout(function () {
        $('#error_msg').css('visibility', 'hidden');
    }, 4000);
}

function send(url, method, data) {
    var _this = this;
    $.ajax({
        cache: false
        , type: method
        , url: url
        , dataType: 'json'
        , data: data
        , error: function (jXhr) {
            if (jXhr.status == 400 || jXhr.status == 500 || jXhr.status == 404)
                showError('Invalid Request');
        }
        , success: function (data) {
            $('#form_modal').modal('hide');
            $('#alertMsg').html(data.msg).show();
            setTimeout(function () {
                location.reload(); //add it the page

                //                '< p data - content_type = "' + Dev Tool + '"data-name = "' + SQL + '"data-address = "' + URL + '" data-id = "' + ID + '" data-parentid = "' + id + '"class = "linkContainer" > < a href = "http://www.bootply.com/" target = "_blank" > < span class = "glyphicon glyphicon-link" > < /span><span> SQL</span > < /a><span style="color:red;" title="Delete" class="icon BtnDelete glyphicon glyphicon-trash pull-right"></span > < span style = "color:blue;" title = "Edit" class = "icon BtnEdit glyphicon glyphicon-pencil pull-right" > < /span></p >'


            }, 2000);
        }
    });
};


$(document).ready(function () {

    $('.addChild').on('click', function (e) {
        e.preventDefault();
        node = $(this);
        $('#form_container #content_type option[value="' + $(this).data('content_type') + '"]').prop('selected', true);
        $('#form_container #content_type').prop('disabled', true);
        showForm();
    });

    $('.addTopic').on('click', function (e) {
        e.preventDefault();
        $('#form_container #content_type option:eq(0)').prop('selected', true);
        $('#custom_name').val('').parents('#container_custom').hide();
        $('#form_container #content_type').prop('disabled', false).show();
        showForm();
    });

    $('#content_type').on('change', function (e) {
        e.preventDefault();

        if ($(this).val() == 'Custom')
            $('#custom_name').val('').parents('#container_custom').show();
        else
            $('#custom_name').val('').parents('#container_custom').hide();
    });

    $('.BtnDelete').on('click', function (e) {
        e.preventDefault();
        var $this = $(this);
        var id = $(this).parents().data('parentid').trim()
        var childid = $(this).parent().data('id').trim()

        $.ajax({
            cache: false
            , type: 'post'
            , url: '/remove/'
            , dataType: 'json'
            , data: {
                'id': id
                , 'childid': childid
            }
            , error: function (jXhr) {
                if (jXhr.status == 400 || jXhr.status == 500)
                    home.showError(jXhr.msg);
            }
            , success: function (data) {
                $this.parent().remove();
                $('#alertMsg').html(data.msg).show();

                if (typeof timeout != 'undefined')
                    clearTimeout(timeout);

                timeout = setTimeout(function () {
                    $('#alertMsg').html('').hide();
                }, 4000);
            }
        });
    });

    $('.BtnEdit').on('click', function (e) {
        e.preventDefault();

        id = $(this).parents().data('parentid').trim()
        childid = $(this).parent().data('id').trim()
        name = $(this).parent().data('name')
        address = $(this).parent().data('address');

        $('#form_container #content_type option[value="' + $(this).parents().data('content_type').trim() + '"]').prop('selected', true);


        $('#form_container #content_type').prop('disabled', true);
        $('#container_custom').hide();
        $('#website_name').val(name);
        $('#website_addr').val(address);
        $('.form-group').removeClass('has-error');
        is_editing = true;
        $('#user_action').html('Edit');
        $('#form_modal').modal('show');
    });

    $('#btn_submit').on('click', function (e) {
        e.preventDefault();
        $('.form-group').removeClass('has-error');

        var regex = new RegExp(/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i);
        try {
            if ($('#custom_name').is(':visible') && !$('#custom_name').val().length)
                throw {
                    msg: 'Name is Empty'
                    , elt: '#custom_name'
                };
            if (!$('#website_name').val().length)
                throw {
                    msg: 'Name for the Website is Empty'
                    , elt: '#website_name'
                };
            if (!$('#website_addr').val().length)
                throw {
                    msg: 'Url for the Website is Empty'
                    , elt: '#website_addr'
                };
            if (!$('#website_addr').val().match(regex))
                throw {
                    msg: 'Invalid URI'
                    , elt: '#website_addr'
                };

            var content_type = $('#content_type').val() == 'Custom' ? $.trim($('#custom_name').val()) : $('#content_type').val();
            if (is_editing) {
                send('/update/', 'POST', {
                    'id': childid
                    , 'name': name
                    , 'address': address
                    , 'content_type': content_type
                    , 'website_name': $.trim($('#website_name').val())
                    , 'website_addr': $.trim($('#website_addr').val())
                });
            } else {
                send('/addList/', 'POST', {
                    'content_type': content_type
                    , 'website_name': $.trim($('#website_name').val())
                    , 'website_addr': $.trim($('#website_addr').val())
                });
            }

        } catch (e) {
            if (e.elt)
                $(e.elt).parents('.form-group').addClass('has-error');

            showError(e.msg);
        }
    });
});