const xperss = require('express');
const path = require('path');
const fs = require('fs');
const port = 8000;
const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = xperss();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(xperss.urlencoded({extended: true}));
app.use(xperss.static(path.join(__dirname, 'assets')));

// var contactList = [
//     {
//         name: "Name1",
//         phone: "8921489283"
//     },
//     {
//         name: "Tony",
//         phone: "9837828918"
//     },
//     {
//         name: "HelloBacho",
//         phone: "9292392929"
//     }
// ]


app.get('/', (req,res)=>{
    // fs.readFile('./index.html', (err, data)=>{
    //     return res.end(data);
    // })
    Contact.find({}, (err,contacts)=>{
        return res.render('home', {
            title: 'MY Contact List',
            contact_list: contacts
        })
    })
    // res.render('home',{
    //     title: 'My contact List', contact_list: contactList
    // }); 
})

app.get('/practice', (req,res)=>{
    // res.end("Hello");
    res.render('practice', {
        title: 'lets play a bit'
    })
})

app.post('/create-contact', (req,res)=>{
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err)
        {
            return err;
        }
        console.log('**********', newContact);
        res.redirect('/');
    });
});

app.get('/delete-contact/:phone', (req,res)=>{
    console.log(req.params.phone);
    // Contact.find({phone: req.params.phone}, (err,deletion)=>{
    //     console.log(deletion);
    // })
    Contact.deleteOne({ phone: req.params.phone }, (err)=>{
        if(err)
        console.log(err);
    });
    res.redirect('/');
})

//Use below GET request if query is used. Make necessary changes in EJS also
// app.get('/delete-contact', (req,res)=>{
//     console.log(req.query);
//     for(i in contactList){ 
//         if(contactList[i].phone==req.query.phone){
//             contactList.splice(i,1);
//         }
//     }
//     res.redirect('/');
// })

app.listen(port, (err)=>{
    if(err){
        console.log("Error");
    }
    console.log("Express server is running bro!");
})