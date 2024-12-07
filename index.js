const Joi = require('joi');

const express = require ('express');
const app = express();

app.use(express.json());


const courses =[
    {id:1, name: 'course1'},
    {id:2, name: 'course2'},
    {id:3, name: 'course3'},
];

//----------------------POST-------------------------
app.post('/api/courses', (req, res) =>{
    const { error } = validateCourse(req.body); //getting result.error
    if (error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});
//----------------------------PUT------------------------------
app.put('/api/courses/:id', (req, res) =>{
    //Find up a Course
    //If not existing, return error 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    //if no course founf it will return 404 not found
    if (!course) res.status(404).send('No Course Found');


    //validate
    //if invalid return 400
    
    const { error } = validateCourse(req.body); //getting result.error
    
    //error code if bad request
    if (error){
        res.status(400).send(result.error.details[0].message);
        return;
    }


    //update course
    course.name= req.body.name;
    //retrun the updated course
    res.send(course);



});


function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

app.get('/api/courses',(req, res) =>{
    res.send(courses);
});

//----------------------------GET------------------------------
app.get('/api/courses/:id',(req, res) =>{
   const course = courses.find(c => c.id === parseInt(req.params.id));
   //if no course founf it will return 404 not found
   if (!course) {
    res.status(404).send('No Course Found');
    return;
    }
});

app.get ('/api/posts/:year/:month',(req, res) =>{
    res.send(req.query);
});


app.delete('/api/courses/:id', (req, res) =>{
//find available course
//not existing return error
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('No Course Found');
        return;
    }


    //delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);




    //return the same course
    res.send(course);



});


// change the value of PORT by typing in cmd set PORT='value'

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening Clear on port ${port}`));


