export class BaseRepository {
  prisma;

  constructor(prisma) {
    this.prisma = prisma;
  }

  findAll() {
    throw Error("findAll 메서드");
  }

  save() {
    throw Error("save 메서드");
  }

  findById(id) {
    throw Error("findById 메서드");
  }
}
