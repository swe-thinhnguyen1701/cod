const GENERAL_HERO_IMAGE_URL =
  "https://d3bhl6gkk81cq1.cloudfront.net/hero-full/";
const ZOOM_HERO_IMAGE_URL =
  "https://d3bhl6gkk81cq1.cloudfront.net/modified-hero-images/";
const SKILL_IMAGE_URL = "https://d3bhl6gkk81cq1.cloudfront.net/hero-skills/";
const HERO_AVATAR_URL = "https://d3bhl6gkk81cq1.cloudfront.net/hero-avatar/";
const ARTIFACT_IMAGE_URL = "https://d3bhl6gkk81cq1.cloudfront.net/artifacts/"

// const heroImageVersion = "v2";

export const getGeneralHeroImage = (heroName: string): string => {
  return `${GENERAL_HERO_IMAGE_URL}${heroName}.webp`;
};

export const getHeroAvatar = (heroName: string): string => {
  return `${HERO_AVATAR_URL}${heroName}.webp`;
};

export const getZoomHeroImage = (heroName: string): string => {
  return `${ZOOM_HERO_IMAGE_URL}${heroName}-full.webp`;
};

export const getHeroSkillImage = (skillImage: string): string => {
  return `${SKILL_IMAGE_URL}${skillImage}`;
};

export const getArtifactImage = (artifactName: string): string => {
  return `${ARTIFACT_IMAGE_URL}${artifactName}.webp`;
};