var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// bring in pg module
var pg = require('pg');
var connectionString = '';
if(process.env.DATABASE_URL != undefined) {
    connectionString = process.env.DATABASE_URL + 'ssl';
} else {
    connectionString = 'postgres://localhost:5432/iota_weekend_01';
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

 //get data route
app.get('/employees', function(req, res) {
    var results = [];
    pg.connect(connectionString, function(err, client, done) {
        var query = client.query('SELECT * FROM employees ORDER BY id DESC;');

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // close connection
        query.on('end', function() {
            done();
            return res.json(results);
        });

        if(err) {
            console.log(err);
        }
    });
});

app.post('/employees', function(req, res) {
    var addEntry = {
        first_name: req.body.empFirstName,
        last_name: req.body.empLastName,
        employee_id: req.body.empIDNumber,
        job_title: req.body.empJobTitle,
        salary: req.body.empSalary
    };

    pg.connect(connectionString, function(err, client, done) {
        client.query("INSERT INTO employees (first_name, last_name, employee_id, job_title, salary) VALUES ($1, $2, $3, $4, $5) RETURNING id",
            [addEntry.first_name, addEntry.last_name, addEntry.employee_id, addEntry.job_title, addEntry.salary],
            function (err, result) {
                done();
                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                } else {
                    res.send(result);
                }
            });
    });

});

app.get('/*', function(req, res) {
    var file = req.params[0] || '/views/index.html';
    res.sendFile(path.join(__dirname, './public', file));
});


app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});