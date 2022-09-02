import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aulas from 'App/Models/Aula'
import AulaValidator from 'App/Validators/AulaValidator'

export default class AulaController {
  public async index({ }: HttpContextContract) {
    const topic = await Aulas.all()
    return topic
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(AulaValidator)
    const topic = await Aulas.create({ ...data })
    return topic
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const topic = await Aulas.findOrFail(params.id)
      return topic
    } catch (error) {
      response.status(400).send("Tópico não encontrado!!!")
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    const { cpf } = await request.validate(AulaValidator)
    try {
      const topic = await Aulas.findOrFail(params.id)
      topic.cpf = cpf
      await topic.save()
      return topic

    } catch (error) {
      response.status(400).send("Tópico não encontrado!!!")
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const topic = await Aulas.findOrFail(params.id)
      await topic.delete()
      return topic
    } catch (error) {
      response.status(400).send("Tópico não encontrado!!!")
    }
  }
}