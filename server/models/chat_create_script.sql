CREATE TABLE "profiles" (
	"userID" serial NOT NULL,
	"username" VARCHAR(255) NOT NULL UNIQUE,
	"passkey" VARCHAR(255) NOT NULL,
	"date_created" DATE,
	"country" VARCHAR(255),
	"email" TEXT,
	CONSTRAINT "profiles_pk" PRIMARY KEY ("userID")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "messages" (
	"messageID" serial NOT NULL,
	"message_body" TEXT NOT NULL,
	"date_posted" DATE NOT NULL,
	"time_posted" TIME NOT NULL,
	"userID_fk" integer NOT NULL UNIQUE,
	"chatroomID_fk" integer NOT NULL UNIQUE,
	CONSTRAINT "messages_pk" PRIMARY KEY ("messageID")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "chatrooms" (
	"chatroomID" serial NOT NULL,
	"chatroom_name" VARCHAR(255) NOT NULL,
	"language" VARCHAR(255) NOT NULL,
	CONSTRAINT "chatrooms_pk" PRIMARY KEY ("chatroomID")
) WITH (
  OIDS=FALSE
);
ALTER TABLE "messages" ADD CONSTRAINT "messages_fk0" FOREIGN KEY ("userID_fk") REFERENCES "profiles"("userID");
ALTER TABLE "messages" ADD CONSTRAINT "messages_fk1" FOREIGN KEY ("chatroomID_fk") REFERENCES "chatrooms"("chatroomID");