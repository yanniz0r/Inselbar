# Migration `20201225140214-initial-models`

This migration has been generated at 12/25/2020, 3:02:14 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "username" TEXT NOT NULL
)

CREATE TABLE "Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "expiresAt" DATETIME,
    "handle" TEXT NOT NULL,
    "userId" INTEGER,
    "hashedSessionToken" TEXT,
    "antiCSRFToken" TEXT,
    "publicData" TEXT,
    "privateData" TEXT,

    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
)

CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true
)

CREATE UNIQUE INDEX "Session.handle_unique" ON "Session"("handle")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201225140214-initial-models
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,45 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "sqlite"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+// --------------------------------------
+
+model User {
+  id             Int       @default(autoincrement()) @id
+  createdAt      DateTime  @default(now())
+  updatedAt      DateTime  @updatedAt
+  username       String
+  sessions       Session[]
+}
+
+model Session {
+  id                 Int       @default(autoincrement()) @id
+  createdAt          DateTime  @default(now())
+  updatedAt          DateTime  @updatedAt
+  expiresAt          DateTime?
+  handle             String    @unique
+  user               User?     @relation(fields: [userId], references: [id])
+  userId             Int?
+  hashedSessionToken String?
+  antiCSRFToken      String?
+  publicData         String?
+  privateData        String?
+}
+
+model Product {
+  id          Int      @default(autoincrement()) @id
+  createdAt   DateTime @default(now())
+  updatedAt   DateTime @updatedAt
+  name        String   
+  description String   
+  price       Int      
+  available   Boolean  @default(true)
+}
```

