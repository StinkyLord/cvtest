import {PrismaClient} from '@prisma/client'
import {BasicModel} from "../types/basic";

export class BasicService {
    client: PrismaClient

    constructor(client: PrismaClient) {
        this.client = client
    }

    async findByUserId(userId: number): Promise<BasicModel> {
        return await this.client.basic.findUnique({
            where: {userId: userId},
            include: {likes: true, outputs: true, qualifications: true},
        })
    }

    async create(userId: number, basicModel: BasicModel): Promise<BasicModel> {
        if (!basicModel) return null
        await this.client.$transaction([
            this.client.basic.create({
                data: {
                    nickname: basicModel.nickname,
                    birthday: basicModel.birthday,
                    job: basicModel.job,
                    belongTo: basicModel.belongTo,
                    userId: userId,

                    outputs: {
                        create:
                            basicModel.outputs?.map(o => ({
                                name: o.name,
                                url: o.url,
                                icon: o.icon,
                            })),
                    },

                    likes: {
                        create:
                            basicModel.likes?.map(l => ({
                                name: l.name,
                            })),
                    },

                    qualifications: {
                        create:
                            basicModel.qualifications?.map(q => ({
                                name: q.name,
                                org: q.org,
                                url: q.url,
                                date: q.date,
                                note: q.note,
                            }))
                    }
                },
            })
        ])

        return this.findByUserId(userId)
    }

    // FIXME:
    /*      async update(userId: number, basicModel: Basic): Promise<Basic | null> {
              const before = await this.findByUserId(userId)
              if (!before) {
                  return null
              }

              await this.client.$transaction([
                  // this.client.output.deleteMany({where: {id: {in: before.outputs?.map(o => o.id)}}}),
                  // this.client.like.deleteMany({where: {id: {in: before.likes?.map(l => l.id)}}}),
                  // this.client.qualification.deleteMany({where: {id: {in: before.qualifications?.map(q => q.id)}}}),

                  this.client.basic.update({
                      where: {id: Number(basicModel.id) || undefined},
                      data: {
                          nickname: basicModel.nickname,
                          birthday: basicModel.birthday,
                          job: basicModel.job,
                          belongTo: basicModel.belongTo,

                          outputs: {
                              create:
                                  basicModel.outputs?.map(o => ({
                                      name: o.name,
                                      url: o.url,
                                      icon: o.icon,
                                  })),
                          },

                          likes: {
                              create:
                                  basicModel.likes?.map(l => ({
                                      name: l.name,
                                  })),
                          },

                          qualifications: {
                              create:
                                  basicModel.qualifications?.map(q => ({
                                      name: q.name,
                                      org: q.org,
                                      url: q.url,
                                      date: q.date,
                                      note: q.note,
                                  }))
                          }
                      },
                  }),
              ])

              const after = await this.findByUserId(userId)
              if (!after) {
                  return null
              }

              fs.writeFileSync('../../app/public/data/basic.json', JSON.stringify(after, null, 2))

              return after
          }*/
}