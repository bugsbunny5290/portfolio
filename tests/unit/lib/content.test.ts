import { describe, it, expect } from "vitest";
import { getContent, skillCategories } from "@/lib/content";
import * as contentEn from "@/lib/content/en";
import * as contentDe from "@/lib/content/de";

describe("getContent function", () => {
  it("should return English content for 'en' locale", () => {
    const content = getContent("en");
    expect(content.personalInfo.name).toBe("Pranav Gautam");
    expect(content).toEqual(contentEn);
  });

  it("should return German content for 'de' locale", () => {
    const content = getContent("de");
    expect(content.personalInfo.name).toBe("Pranav Gautam");
    expect(content).toEqual(contentDe);
  });
});

describe("English content", () => {
  const content = contentEn;

  describe("personalInfo", () => {
    it("should have all required fields", () => {
      expect(content.personalInfo).toHaveProperty("name");
      expect(content.personalInfo).toHaveProperty("title");
      expect(content.personalInfo).toHaveProperty("tagline");
      expect(content.personalInfo).toHaveProperty("location");
      expect(content.personalInfo).toHaveProperty("email");
      expect(content.personalInfo).toHaveProperty("website");
      expect(content.personalInfo).toHaveProperty("github");
    });

    it("should have valid email format", () => {
      expect(content.personalInfo.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });

    it("should have valid website URL", () => {
      expect(content.personalInfo.website).toMatch(/^https?:\/\//);
    });

    it("should have valid GitHub URL", () => {
      expect(content.personalInfo.github).toMatch(/^https:\/\/github\.com\//);
    });
  });

  describe("professionalSummary", () => {
    it("should be a non-empty string", () => {
      expect(typeof content.professionalSummary).toBe("string");
      expect(content.professionalSummary.length).toBeGreaterThan(100);
    });
  });

  describe("experiences", () => {
    it("should have at least one experience", () => {
      expect(content.experiences.length).toBeGreaterThan(0);
    });

    it("each experience should have required fields", () => {
      content.experiences.forEach((exp) => {
        expect(exp).toHaveProperty("company");
        expect(exp).toHaveProperty("role");
        expect(exp).toHaveProperty("location");
        expect(exp).toHaveProperty("startDate");
        expect(exp).toHaveProperty("endDate");
        expect(exp).toHaveProperty("description");
        expect(exp).toHaveProperty("highlights");
        expect(exp).toHaveProperty("technologies");
        expect(Array.isArray(exp.highlights)).toBe(true);
        expect(Array.isArray(exp.technologies)).toBe(true);
      });
    });
  });

  describe("education", () => {
    it("should have at least one education entry", () => {
      expect(content.education.length).toBeGreaterThan(0);
    });

    it("each education should have required fields", () => {
      content.education.forEach((edu) => {
        expect(edu).toHaveProperty("degree");
        expect(edu).toHaveProperty("institution");
        expect(edu).toHaveProperty("location");
        expect(edu).toHaveProperty("startYear");
        expect(edu).toHaveProperty("endYear");
      });
    });
  });

  describe("skills", () => {
    it("should have skills in all categories", () => {
      skillCategories.forEach((category) => {
        const categorySkills = content.skills.filter((s) => s.category === category);
        expect(categorySkills.length).toBeGreaterThan(0);
      });
    });

    it("each skill should have name and category", () => {
      content.skills.forEach((skill) => {
        expect(skill).toHaveProperty("name");
        expect(skill).toHaveProperty("category");
        expect(skillCategories).toContain(skill.category);
      });
    });
  });

  describe("spokenLanguages", () => {
    it("should have at least one language", () => {
      expect(content.spokenLanguages.length).toBeGreaterThan(0);
    });

    it("each language should have required fields", () => {
      content.spokenLanguages.forEach((lang) => {
        expect(lang).toHaveProperty("language");
        expect(lang).toHaveProperty("level");
        expect(lang).toHaveProperty("cefr");
      });
    });

    it("should include Hindi as native language", () => {
      const hindi = content.spokenLanguages.find((l) => l.language === "Hindi");
      expect(hindi).toBeDefined();
      expect(hindi?.level).toBe("Native");
    });
  });

  describe("whatIDo", () => {
    it("should have multiple items", () => {
      expect(content.whatIDo.length).toBeGreaterThan(0);
    });

    it("each item should have title and description", () => {
      content.whatIDo.forEach((item) => {
        expect(item).toHaveProperty("title");
        expect(item).toHaveProperty("description");
        expect(item.title.length).toBeGreaterThan(0);
        expect(item.description.length).toBeGreaterThan(0);
      });
    });
  });

  describe("navLinks", () => {
    it("should have navigation links", () => {
      expect(content.navLinks.length).toBeGreaterThan(0);
    });

    it("each link should have href and label", () => {
      content.navLinks.forEach((link) => {
        expect(link).toHaveProperty("href");
        expect(link).toHaveProperty("label");
        expect(link.href.startsWith("/")).toBe(true);
      });
    });

    it("should include home link", () => {
      const homeLink = content.navLinks.find((l) => l.href === "/");
      expect(homeLink).toBeDefined();
    });
  });
});

describe("German content", () => {
  const content = contentDe;

  it("should have translated location", () => {
    expect(content.personalInfo.location).toContain("Deutschland");
  });

  it("should have translated spoken languages", () => {
    const german = content.spokenLanguages.find((l) => l.language === "Deutsch");
    expect(german).toBeDefined();
    expect(german?.level).toBe("Grundkenntnisse");
  });
});

describe("skillCategories", () => {
  it("should have all expected categories", () => {
    expect(skillCategories).toContain("cloud");
    expect(skillCategories).toContain("backend");
    expect(skillCategories).toContain("frontend");
    expect(skillCategories).toContain("devops");
    expect(skillCategories).toContain("languages");
  });

  it("should have expected number of categories", () => {
    expect(skillCategories.length).toBe(5);
  });
});
