import express from 'express'
const router  =express.Router()
import { Book } from "../Models/Bookmodel.js"

// Route for Save new book 
router.post('/', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishyear
        ) {
            return res.status(400).send({ message: 'seand all required fields:title, author,publushyear' })
        }
        const newbook = {
            title: req.body.title,
            author: req.body.author,
            publishyear: req.body.publishyear
        }
        const book = await Book.create(newbook)
        return res.status(201).send(book)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

//  Route for get All Books from database
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({})
        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})



//  Route for get All Books from database by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findById(id)
        return res.status(200).json(book)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

//  Routes for update a Book
router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title ||
            !req.body.author ||
            !req.body.publishyear) {
            return res.status(400).send({
                message: 'send all required fieldss : title  , author ,publishyear'
            })
        }
        const { id } = req.params
        const result = await Book.findByIdAndUpdate(id, req.body)
        if (!result) {
            return res.status(404).json({ message: 'Book not found' })
        }
        return res.status(200).send({ message: 'Book Updated Succesfully' })

    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})



// Route for Delete a book
router.delete('/:id', async (req ,res)=>{
    try {
        const {id} = req.params
        const result = await Book.findByIdAndDelete(id)
        if (!result) {
            return res.status(404).json({ message: 'Book not found' })
        }
        return res.status(200).send({ message: 'Book deleted Succesfully' })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

export default router;