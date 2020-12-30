import db from "./index"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const seed = async () => {
  await db.product.create({
    data: {
      name: "Aperol Spritz",
      description:
        "Sweet and bitter - combined. A classic drink for every occasion. Best with a slice of orange.",
      price: 0,
      available: true,
      intensity: "Relatively Light",
    },
  })
  await db.product.create({
    data: {
      name: "Margarita",
      description:
        "You love Tequila? Yeah? Than Margerita might be your new favorite. Otherwise its probably good too.",
      price: 0,
      available: true,
      intensity: "Strong",
    },
  })
  await db.product.create({
    data: {
      name: "Stawberry Daiquiri",
      description:
        "You may have heard of strawberry slush. Now get ready for the Strawberry Daiquiri which is basically the boozy version of it.",
      intensity: "Medium",
      price: 0,
      available: true,
    },
  })

  // for (let i = 0; i < 5; i++) {
  //   await db.project.create({ data: { name: "Project " + i } })
  // }
}

export default seed
