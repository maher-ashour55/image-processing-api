import express from 'express'
import resizeImage from '../utilities/resize.js'
import path from 'path'
import fs from 'fs'

const router = express.Router()

router.get('/', async (req, res) => {
  const filename = req.query.filename as string
  const width = parseInt(req.query.width as string)
  const height = parseInt(req.query.height as string)

  if (!filename || !width || !height) {
    return res.status(400).send('Missing parameters')
  }

  const fullPath = path.resolve(`images/full/${filename}.jpg`)

  if (!fs.existsSync(fullPath)) {
    return res.status(404).send('Image not found')
  }

  try {
    const output = await resizeImage(filename, width, height)
    res.sendFile(output)
  } catch {
    res.status(500).send('Processing error')
  }
})

export default router