ALTER TABLE "SavedWords" DROP CONSTRAINT IF EXISTS "SavedWords_fk0";
ALTER TABLE "SavedConversations" DROP CONSTRAINT IF EXISTS "SavedConversations_fk1";
ALTER TABLE "SavedConversations" DROP CONSTRAINT IF EXISTS "SavedConversations_fk0";

DROP TABLE IF EXISTS "SavedWords";
DROP TABLE IF EXISTS "Chatrooms";
DROP TABLE IF EXISTS "SavedConversations";
DROP TABLE IF EXISTS "Users";
