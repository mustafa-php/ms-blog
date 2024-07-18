<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        DB::unprepared('
            CREATE TRIGGER before_blog_insert
            BEFORE INSERT ON blog FOR EACH ROW
            BEGIN
                DECLARE generated_slug VARCHAR(70);
                DECLARE done INT DEFAULT FALSE;
                DECLARE characters CHAR(62) DEFAULT \'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789\';
                
                WHILE NOT done DO
                    SET generated_slug = \'\';
                    SET done = TRUE;
                    
                    WHILE LENGTH(generated_slug) < 10 DO
                        SET generated_slug = CONCAT(generated_slug, SUBSTRING(characters, FLOOR(1 + RAND() * 62), 1));
                    END WHILE;
                    
                    IF EXISTS (SELECT 1 FROM blog WHERE slug = generated_slug LIMIT 1) THEN
                        SET done = FALSE;
                    END IF;
                    
                    IF LENGTH(generated_slug) > 70 THEN
                        SET generated_slug = LEFT(generated_slug, 70);
                    END IF;
                END WHILE;
            
                SET NEW.slug = generated_slug;
            END
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('blog', function (Blueprint $table) {
            DB::unprepared('DROP TRIGGER IF EXISTS before_blog_insert');
        });
    }
};
