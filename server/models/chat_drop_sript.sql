ALTER TABLE "messages" DROP CONSTRAINT IF EXISTS "messages_fk0";
ALTER TABLE "messages" DROP CONSTRAINT IF EXISTS "messages";

DROP TABLE IF EXISTS "chatrooms";
DROP TABLE IF EXISTS "messages";
DROP TABLE IF EXISTS "profiles";
