CREATE TABLE "Users" (
	"id" uuid DEFAULT uuid_generate_v4() NOT NULL,
	"user_name" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"registration_date" DATE NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "Users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "SavedConversations" (
	"chatroom_id" serial NOT NULL,
	"messages" varchar ARRAY NOT NULL,
	"participants" varchar ARRAY NOT NULL,
	"conversation_id" varchar(255) NOT NULL,
	"language" varchar(255) NOT NULL,
	"user_id" uuid NOT NULL
) WITH (
  OIDS=FALSE
);


CREATE TABLE "Chatroom" (
	"chatroom_id" serial NOT NULL,
	"chatroom_name" varchar(255) NOT NULL,
	CONSTRAINT "Chatroom_pk" PRIMARY KEY ("chatroom_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "SavedTranslations" (
	"word" varchar(255) NOT NULL,
	"language_to" varchar(255) NOT NULL,
	"language_from" varchar(255) NOT NULL,
	"translation" varchar(255) NOT NULL,
	"user_id" uuid NOT NULL
) WITH (
  OIDS=FALSE
);


CREATE TABLE "SavedDefinitions" (
	"word" varchar(255) NOT NULL,
	"definition" varchar(255) NOT NULL,
	"part_of_speech" varchar(255) NOT NULL,
	"user_id" uuid NOT NULL
) WITH (
  OIDS=FALSE
);


ALTER TABLE "SavedConversations" ADD CONSTRAINT "SavedConversations_fk0" FOREIGN KEY ("chatroom_id") REFERENCES "Chatroom"("chatroom_id");
ALTER TABLE "SavedConversations" ADD CONSTRAINT "SavedConversations_fk1" FOREIGN KEY ("user_id") REFERENCES "Users"("id");


ALTER TABLE "SavedTranslations" ADD CONSTRAINT "SavedTranslations_fk0" FOREIGN KEY ("user_id") REFERENCES "Users"("id");

ALTER TABLE "SavedDefinitions" ADD CONSTRAINT "SavedDefinitions_fk0" FOREIGN KEY ("user_id") REFERENCES "Users"("id");





