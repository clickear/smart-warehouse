var modal = (function () {
    var initDate = function (startDateTimeId, endDateTimeId) {
        var startDate;
        var endDate;
        startDateTimeId = "#" + startDateTimeId;
        endDateTimeId = "#" + endDateTimeId;
        $(startDateTimeId).datetimepicker({
            format: 'Y-m-d',
            formatDate: 'Y-m-d',
           /* minDate: 0,*/
            timepicker: false, // 关闭时间选项
            onChangeDateTime: function (dp, $input) {
                startDate = $(startDateTimeId).val();
            },
            onClose: function (current_time, $input) {
                if (startDate > endDate) {
                    $(startDateTimeId).val(endDate);
                    startDate = endDate;
                }
            }
        });
        $(endDateTimeId).datetimepicker({
            format: 'Y-m-d',
            formatDate: 'Y-m-d',
            timepicker: false, // 关闭时间选项
            onClose: function (current_time, $input) {
                endDate = $(endDateTimeId).val();
                if (startDate > endDate) {
                    $(endDateTimeId).val(startDate);
                    endDate = startDate;
                }
            }
        });
    };

    return {
        initDate: initDate
    };

})();