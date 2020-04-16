class Artist {
  static all = []

  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.age = data.age
    this.gender = data.gender
    this.painting = data.painting
    this.save()
  }

  save() {
    Artist.all.push(this)
  }
  
}