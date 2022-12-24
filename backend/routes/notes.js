const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const fatchuser = require('../middleware/fatchuser');
const Note = require('../models/Note')

// Router 1 : Get all the Notes using : GET "api/notes/fatchalluser". login required
router.get('/fatchallnotes', fatchuser, async (req, res) => {
    try {

        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occurred");
    }
})

// Route 2 : add a new note using post :"/api/notes/addnote": login required
router.post('/addnote', fatchuser, [
    body('title', 'please a enter viled title').isLength({ min: 3 }),
    body('tag', 'Description atleast 5 characters').isLength({ min: 5 }),
],
    async (req, res) => {
        try {

            const { title, description, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            });
            const saveNotes = await note.save();
            res.json(saveNotes);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error occurred");
        }
    })
// Route 3 : update a new note using put :"/api/notes/updatenote": login required
router.put('/updatenote/:id', fatchuser, async (req, res) => {
    try {
        
        const { title, description, tag } = req.body;
        // create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };
    
    
    
        // find the note to be updated and update it 
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };
    
    
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
    
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        // console.log(newNote)
        res.json({ note });
    } catch (error) {  
        console.error(error.message);
        res.status(500).send("Some Error occurred");
    }

})
// Route 4: delete a new note using delete :"/api/notes/deletenote": login required
router.delete('/deletenote/:id', fatchuser, async (req, res) => {
    try {
        // find the note to be updated and update it 
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };

        // allow deletion only if user owns this Note 
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted ", note: note });
    }catch (error) {  
        console.error(error.message);
        res.status(500).send("Some Error occurred");
    }
})

module.exports = router;