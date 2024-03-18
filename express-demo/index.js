const express = require('express');
const app = express();

app.use(express.json());


const fruits = [
    {id: 1, name: 'Grapes'},
    {id: 2, name: 'Apple'},
    {id: 3, name: 'Orange'},
    {id: 4, name: 'Star Apple'},
    {id: 5, name: 'Banana'},
    {id: 6, name: 'Pineapple'},
    {id: 7, name: 'Watermelon'}

];

//view all
app.get('/api/fruits', (req,res) => {
    res.send(fruits);
})

//view specific
app.get('/api/fruits/:id', (req,res) => {
    const fruit = fruits.find(c => c.id === parseInt(req.params.id));
    if(!fruit) res.status(404).send('the fruit with the given id is not found');
    res.send(fruit);    
});

//create
app.post('/api/fruits', (req,res) => {
    if (!req.body.name || req.body.name.length < 3){
        res.status(400).send('Name is required and should be minimum of 3 characters.');
        return;
    }
    const fruit = {
        id:fruits.length + 1,
        name: req.body.name
    };
    fruits.push(fruit);
    res.send(fruit)

})

//update

app.put('/api/fruits/:id', (req,res) => {
    const fruit = fruits.find(c=>c.id  === parseInt(req.params.id));
    if(!fruit)res.status(404).send('the fruit with the given id is not found');
    fruit.name = req.body.name;
    res.send(fruit);

});


//delete
app.delete('/api/fruits/:id',(req,res) => {
    const fruit = fruits.find(c => c.id === parseInt(req.params.id));
    if(!fruit) res.status(404).send('the fruit with the given id is not found');

    const index = fruits.indexOf(fruit);
    fruits.splice(index, 1);
    
    res.send(fruit);
})


app.listen(3000, () => console.log('listening on port 3000...'));