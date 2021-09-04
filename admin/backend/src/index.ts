import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use(cors())

// ------------------------------------------------------------------
// Basic
// ------------------------------------------------------------------

app.get('/basic', async (req, res) => {
    const basics = await prisma.basic.findMany()
    res.json(basics)
})

app.get('/basic/:id', async (req, res) => {
    const { id }: { id?: string } = req.params
    const basic = await prisma.basic.findUnique({
        where: { id: Number(id) },
    })
    res.json(basic)
})

app.put('/basic/:id', async (req, res) => {
    const { id } = req.params
    const { nickname, birthday, job, belongTo } = req.body
    try {
        const updatedBasic = await prisma.basic.update({
            where: { id: Number(id) || undefined },
            data: {
                nickname: nickname,
                birthday: birthday,
                job: job,
                belongTo: belongTo,
            },
        })
        res.json(updatedBasic)
    } catch (error) {
        res.json({ error: `Basic with ID ${id} does not exist in the database` })
    }
})

// ------------------------------------------------------------------
// Note
// ------------------------------------------------------------------

// ------------------------------------------------------------------
// Skill
// ------------------------------------------------------------------

// ------------------------------------------------------------------
// Career
// ------------------------------------------------------------------

app.listen(3002, () => console.log('start server at :3002'))