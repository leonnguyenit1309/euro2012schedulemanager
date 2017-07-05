<?php

use Illuminate\Database\Seeder;

class ConfigsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

	    DB::table('configs')->insert([
		    'config_key' => 'start_group_match_day',
		    'config_value' => '2017-04-21'
	    ]);

	    DB::table('configs')->insert([
		    'config_key' => 'start_quarter_match_day',
		    'config_value' => '2017-05-07'
	    ]);

	    DB::table('configs')->insert([
		    'config_key' => 'start_semi_match_day',
		    'config_value' => '2017-05-14'
	    ]);

	    DB::table('configs')->insert([
		    'config_key' => 'start_final_match_day',
		    'config_value' => '2017-05-21'
	    ]);
    }
}
