const { Hero } = require("../models");
const heroData = require("../db/heroes");

const seedHeros = async () => {
    const heroImageURL = `https://d3bhl6gkk81cq1.cloudfront.net/hero-images/`
    try {
        const modifyHeroData = heroData.map(hero => {
            const heroAvatar = `${heroImageURL}${hero.name}-avatar.webp`;
            const heroImage = `${heroImageURL}${hero.name}-full.webp`;
            return {
                ...hero,
                avatar: heroAvatar,
                image: heroImage
            }
        });
        console.log("🌱 Seeding heroes...");
        await Hero.bulkCreate(modifyHeroData, { returning: true });
        console.log("✅ Seeding complete!");
        // return heroes;
    } catch (error) {
        console.error("❌ Error seeding heroes:", error);
    }
}

module.exports = seedHeros;
