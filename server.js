const express = require("express")
const app = express();
const PORT = 3000;

const path = require("path");
const bodyParser = require('body-parser');
const Datastore = require('nedb')

const classes_database = new Datastore({
    filename: 'classes_database.db',
    autoload: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// app.set('views', path.join(__dirname, 'views'));
// app.engine('hbs', hbs({
//     defaultLayout: 'main.hbs', helpers: {
//         isNotEdit: function (stringID, options) {
//             if (stringID != lastEdit) {
//                 return options.fn(this)
//             } else {
//                 return options.inverse(this)
//             }
//         },

//     }
// }));
// app.set('view engine', 'hbs');

// app.get("/", function (req, res) {
//     res.render('index.hbs', {});
// })

const data = [
    { option: "_id", value: "Id" },
    { option: "name", value: "Nazwa" },
    { option: "building", value: "Budynek" },
    { option: "floor", value: "Piętro" },
    { option: "x", value: "X" },
    { option: "y", value: "Y" },
]

const buildings = [
    { option: "main", value: "Główny"},
    { option: "tech", value: "Pracownie"},
    { option: "living", value: "Internat"},
]

const floors = [
    { option: "-1", value: "-1"},
    { option: "0", value: "0"},
    { option: "1", value: "1"},
    { option: "2", value: "2"},
]

const dataSliced = data.slice(1);

let lastlyAdded = null;

app.get("/", function (req, res) {
    console.log(dataSliced);
    
    let added = lastlyAdded;
    lastlyAdded = null;
    res.sendFile(path.join(__dirname, "index.html"));
})

app.post("/addReq", function (req, res) {
    console.log("ddddd",req.body.building, req.body.floor);
    
    let dataToAdd = {
        nazwa: req.body.name,
        budynek: req.body.building,
        piętro: req.body.floor,
        x: req.body.x,
        y: req.body.y,
    }
    
    console.log(dataToAdd);
    console.log(req.body);
    
    
    // if(navigator.geolocation){
    //     navigator.geolocation.getCurrentPosition(()=>{
    //         dataToAdd.x = position.coords.latitude
    //         console.log(dataToAdd);
            
    //     });
    // }

    classes_database.insert(dataToAdd, (err, newDoc) => {
        lastlyAdded = newDoc._id;
        res.sendFile(path.join(__dirname, "index.html"));
    })
})

//list
// app.get("/listCars", function (req, res) {
//     cars_database.find({}, function (err, docs) {
//         res.render('list.hbs', { docs: docs, data: data });
//     });
// })

// app.get("/listReq", function (req, res) {
//     const id = req.query.id;
//     cars_database.find({ _id: id }, {}, function (err, docs) {
//     });
// })

// //delete one
// let numRemoved = null;
// app.get("/deleteCars", function (req, res) {
//     cars_database.find({}, function (err, docs) {
//         res.render('delete.hbs', { docs: docs, data: data, numRemoved: numRemoved });
//     });
// })

// app.get("/delReq", function (req, res) {
//     const id = req.query.id;
//     console.log(req.query.id)
//     cars_database.remove({ _id: id }, { multi: true }, function (err) {
//         numRemoved = 1;
//         res.redirect('/deleteCars');
//     });
// })

// //deleteALL
// app.get("/deleteAll", function (req, res) {
//     cars_database.remove({}, { multi: true }, function (err) {
//         res.redirect('/deleteCars');
//     });
// })

// //delete selected
// app.get("/deleteSelected", function (req, res) {
//     let id = 0;
//     id = req.query.idCheckbox;
//     checker = Array.isArray(id)
//     console.log(id)
//     console.log(checker)
//     console.log(req.query.idCheckbox)
//     console.log(id.length)
//     if (!checker) {
//         cars_database.remove({ _id: id }, {}, function (err) {
//             res.redirect('/deleteCars');
//         });
//     }
//     else {
//         let i = 0;
//         while (i < id.length) {
//             cars_database.remove({ _id: id[i] }, { multi: true }, function (err) {
//                 numRemoved = id.length
//             });
//             i += 1;
//             numRemoved = id.length
//         }

//         console.log(numRemoved)
//         res.redirect('/deleteCars');
//     }
// })


// //edit
// let editId = undefined;
// let lastEdit = undefined;

// app.get("/editCars", function (req, res) {
//     lastEdit = editId;
//     editId = undefined;
//     cars_database.find({}, function (err, docs) {
//         res.render('edit.hbs', { docs: docs, data: data, editId: lastEdit });
//     });
// })

// app.get("/editReq", function (req, res) {

//     editId = req.query.id;

//     if (req.query.ubezpieczony) {       //jezeli cos zostanie zmeinione
//         if (!req.query.cancel) {
//             let dataToEdit = {
//                 ubezpieczony: req.query.ubezpieczony,
//                 benzyna: req.query.benzyna,
//                 uszkodzony: req.query.uszkodzony,
//                 naped4x4: req.query.naped4x4,
//             }
//             cars_database.update({ _id: editId }, { $set: dataToEdit }, {}, function (err, num) { })
//         }
//         editId = undefined;
//         res.redirect('/editCars');
//         return;
//     }
//     res.redirect('/editCars');
// })

//app.use(express.static('static'))

app.listen(PORT, () => {
    console.log("Server " + PORT);
})