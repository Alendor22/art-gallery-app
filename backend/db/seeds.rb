# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# Artist.create([
#   {name: "Pablo Picaso", age: 91, gender: "M"},
#   {name: "Vincent Van Gogh", age: 37, gender: "M"},
#   {name: "Jean-Michel Basquiat", age: 27, gender: "M"},
#   {name: "Max Ernst", age: 84, gender: "M"},
#   {name: "Salvidor Dali", age: 87, gender: "M"},
#   {name: "Andy Warhol", age: 58, gender: "M"},
#   {name: "Fransico Goya", age: 82, gender: "M"},
#   {name: "Keith Harring", age: 31, gender: "M"}
# ])

# Painting.create([
#   {title: "The Marriage of Heaven and Hell", style: "Abstract art", price: "$6,000,000" },
#   {title: "Guernica", style: "Cubism", price: "$200,000,000" },
#   {title: "The Starry Night", style: "Post-Impressionism", price: "$115,000,000" },
#   {title: "Boxer", style: "Abstract art", price: "$13,522,500" },
#   {title: "The Triumph of Surrealism", style: "Surrealism", price: "$7,000,000" },
#   {title: "The Persistence of Memory", style: "Surrealism", price: "550,000,000" },
#   {title: "Campbells Soup Can", style: "Pop art", price: "$11,776,000" },
#   {title: "Saturn Devouring His Son", style: "Mythological painting", price: "100,000,000" }
#   ])

  Painting.find_by_id(1).update(artist_ids: [8])
  Painting.find_by_id(2).update(artist_ids: [1])
  Painting.find_by_id(3).update(artist_ids: [2])
  Painting.find_by_id(4).update(artist_ids: [3])
  Painting.find_by_id(5).update(artist_ids: [4])
  Painting.find_by_id(6).update(artist_ids: [5])
  Painting.find_by_id(7).update(artist_ids: [6])
  Painting.find_by_id(8).update(artist_ids: [7])
