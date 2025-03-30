const { Hero } = require("../models");
const heroData = require("../db/heroes");

const seedHeros = async () => {
    try {
        const modifyHeroData = heroData.map(hero => {
            const heroAvatar = `${hero.avatar}${hero.name}-avatar.webp`;
            return {
                ...hero,
                avatar: heroAvatar
            }
        });
        console.log("🌱 Seeding heroes...");
        const heroes = await Hero.bulkCreate(modifyHeroData, {returning: true});
        console.log("✅ Seeding complete!");
        return heroes;
    } catch(error) {
        console.error("❌ Error seeding heroes:", error);
    }
}

module.exports = seedHeros;
