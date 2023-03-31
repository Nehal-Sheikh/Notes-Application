const Note = require('../Models/note');

exports.getNotes = async(req, res ,next) => {                                                                               //to reach the route we have to register it on the app.js file
    try{
        const notes = await Note.find()
        res.json(notes);   
    } catch (err){
        res.status(500).json({message: err.message})
    }
};

exports.getNote = async(req, res, next) => {
    const noteId = req.params.noteId;
    const note = await Note.findById(noteId);
    console.log(note);
    res.json(note)
}

exports.createNote = (req, res, next) => {
    const title = req.body.title;                                                                                       //here we are taking the input from the user through input forms and storing it in the variable
    const course = req.body.course;
    const topic = req.body.topic;
    const description = req.body.description;
    const reminder = false;

    const note = new Note({
        title: title,
        course: course,
        topic: topic,
        description: description,
        reminder: reminder
    })
    note.save()
    .then(result => {
        console.log(result);
        res.status(201).json({                                                                                              //201 is called the success code with some resources added or created
            message: "Note Added Successfully!",
            note: result                                                                                                   //here we are assuming the saved information in the variable from above to the new variable or method you can say
        })
    })
    .catch(err => {console.log(err);})
}

exports.deleteNote = async(req, res, next) => {
    const noteId = req.params.noteId;
    await Note.findByIdAndRemove(noteId)
    .then(() => {
        console.log("note deleted");
        res.status(201).json({message: "Note Deleted"})
    })
    .catch(err => {console.log(err)})
}
