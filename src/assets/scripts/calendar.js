$.datepicker._defaults.onAfterUpdate = null;

var datepicker__updateDatepicker = $.datepicker._updateDatepicker;
$.datepicker._updateDatepicker = function (inst) {
    datepicker__updateDatepicker.call(this, inst);

    var onAfterUpdate = this._get(inst, 'onAfterUpdate');
    if (onAfterUpdate) onAfterUpdate.apply((inst.input ? inst.input[0] : null), [(inst.input ? inst.input.val() : ''), inst]);
}
var eventDates = {};
datas = document.forms["resa"]["resaDates"].value.split(" ");
datas.forEach(element => {
    eventDates[new Date(element)] = new Date(element);
});

$(function () {

    var cur = -1,
        prv = -1;
    $('#jrange div')
        .datepicker({
            //numberOfMonths: 3,
            minDate: new Date(),
            disabledDates: [new Date()],
            showButtonPanel: true,
            firstDay: 1,
            dateFormat: 'dd/mm/yy',
            altField: "#datepicker",
            closeText: 'Fermer',
            prevText: 'Précédent',
            nextText: 'Suivant',
            currentText: 'Aujourd\'hui',
            monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
            dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
            dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
            dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
            weekHeader: 'Sem.',
            beforeShowDay: function (date) {
                var highlight = eventDates[date];
                return highlight ? [true, "event", 'Tooltip text'] : [true, ((date.getTime() >= Math.min(prv, cur) && date.getTime() <= Math.max(prv, cur)) ? 'date-range-selected' : '')];
            },

            onSelect: function (dateText, inst) {
                var d1, d2;

                prv = cur;
                cur = (new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay)).getTime();
                if (prv == -1 || prv == cur) {
                    prv = cur;
                    $('#jrange input').val(dateText);
                } else {
                    d1 = $.datepicker.formatDate('dd/mm/yy', new Date(Math.min(prv, cur)), {});
                    d2 = $.datepicker.formatDate('dd/mm/yy', new Date(Math.max(prv, cur)), {});
                    $('#jrange input').val(d1 + ' - ' + d2);
                }
            },

            onChangeMonthYear: function (year, month, inst) {
                //prv = cur = -1;
            },

            onAfterUpdate: function (inst) {
                if (document.forms["resa"]["auth"].value == 1) {
                    $('<button type="submit" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">Réserver</button>')
                        .appendTo($('#jrange div .ui-datepicker-buttonpane'));
                }
            }
        })
        .position({
            my: 'left top',
            at: 'left bottom',
            of: $('#jrange input')
        })

    $('#jrange input').on('focus', function (e) {
        var v = this.value,
            d;

        try {
            if (v.indexOf(' - ') > -1) {
                d = v.split(' - ');

                prv = $.datepicker.parseDate('dd/mm/yy', d[0]).getTime();
                cur = $.datepicker.parseDate('dd/mm/yy', d[1]).getTime();

            } else if (v.length > 0) {
                prv = cur = $.datepicker.parseDate('dd/mm/yy', v).getTime();
            }
        } catch (e) {
            cur = prv = -1;
        }

        if (cur > -1) $('#jrange div').datepicker('setDate', new Date(cur));

        $('#jrange div').datepicker('refresh').show();
    });

});

Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() + days);
    return dat;
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(currentDate)
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

function validateForm(duree) {
    var v = document.forms["resa"]["dates"].value;
    var dateArray = new Array();
    if (v.indexOf(' - ') > -1) {
        d = v.split(' - ');
        start = d[0].split('/');
        end = d[1].split('/');
        dateArray = getDates(
            new Date(parseInt(start[2]),
                parseInt(start[1]) - 1,
                parseInt(start[0])),
            new Date(parseInt(end[2]),
                parseInt(end[1]) - 1,
                parseInt(end[0])));
        if (dateArray.length > duree) {
            alert("Vous devez respecter le nombre de jours maximal pour cet objet");
            return false;
        }
    } else if (v.length > 0) {
        date = v.split('/');
        dateArray = [new Date(parseInt(date[2]),
            parseInt(date[1]) - 1,
            parseInt(date[0]))];
    } else
        return false;
    for (i = 0; i < dateArray.length; i++) {
        if (eventDates[dateArray[i]] !== undefined) {
            alert("Vous ne pouvez choisir une date déjà réservée");
            return false;
        }
    }
}