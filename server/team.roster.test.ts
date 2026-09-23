import { describe, expect, it } from "vitest";
import { getDb } from "./db";
import { teamMembers } from "../drizzle/schema";

describe("Awesome Studios team roster", () => {
  it("contains all 25 supplied published profiles", async () => {
    const db = await getDb();
    expect(db, "database must be available for the roster check").toBeTruthy();
    const rows = await db!.select().from(teamMembers).where(teamMembers.published);
    const names = new Set(rows.map(row => row.name));
    expect(rows).toHaveLength(25);
    expect(names).toEqual(new Set([
      "Ukaha Terkuma", "Sen Joseph", "Akosugh Keghtor", "Abugh Caleb", "Tormough Joseph",
      "Yaladoo Hope", "Swem Samuel", "Ordams Alexander", "Naswem Sefa-Ter", "Ekefan Comfort",
      "Achakpa-Ikyo Kingford", "Korna Glory", "Yimam Nephertiti", "Gbaa Iorwuese", "Tarbo Yima",
      "Ahangba Monalisa", "Tersugh Naiomi", "Makir Abigail", "Ajikwa Christopher", "Ebube Onuorah",
      "Ephraim Agber Sooter", "Ukuma King", "Garba Destiny", "Iorzaa Nadoo", "Amedu Ejeh",
    ]));
    expect(rows.every(row => row.photoUrl)).toBe(true);
  });
});
