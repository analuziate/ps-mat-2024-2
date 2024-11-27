import prisma from '../database/client.js'
import Customer from '../models/customer.js'
import { ZodError } from 'zod'

const controller = {} // Objeto vazio

controller.create = async function (req, res) {
  try {
    // Chama a validação do Zod para o cliente
    Customer.parse(req.body)

    await prisma.customer.create({ data: req.body })

    // HTTP 201: Created
    res.status(201).end()
  } catch (error) {
    console.error(error)

    // Se for erro de validação do Zod retorna HTTP 422: Unprocessable Entity
    if (error instanceof ZodError) res.status(422).send(error.issues)
    else res.status(500).end() // HTTP 500: Internal Server Error
  }
}

controller.retrieveAll = async function (req, res) {
  try {
    const result = await prisma.customer.findMany({
      orderBy: [{ name: 'asc' }],
      include: {
        cars: req.query.include === 'cars',
      },
    })

    // HTTP 200: OK (implícito)
    res.send(result)
  } catch (error) {
    console.error(error)
    res.status(500).end() // HTTP 500: Internal Server Error
  }
}

controller.retrieveOne = async function (req, res) {
  try {
    const result = await prisma.customer.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        cars: req.query.include === 'cars',
      },
    })

    if (result) res.send(result) // Encontrou -> retorna HTTP 200: OK (implícito)
    else res.status(404).end() // Não encontrou -> retorna HTTP 404: Not Found
  } catch (error) {
    console.error(error)
    res.status(500).end() // HTTP 500: Internal Server Error
  }
}

controller.update = async function (req, res) {
  try {
    // Validação do modelo Customer com Zod
    Customer.parse(req.body)

    const result = await prisma.customer.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    })

    if (result) res.status(204).end() // Encontrou e atualizou -> HTTP 204: No Content
    else res.status(404).end() // Não encontrou -> HTTP 404: Not Found
  } catch (error) {
    console.error(error)

    // Se for erro de validação do Zod, retorna HTTP 422: Unprocessable Entity
    if (error instanceof ZodError) res.status(422).send(error.issues)
    else res.status(500).end() // HTTP 500: Internal Server Error
  }
}

controller.delete = async function (req, res) {
  try {
    await prisma.customer.delete({
      where: { id: Number(req.params.id) },
    })

    res.status(204).end() // Encontrou e excluiu -> HTTP 204: No Content
  } catch (error) {
    if (error?.code === 'P2025') {
      res.status(404).end() // Não encontrou e não excluiu -> HTTP 404: Not Found
    } else {
      console.error(error)
      res.status(500).end() // HTTP 500: Internal Server Error
    }
  }
}

export default controller