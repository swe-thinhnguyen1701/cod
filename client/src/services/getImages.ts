const GENERAL_HERO_IMAGE_URL =
  "https://d3bhl6gkk81cq1.cloudfront.net/hero-images/";
const ZOOM_HERO_IMAGE_URL =
  "https://d3bhl6gkk81cq1.cloudfront.net/modified-hero-images/";

const SKILL_IMAGE_URL = "https://d3bhl6gkk81cq1.cloudfront.net/hero-skills/";

const heroImageVersion = "v2";

export const getGeneralHeroImage = (heroName: string): string => {
  return `${GENERAL_HERO_IMAGE_URL}${heroName}-full.webp?${heroImageVersion}`;
};

export const getHeroAvatar = (heroName: string): string => {
  return `${GENERAL_HERO_IMAGE_URL}${heroName}-avatar.webp`;
};

export const getZoomHeroImage = (heroName: string): string => {
  return `${ZOOM_HERO_IMAGE_URL}${heroName}-full.webp`;
};

export const getHeroSkillImage = (skillName: string): string => {
  return `${SKILL_IMAGE_URL}${skillName}.png`;
};