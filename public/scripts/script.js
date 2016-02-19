//var salaryTotal = 0.00;
//var empArray = [];

$(document).ready(function() {
    $('#submit').on('click', postData);

    getData();
});

function postData() {
    event.preventDefault();

    var values = {};
    var thisEmpSalary = 0.00;

    $.each($('#employeeForm').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    thisEmpSalary = parseFloat(values.empSalary);
    salaryTotal += Math.round(thisEmpSalary / 12);
    values.empSalary = Math.round(thisEmpSalary);

    console.log(values);

    $('input').val('');

    $.ajax({
        type: 'POST',
        url: '/employees',
        data: values,
        success: function(data) {
            if(data) {
                // everything went ok
                console.log('from server:', data);
                getData();
            } else {
                console.log('error');
            }
        }
    });

}

    //$('#employeeForm').on('submit', function(event) {
    //    //event.preventDefault();
    //    //var values = {};
    //    //var thisEmpSalary = 0.00;
    //
    //    //$.each($('#employeeForm').serializeArray(), function(i, field) {
    //    //    values[field.name] = field.value;
    //    //});
    //
    //    //thisEmpSalary = parseFloat(values.empSalary);
    //    //salaryTotal += Math.round(thisEmpSalary / 12);
    //    //values.empSalary = Math.round(thisEmpSalary);
    //
    //    empArray.push(values);
    //
    //    $('#employeeForm').find('input[type=text], input[type=number]').val('');
    //    $('#empFirstName').focus();
    //
    //    updateSalary(salaryTotal);
    //    appendDom(values);
    //});

function getData() {
    $('.sql-data').remove();
    $.ajax({
        type: 'GET',
        url: '/employees',
        success: function(data){
            console.log(data);
            sendToDom(data);
        }
    });
}

function sendToDom(peopleData){
    //console.log("hi");
    for (var person in peopleData) {

        var per = peopleData[person];
        //console.log(per);

        $('#person-table').append('<tr class="sql-data"><td>' + per.first_name + '</td><td>' + per.last_name + '</td><td>' + per.employee_id + '</td><td>' + per.job_title + '</td><td>' + per.salary + '</td></tr>');
    }
}

    $('#container').on('click', '.removeEmployee', function() {
        var index = $(this).data().id;
        var employee = empArray[index];
        console.log("This Employee:", employee);

        salaryTotal -= Math.round(employee.empSalary / 12);
        updateSalary(salaryTotal);

        $(this).parent().remove();
    });

    function updateSalary(salary) {
        $('#salaryAmount').text('$ ' + salary);
    }


    function appendDom(empInfo) {
        $('#container').append('<div></div>');
        var $el = $('#container').children().last();
        $el.append('<p>' + empInfo.empFirstName + ' ' + empInfo.empLastName + '</p>');
        $el.append('<p>' + empInfo.empIDNumber + '</p>');
        $el.append('<p>' + empInfo.empJobTitle + '</p>');
        $el.append('<p>$' + empInfo.empSalary + '</p>');

        $el.append('<button class="removeEmployee" data-id="' +
            (empArray.length - 1) + '">Remove Me!</button>');



    }


