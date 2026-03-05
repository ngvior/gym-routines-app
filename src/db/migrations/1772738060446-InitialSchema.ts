import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1772738060446 implements MigrationInterface {
    name = 'InitialSchema1772738060446'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "target_set" ("id" SERIAL NOT NULL, "exercise_id" integer NOT NULL, "target_reps" integer NOT NULL, "target_load" double precision NOT NULL, "order_index" integer NOT NULL, CONSTRAINT "PK_b5caec05f9395ef3b4e637f2d70" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workout_log" ("id" SERIAL NOT NULL, "workout_id" integer NOT NULL, "exercise_id" integer NOT NULL, "actual_reps" integer NOT NULL, "actual_load" double precision NOT NULL, "target_load_snapshot" double precision, "set_number" integer NOT NULL, CONSTRAINT "PK_71c59827176c502ae9484fe6bc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exercise" ("id" SERIAL NOT NULL, "routine_id" integer NOT NULL, "name" character varying NOT NULL, "muscle_group" "public"."exercise_muscle_group_enum" NOT NULL, "order_index" integer NOT NULL, CONSTRAINT "PK_a0f107e3a2ef2742c1e91d97c14" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "split" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "name" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a656ea46749d1567ca7e7d5923a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "split_schedule" ("id" SERIAL NOT NULL, "split_id" uuid NOT NULL, "routine_id" integer NOT NULL, "day_index" integer NOT NULL, CONSTRAINT "PK_e0d9b8c49d65e2f35a7982a3fd0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "routine" ("id" SERIAL NOT NULL, "user_id" uuid NOT NULL, "name" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5f1178fd54059b2f9479d6141ec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "personal_record" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "exercise_name" character varying NOT NULL, "max_load" double precision NOT NULL, "reps" integer NOT NULL, "achieved_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_7a0a7dbe996d763a0d39c2edc32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password_hash" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workout" ("id" SERIAL NOT NULL, "user_id" uuid NOT NULL, "routine_id" integer NOT NULL, "split_id" uuid, "start_time" TIMESTAMP NOT NULL, "end_time" TIMESTAMP, CONSTRAINT "PK_ea37ec052825688082b19f0d939" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "target_set" ADD CONSTRAINT "FK_556ab86dd2da55134ed25104b83" FOREIGN KEY ("exercise_id") REFERENCES "exercise"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workout_log" ADD CONSTRAINT "FK_548b1a23175d13f2fcacf6d8631" FOREIGN KEY ("workout_id") REFERENCES "workout"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workout_log" ADD CONSTRAINT "FK_a93c291f2452181e8bb7d270fc9" FOREIGN KEY ("exercise_id") REFERENCES "exercise"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercise" ADD CONSTRAINT "FK_94d50a7537c1ad8f367ca31815a" FOREIGN KEY ("routine_id") REFERENCES "routine"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "split" ADD CONSTRAINT "FK_3249da7f5cd3d0c597bcfc15062" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "split_schedule" ADD CONSTRAINT "FK_b0a6d77321ebe6172e213322f20" FOREIGN KEY ("split_id") REFERENCES "split"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "split_schedule" ADD CONSTRAINT "FK_ea3126ae7a77432671b6c1c52d2" FOREIGN KEY ("routine_id") REFERENCES "routine"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "routine" ADD CONSTRAINT "FK_8cfea71607e0cc96e6c1b72d615" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "personal_record" ADD CONSTRAINT "FK_20fb24de4a2050ae7574c55f2b9" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workout" ADD CONSTRAINT "FK_e92af579b7b9236feacf264b722" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workout" ADD CONSTRAINT "FK_147e0022f76783f68af9fbf26f7" FOREIGN KEY ("routine_id") REFERENCES "routine"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workout" ADD CONSTRAINT "FK_7a06d018f6edeccc7557f5d0e3a" FOREIGN KEY ("split_id") REFERENCES "split"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workout" DROP CONSTRAINT "FK_7a06d018f6edeccc7557f5d0e3a"`);
        await queryRunner.query(`ALTER TABLE "workout" DROP CONSTRAINT "FK_147e0022f76783f68af9fbf26f7"`);
        await queryRunner.query(`ALTER TABLE "workout" DROP CONSTRAINT "FK_e92af579b7b9236feacf264b722"`);
        await queryRunner.query(`ALTER TABLE "personal_record" DROP CONSTRAINT "FK_20fb24de4a2050ae7574c55f2b9"`);
        await queryRunner.query(`ALTER TABLE "routine" DROP CONSTRAINT "FK_8cfea71607e0cc96e6c1b72d615"`);
        await queryRunner.query(`ALTER TABLE "split_schedule" DROP CONSTRAINT "FK_ea3126ae7a77432671b6c1c52d2"`);
        await queryRunner.query(`ALTER TABLE "split_schedule" DROP CONSTRAINT "FK_b0a6d77321ebe6172e213322f20"`);
        await queryRunner.query(`ALTER TABLE "split" DROP CONSTRAINT "FK_3249da7f5cd3d0c597bcfc15062"`);
        await queryRunner.query(`ALTER TABLE "exercise" DROP CONSTRAINT "FK_94d50a7537c1ad8f367ca31815a"`);
        await queryRunner.query(`ALTER TABLE "workout_log" DROP CONSTRAINT "FK_a93c291f2452181e8bb7d270fc9"`);
        await queryRunner.query(`ALTER TABLE "workout_log" DROP CONSTRAINT "FK_548b1a23175d13f2fcacf6d8631"`);
        await queryRunner.query(`ALTER TABLE "target_set" DROP CONSTRAINT "FK_556ab86dd2da55134ed25104b83"`);
        await queryRunner.query(`DROP TABLE "workout"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "personal_record"`);
        await queryRunner.query(`DROP TABLE "routine"`);
        await queryRunner.query(`DROP TABLE "split_schedule"`);
        await queryRunner.query(`DROP TABLE "split"`);
        await queryRunner.query(`DROP TABLE "exercise"`);
        await queryRunner.query(`DROP TABLE "workout_log"`);
        await queryRunner.query(`DROP TABLE "target_set"`);
    }

}
