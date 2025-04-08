import express from 'express'

const app = express()
app.use(express.json())

const trees = [
    {name: "Feketefenyő", category: "tűlevelű", price: 24900, isEvergreen: true},
    {name: "Cédrus", category: "díszfa", price: 39900, isEvergreen: true},
    {name: "Diófa", category: "gyümölcsfa", price: 34900, isEvergreen: false}
]
app.get('/trees', (req, res) => {
    res.status(200).json(trees);
})

app.get('/trees/:id', (req, res) => {
    const id = req.params.id
    if(id < 0 || id >= trees.length){
        return res.status(404).json({message: 'Tree not found'})
    }
    res.status(200).json(trees[id])
})

app.post('/trees', (req, res) => {
    const {name, category, price, isEvergreen} = req.body;
    if(!name || !category || !price || isEvergreen == null){
        return res.status(400).json({message: 'Missing some data'})
    }
    const newTree = {name, category, price, isEvergreen}
    trees.push(newTree)
    res.status(201).json(newTree)
})

app.put('/trees/:id', (req, res) => {
    const id = req.params.id
    if(id < 0 || id >= trees.length){
        return res.status(404).json({message: 'Tree not found'})
    }
    const {name, category, price, isEvergreen} = req.body;
    if(!name || !category || !price || isEvergreen == null){
        return res.status(400).json({message: 'Missing some data'})
    }
    trees[id] = {name, category, price, isEvergreen}
    res.status(200).json(trees[id])
})

app.delete('/trees/:id', (req, res) => {
    const id = req.params.id
    if(id < 0 || id >= trees.length){
        return res.status(404).json({message: 'Tree not found'})
    }
    trees.splice(id, 1);
    res.status(200).json({message: 'Delete success'})
})
app.listen(3010, () => {
    console.log('Server runs on port 3010')
})