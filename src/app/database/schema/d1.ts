import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm"; // 💡 sql 함수 임포트 추가

// Drizzle 스키마 정의: test_table
// Drizzle은 이 정의를 바탕으로 쿼리 시 타입 안전성을 제공합니다.
export const testTable = sqliteTable("test_table", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  value: text("value").notNull().unique(),
  // Drizzle의 .default()가 SQL 표현식을 요구하므로, 0을 sql`0`으로 감싸 타입 충돌을 해결합니다.
  createdAt: integer("created_at", { mode: "timestamp_ms" }).default(sql`0`), 
});

// 향후 사용자, 포스트 등 다른 테이블을 추가할 때 여기에 정의합니다.
// export const userTable = sqliteTable("user", { ... });