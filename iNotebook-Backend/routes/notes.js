const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');


//ROUTE 1:Fetch all Nodes   using GET "api/notes/getuser" login required     
router.get('/fetchallnodes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json({ notes });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }

})

//ROUTE 2:Add a new Note  using POST "api/notes/addnote" login required  
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid Name').isLength({ min: 3 }),
    body('description', 'Description should be atleast five character').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // If there are any type of error then give bad request and error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save()
        res.json({ saveNote });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})
//ROUTE 3:Update an existing Note using PUT "api/notes/updatenote" login required     
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //Create a newNote Object 
    try {
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        // Find the Note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Note not found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }

})
//ROUTE 4:Delete an existing Note using DELETE "api/notes/deletenote" login required     
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the Note to be delete and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Note not found") }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "success": "Note has been Deleted", note: note });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})
module.exports = router;