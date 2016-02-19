//var salaryTotal = 0.00;
//var empArray = [];

$(document).ready(function() {
    $('#submit').on('click', postData);
    //$('.#').on('click', removeEmployee);

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

    //updateSalary(salaryTotal);

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

        $('#person-table').append('<tr class="sql-data"><td>' + per.first_name + '</td><td>' + per.last_name + '</td><td>' + per.employee_id + '</td><td>' + per.job_title + '</td><td>' + per.salary + '</td><td>' + '<button id= "'+ per.id +'" class="removeEmployee">Remove Me!</button></td></tr>');
    }
}

//function removeEmployee(){
//    event.preventDefault();
//
//    var values = {};
//
//    $.each($('#person-table').serializeArray(), function(i, field) {
//        values[field.name] = field.value;
//    });
//
//    console.log(values);
//
//    $.ajax({
//        type: 'POST',
//        url: '/remove_employee',
//        data: values,
//
//        success: function(data) {
//            if(data) {
//                // everything went ok
//                console.log('from server:', data);
//                updateSalary();
//            } else {
//                console.log('error');
//            }
//        }
//    });
//
//        //salaryTotal -= Math.round(employee.empSalary / 12);
//        //updateSalary(salaryTotal);
//
//        $(this).parent().remove();
//}

//function updateSalary(salary) {
//        $('#salaryAmount').text('$ ' + salary);
//    }


