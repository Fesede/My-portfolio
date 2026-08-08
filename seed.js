import "dotenv/config";
import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { PrismaClient } = pkg;

// Set up the PostgreSQL driver adapter for Prisma 7
// eslint-disable-next-line no-undef
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting database seeding...");

  // 1. Create Default Admin User
  const admin = await prisma.admin.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: "securepassword123",
    },
  });
  console.log("✅ Admin user created:", admin.username);

  // 2. Create Initial Skills
  const skillsData = [
    { name: "React", percentage: 90 },
    { name: "JavaScript", percentage: 85 },
    { name: "Node.js", percentage: 80 },
    { name: "Tailwind CSS", percentage: 85 },
    { name: "PostgreSQL", percentage: 75 },
  ];

  for (const skill of skillsData) {
    await prisma.skill.create({ data: skill });
  }
  console.log("✅ Default skills added.");

  // 3. Create Sample Projects
  const projectsData = [
    {
      title: "Enterprise Logistics System",
      description:
        "A comprehensive transport management system engineered for tracking and logistics optimization.",
      projectLink: "https://github.com/",
    },
    {
      title: "Event Management Platform",
      description:
        "Full-stack application built to coordinate events with customized employee management features.",
      projectLink: "https://github.com/",
    },
  ];

  for (const project of projectsData) {
    await prisma.project.create({ data: project });
  }
  console.log("✅ Sample projects added.");

  console.log("🎉 Seeding finished successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    // eslint-disable-next-line no-undef
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
